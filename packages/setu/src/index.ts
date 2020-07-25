import Message from "mirai-ts/dist/message";
import { match } from "mirai-ts/dist/utils/message";
import axios from "axios";
import { isUrl } from "el-bot/dist/utils/helper";
import Bot from "el-bot";
import { Config } from "mirai-ts";

function getRandomImage(image: any[]) {
  const index = Math.floor(Math.random() * image.length);
  return image[index];
}

interface Image {
  url: string;
}

export default function (ctx: Bot) {
  const mirai = ctx.mirai;
  const config = ctx.el.config;
  const setu = config.setu || {
    url: "https://el-bot-api.vercel.app/api/setu",
    proxy: "https://images.weserv.nl/?url=",
    match: [
      {
        is: "不够色",
      },
      {
        includes: ["来", "色图"],
      },
    ],
    reply: "让我找找",
  };

  let image: Image;
  if (setu.url) {
    mirai.on("message", (msg) => {
      setu.match.forEach(async (obj: Config.Match) => {
        if (match(msg.plain.toLowerCase(), obj)) {
          if (setu.reply) {
            msg.reply(setu.reply);
          }

          if (isUrl(setu.url)) {
            const { data } = await axios.get(setu.url);
            image = data;
            if (!image.url) image = data.data[0];
          } else {
            const setuJson = require(setu.url);
            image = getRandomImage(setuJson.image);
          }

          // 图片链接设置代理
          if (setu.proxy) image.url = setu.proxy + image.url;
          msg.reply([Message.Image("", image.url)]);
        }
      });
    });
  }
}
