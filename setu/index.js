import Message from "mirai-ts/dist/message";
import { includes } from "mirai-ts/dist/utils/message";
import setu from "./setu.json";

function getRandomImage(image) {
  const index = Math.floor(Math.random() * image.length);
  return image[index];
}

export default function (ctx) {
  const mirai = ctx.mirai;

  let image = {};
  mirai.on("message", (msg) => {
    if (includes(msg.plain, ["来", "色图"]) || msg.plain === "不够色") {
      msg.reply("让我找找");
      image = getRandomImage(setu.image);
      msg.reply([Message.Image("", image.url)]);
    }
  });
}
