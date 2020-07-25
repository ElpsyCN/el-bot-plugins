import axios from "axios";
import { match } from "mirai-ts/dist/utils/message";
import { MessageType, Config } from "mirai-ts";
import schedule from "node-schedule";
import { merge } from 'el-bot/dist/utils/config'

async function getSentence(params) {
  const { data } = await axios.get("https://v1.hitokoto.cn", {
    params: params,
  });
  let words = data.hitokoto + " ——" + data.from;
  if (data.from_who) words += data.from_who;
  return words;
}

// 默认配置
let hitokoto = {
  cron: "0 0 * * *",
  match: [
    { is: "el say" },
    { includes: "说点骚话" }
  ]
}

/**
 * @param config hitokoto 配置
 */
export default function(ctx, config) {
  const mirai = ctx.mirai;
  merge(hitokoto, config);

  if (hitokoto && hitokoto.cron && hitokoto.target) {
    schedule.scheduleJob(hitokoto.cron, async () => {
      const words = await getSentence(hitokoto.params);
      ctx.sender.sendMessageByConfig(words, hitokoto.target);
    });
  }

  mirai.on("message", async (msg) => {
    hitokoto.match.forEach(async (obj) => {
      if (match(msg.plain, obj)) {
        const words = await getSentence(hitokoto.params);
        msg.reply(words);
      }
    });
  });
}
