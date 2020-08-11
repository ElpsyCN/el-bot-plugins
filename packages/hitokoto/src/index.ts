import axios from "axios";
import { check } from "mirai-ts";
import schedule from "node-schedule";
import Bot from "el-bot";
import { utils } from "el-bot";
import * as Config from "el-bot/dist/types/config";
/**
 * 请求参数
 * https://developer.hitokoto.cn/sentence/#请求参数
 */
interface HitokotoParams {
  /**
   * 句子类型
   */
  c?: string;
  /**
   * 返回编码
   */
  encode?: string;
  /**
   * 	字符集
   */
  charset?: string;
  /**
   * 调用的异步函数
   */
  callback?: string;
  /**
   * 选择器。配合 encode=js 使用
   */
  select?: string;
  /**
   * 返回句子的最小长度（包含）
   */
  min_length?: string;
  /**
   * 返回句子的最大长度（包含）
   */
  max_length?: string;
}

async function getSentence(params: HitokotoParams | null) {
  const { data } = await axios.get("https://v1.hitokoto.cn", {
    params: params,
  });
  let words = data.hitokoto + " ——" + data.from;
  if (data.from_who) words += data.from_who;
  return words;
}

/**
 * 配置
 */
interface HitokotoOptions {
  cron?: string;
  target?: Config.Target;
  params?: HitokotoParams;
  match?: check.Match[];
}

// 默认配置
const hitokoto: HitokotoOptions = {
  cron: "0 0 * * *",
  match: [{ is: "el say" }, { includes: "说点骚话" }],
};

/**
 * @param config hitokoto 配置
 */
export default function (ctx: Bot, options: HitokotoOptions): void {
  const mirai = ctx.mirai;
  utils.config.merge(hitokoto, options);

  if (hitokoto && hitokoto.cron && hitokoto.target) {
    schedule.scheduleJob(hitokoto.cron, async () => {
      if (!hitokoto.target) return;
      const words = await getSentence(hitokoto.params);
      ctx.sender.sendMessageByConfig(words, hitokoto.target);
    });
  }

  mirai.on("message", async (msg) => {
    if (!hitokoto.match) return;
    hitokoto.match.forEach(async (obj) => {
      if (check.match(msg.plain, obj)) {
        const words = await getSentence(hitokoto.params);
        msg.reply(words);
      }
    });
  });
}
