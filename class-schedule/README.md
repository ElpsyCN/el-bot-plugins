# 课程表 class-schedule

+ 作者：[@ADD-SP](https://github.com/ADD-SP)
+ 简介：根据配置内容定时发送上课信息。

# 示例

```yml
class_schedule:
  - advance: '10m'
    courses:
      - time: 'TUE 8:00'
        name: '语文'
        place: '第一教室'
        teacher: '张三'
    target:
      friend:
        - 小明的 QQ
      group:
        - 小明的班级群群号
  - advance: '1h10m'
    courses:
      - time: 'TUE 8:00'
        name: '数学'
        place: '第一教室'
        teacher: '李四'
    target:
      friend:
        - 小红的 QQ
      group:
        - 小红的班级群
```

这段配置表示：
+ 周二八点（24 小时制），语文课在第一教室上课，授课老师为张三，提前 10 分钟发送消息提醒，提醒消息发送给小明及其班级群。
+ 周二八点（24 小时制），数学课课在第一教室上课，授课老师为李四，提前 1 小时 10 分钟发送消息提醒，提醒消息发送给小红及其班级群。

# 语法

## class_schedule[].advance

+ 类型：String
+ 可否省略：允许省略
+ 需要满足的正则表达式：^([0-9]+d)?([0-9]+h)?([0-9]+m)?$
    + `d`表示天数
    + `h`表示小时
    + `m`表示分钟
+ 功能：指定在提前于开课多久发送消息提醒
+ 默认：10m
+ 示例：
    + `advance: 10m`表示提前 10 分钟发送消息提醒
    + `advance: 1h`表示提前 1 小时发送消息提醒
    + `advance: 1d`表示提前 1 天发送消息提醒
    + `advance: 1d1h1m`表示提前 1 天 1 小时 1 分钟十分钟发送消息提醒
    + `advance: 1h1m`表示提前 1 小时 1 分钟发送消息提醒

## class_schedule[].courses.time

+ 类型：String
+ 可否省略：不可省略
+ 需要满足的正则表达式：^(MON|TUE|WED|THU|FRI|SAT|SUB)\s[0-9]{1,2}:[0-9]{1,2}$
+ 功能：声明开课时间（24 小时制）
+ 示例：`time: MON 8:00`表示周一上午八点开课

## class_schedule[].courses.name

+ 类型：String
+ 可否省略：不可省略
+ 功能：课程名

## class_schedule[].courses.place

+ 类型：String
+ 可否省略：允许省略
+ 功能：上课地点
+ 默认：未提供该信息

## class_schedule[].courses.teacher

+ 类型：String
+ 可否省略：允许省略
+ 功能：授课教师
+ 默认：未提供该信息

## class_schedule[].courses.other

+ 类型：String
+ 可否省略：允许省略
+ 功能：其它相关信息
+ 默认：无

## class_schedule[].courses.advance

+ 类型：String
+ 可否省略：允许省略
+ 需要满足的正则表达式：同`class_schedule[].advance`
+ 功能：指定该门课程提前于开课多久发送消息提醒，将覆盖`class_schedule.advance`中的设置。
+ 默认：同`class_schedule[].advance`
+ 示例：同`class_schedule[].advance`
