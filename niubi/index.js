import sentences from "./sentences.json";

function getRandomSentence(sentences, name) {
  const index = Math.floor(Math.random() * sentences.length);
  return Function("name", "return `" + sentences[index] + "`")(name);
}

export default function (ctx) {
  const mirai = ctx.mirai;

  mirai.on("message", (msg) => {
    let name = "我";
    if (!msg.plain.toLowerCase().includes("nb")) return;
    msg.messageChain.some((singleMessage) => {
      if (singleMessage.type === "At") {
        name = "「" + singleMessage.display.slice(1) + "」";
        return true;
      }
    });

    const sentence = getRandomSentence(sentences, name);
    msg.reply(sentence);
  });

  // 进群时
  mirai.on("MemberJoinEvent", (msg) => {
    const sentence = getRandomSentence(sentences, msg.member.memberName);
    mirai.api.sendGroupMessage(sentence, msg.member.group.id);
  });
}
