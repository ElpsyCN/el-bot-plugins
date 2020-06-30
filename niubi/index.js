import sentences from "./sentences.json";
import { re, match } from "mirai-ts/dist/utils/message";

function getRandomSentence(sentences, name) {
  const index = Math.floor(Math.random() * sentences.length);
  return Function("name", "return `" + sentences[index] + "`")(name);
}

export default function (ctx) {
  const niubi = ctx.el.config.niubi;
  const mirai = ctx.mirai;

  mirai.on("message", (msg) => {
    let name = "我";

    niubi.match.forEach((obj) => {
      const str = match(msg.plain.toLowerCase(), obj);
      if (!str) {
        return;
      } else if (Array.isArray(str)) {
        name = str[1];
      }

      msg.messageChain.some((singleMessage) => {
        if (singleMessage.type === "At") {
          name = "「" + singleMessage.display.slice(1) + "」";
          return true;
        }
      });

      const sentence = getRandomSentence(sentences, name);
      msg.reply(sentence);
    });
  });

  // 进群时
  mirai.on("MemberJoinEvent", (msg) => {
    const sentence = getRandomSentence(sentences, msg.member.memberName);
    mirai.api.sendGroupMessage(sentence, msg.member.group.id);
  });
}
