import { Message, check } from "mirai-ts";
import axios from "axios";
import Bot from "el-bot";
import { utils } from "el-bot";

interface SetuImage {
  url: string;
}

function getRandomImage(image: SetuImage[]) {
  const index = Math.floor(Math.random() * image.length);
  return image[index];
}

interface Image {
  url: string;
}

interface SetuOptions {
  url: string;
  proxy: string;
  match: check.Match[];
  reply: string;
}

const setu: SetuOptions = {
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

export default function (ctx: Bot, options: SetuOptions): void {
  const mirai = ctx.mirai;
  const config = ctx.el.config;
  utils.config.merge(setu, options);

  let image: Image;
  if (setu.url) {
    mirai.on("message", (msg) => {
      setu.match.forEach(async (obj: check.Match) => {
        if (check.match(msg.plain.toLowerCase(), obj)) {
          if (setu.reply) {
            msg.reply(setu.reply);
          }

          if (utils.isUrl(setu.url)) {
            const { data } = await axios.get(setu.url);
            image = data;
            if (!image.url) image = data.data[0];
          } else {
            const setuJson = await import(setu.url);
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
