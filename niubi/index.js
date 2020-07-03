import { match } from "mirai-ts/dist/utils/message";
import { isUrl } from "../utils";
import axios from "axios";
import { renderString } from "@utils/message";

function getRandomSentence(sentences, name) {
  const index = Math.floor(Math.random() * sentences.length);
  return renderString(sentences[index], name, "name");
}

export default function (ctx) {
  const config = ctx.el.config;
  const mirai = ctx.mirai;

  const niubi = config.niubi || {
    url: "https://el-bot-api.vercel.app/api/niubi",
    match: [
      {
        re: "来点(S*)笑话",
      },
      {
        includes: "nb",
      },
    ],
  };

  mirai.on("message", (msg) => {
    let name = "我";
    let sentence = "";

    niubi.match.forEach(async (obj) => {
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

      if (isUrl(niubi.url)) {
        const { data } = await axios.get(niubi.url);
        sentence = renderString(data[0], name, "name");
      } else {
        const niubiJson = require(niubi.url);
        sentence = getRandomSentence(sentences, name);
      }
      msg.reply(sentence);
    });
  });

  // 进群时
  mirai.on("MemberJoinEvent", (msg) => {
    const sentence = getRandomSentence(sentences, msg.member.memberName);
    mirai.api.sendGroupMessage(sentence, msg.member.group.id);
  });
}
