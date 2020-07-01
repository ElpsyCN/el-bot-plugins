import Message from "mirai-ts/dist/message";
import { includes } from "mirai-ts/dist/utils/message";
import axios from "axios";
import { isUrl } from "../utils";

function getRandomImage(image) {
  const index = Math.floor(Math.random() * image.length);
  return image[index];
}

export default function (ctx) {
  const mirai = ctx.mirai;
  const config = ctx.el.config;
  const setu = config.setu || {
    url: "https://el-bot-api.vercel.app/api/setu",
  };

  let image = {};

  if (setu.url) {
    mirai.on("message", async (msg) => {
      if (includes(msg.plain, ["来", "色图"]) || msg.plain === "不够色") {
        msg.reply("让我找找");

        if (isUrl(setu.url)) {
          const { data } = await axios.get(setu.url);
          image = data;
        } else {
          const setuJson = require(setu.url);
          image = getRandomImage(setuJson.image);
        }

        msg.reply([Message.Image("", image.url)]);
      }
    });
  }
}
