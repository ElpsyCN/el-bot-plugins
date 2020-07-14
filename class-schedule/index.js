import schedule from "node-schedule";
import dayjs from "dayjs";
import util from "util";
import isoWeek from "dayjs/plugin/isoWeek";
import { sendMessageByConfig } from "@utils/message";

const g_formatStr =
    "课程名：%s\n上课时间：%s:%s\n地点：%s\n授课老师：%s\n其它信息：%s";
const g_timeRegexp = new RegExp("^(MON|TUE|WED|THU|FRI|SAT|SUB)\\s([0-9]{1,2}):([0-9]{1,2})$", "i");

const g_weekMap = new Map();
g_weekMap["SUN"] = 7; g_weekMap[7] = "SUN";
g_weekMap["MON"] = 1; g_weekMap[1] = "MON";
g_weekMap["TUE"] = 2; g_weekMap[2] = "TUE";
g_weekMap["WED"] = 3; g_weekMap[3] = "WED";
g_weekMap["THU"] = 4; g_weekMap[4] = "THU";
g_weekMap["FRI"] = 5; g_weekMap[5] = "FRI";
g_weekMap["SAT"] = 6; g_weekMap[6] = "SAT";


export default async function (ctx) {
    const mirai = ctx.mirai;
    dayjs.extend(isoWeek);
    dayjs.locale('zh-cn');

    if (!ctx.el.config.class_schedule) {
        return;
    }

    for (let courseGroup of ctx.el.config.class_schedule) {
        procCourses(courseGroup)
    }
}

function procCourses(courseGroup) {
    if (!courseGroup.advance) {
        throw new ConfigSyntaxError("The advance is not provided in config.");
    }
    let target = courseGroup.target;
    if (!target) {
        throw new ConfigSyntaxError("The target is not provided in config.");
    }

    for (let course of courseGroup.courses) {
        let time = parseTime(course, courseGroup.advance);
        let place = course.place ? course.place.toString() : "未提供该信息";
        let teacher = course.teacher ? course.teacher.toString() : "未提供该信息";
        let other = course.other ? course.other.toString() : "无";

        // 格式化将要发送的消息
        let msg = util.format(
            g_formatStr,
            course.name,
            time.hour,
            time.minute,
            place,
            teacher,
            other
        );

        schedule.scheduleJob(time.cron, function () {
            sendMessageByConfig(msg, target);
        });
    }
}

function parseTime(course, advance) {
    let time = {
        // 原始字符串
        native: undefined,
        // 课程开始时间-小时
        hour: undefined,
        // 课程开始时间-分钟
        minute: undefined,
        // 课程开始时间-星期几
        week: undefined,
        // 经过处理后生成的 cron 字符串，用于启动定时任务。
        cron: undefined,
        advance: {
            // 提醒时间-小时
            hour: undefined,
            // 提醒时间-分钟
            minute: undefined,
            // 提醒时间-星期
            week: undefined,
        },
    };
    // 「课程开始时间」和「课程名」必须在配置文件中提供
    if (!course.time || !course.name) {
        throw new ConfigSyntaxError("The name and time are not provided in config.");
    }

    time.native = course.time.toString();

    // 分离出课程开始时间的 hour、minute 和 week
    let matches = g_timeRegexp.exec(time.native);
    if (matches == null || matches.length != 4) {
        let errStr = util.format("[%s] is invalid.", time.native);
        throw new ConfigSyntaxError(errStr);
    }
    time.week = matches[1].toUpperCase();
    time.hour = matches[2];
    time.minute = matches[3];
    if (parseInt(time.week) >= 24 || parseInt(time.minute) >= 60) {
        let errStr = util.format("[%s] is invalid.", time.native);
        throw new ConfigSyntaxError(errStr);
    }


    // 计算「提醒时间」
    let temp = dayjs().set("hour", parseInt(time.hour))
        .set("minute", parseInt(time.minute))
        .set("day", g_weekMap[time.week]);
    advance = course.advance ? course.advance : advance.toString();
    temp.day(g_weekMap[time.week]);
    // 使用「课程开始时间」减去「提前时长」得到「提醒时间」
    temp = temp.subtract(
        parseInt(advance.substr(0, advance.length - 1)),
        advance[advance.length - 1]
    );
    time.advance.week = g_weekMap[temp.day()];
    time.advance.hour = temp.get("h");
    time.advance.minute = temp.get("m");

    // 生成用于启动定时任务的 cron 字符串
    time.cron = util.format(
        "0 %s %s * * %s",
        time.advance.minute,
        time.advance.hour,
        time.advance.week
    );

    return time;
}


class ConfigSyntaxError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigSyntaxError";
    }
}

