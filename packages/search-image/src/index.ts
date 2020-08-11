import Bot from "el-bot";
import sagiri, { SagiriResult } from "sagiri";
import { Message, MessageType } from "mirai-ts";

/**
 * 搜图设置
 */
interface SearchImageOptions {
  token: string;
}

/**
 *
 * @param result 格式化结果
 */
function formatResult(result: SagiriResult): MessageType.MessageChain {
  const msgChain = [
    Message.Plain(`\n------------------\n`),
    Message.Image(null, result.thumbnail),
    Message.Plain(`\n相似度：${result.similarity}`),
    Message.Plain(`\n站点：${result.site}`),
    Message.Plain(`\n链接：${result.url}`),
    Message.Plain(`\n作者：${result.authorName || "未知"}`),
  ];
  return msgChain;
}

/**
 * 搜图 [SauceNAO](https://saucenao.com/)
 * @param ctx
 * @param config
 */
export default async function searchImage(
  ctx: Bot,
  options: SearchImageOptions
) {
  const mirai = ctx.mirai;
  const client = sagiri(options.token);
  let searchImageFlag = false;

  mirai.on("message", (msg) => {
    if (msg.plain === "搜图") {
      searchImageFlag = true;
      msg.reply("我准备好了！");
    }

    if (searchImageFlag) {
      msg.messageChain.forEach(async (singleMessage) => {
        if (singleMessage.type === "Image") {
          const results = await client(singleMessage.url);
          let replyContent = [];
          replyContent.push(
            Message.Plain(`共有 ${results.length} 个结果（展示前三个）`)
          );
          for (let i = 0; i < 3; i++) {
            const result = results[i];
            replyContent = replyContent.concat(formatResult(result));
            console.log(replyContent);
          }
          console.log(replyContent);
          msg.reply(replyContent);
        }
      });
    }
  });
}
