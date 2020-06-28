import yaml from "js-yaml";
import fs from "fs";

function getRandomSentence(sentences) {
  const index = Math.floor(Math.random() * sentences.length);
  return sentences[index];
}

export default function (ctx) {
  const mirai = ctx.mirai;
  const sentences = yaml.safeLoad(fs.readFileSync(__dirname + "/data.yml"));

  mirai.on("message", (msg) => {
    const sentence = getRandomSentence(sentences);

    let name = "牛逼人";
    if (!msg.plain.includes("nb")) return;
    msg.messageChain.some((singleMessage) => {
      if (singleMessage.type === "At") {
        name = singleMessage.display.slice(1);
        return true;
      }
    });

    const text = Function("name", "return `" + sentence + "`")(name);
    msg.reply(text);
  });
}
