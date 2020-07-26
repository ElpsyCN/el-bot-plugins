import axios from "axios";
import { check, Config } from "mirai-ts";
import schedule from "node-schedule";
import Bot from "el-bot";
import { utils } from "el-bot";

async function getSentence(params: object) {
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
interface hitokotoConfig {
  cron?: string;
  target?: Config.Target;
  params?: any;
  match?: Config.Match[];
}

// 默认配置
let hitokoto: hitokotoConfig = {
  cron: "0 0 * * *",
  match: [
    { is: "el say" },
    { includes: "说点骚话" }
  ],
};

/**
 * @param config hitokoto 配置
 */
export default function (ctx: Bot, config: hitokotoConfig) {
  const mirai = ctx.mirai;
  utils.config.merge(hitokoto, config);

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
