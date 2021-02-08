const { Message, log } = require("mirai-ts");
const TraceMoe = require("tracemoe-helper");
const { default: Bot } = require("el-bot");

let api;
/**
 * 格式化结果
 * @param {Object} data
 */
async function formatResult(data) {
  let r = [
    Message.Plain("搜索结果："),
    Message.Plain(
      `\n动画名：${data.docs[0].title_native}(${data.docs[0].title_romaji})`
    ),
    Message.Plain(`\n中文名：${data.docs[0].title_chinese || "未知"}`),
    Message.Plain(
      `\n准确度：${Math.floor(data.docs[0].similarity * 100)}%${
        data.docs[0].similarity < 0.86
          ? "\n（准确度过低，请确保这张图片是完整的、没有裁剪过的动画视频截图）"
          : ""
      }`
    ),
    Message.Plain(`\n话数：${data.docs[0].episode || "未知"}`),
  ];
  // if (!data.docs[0].is_adult) r = r.concat([Message.Plain('\n'), Message.Image(null, await api.previewImage(data.docs[0].anilist_id, data.docs[0].filename, data.docs[0].at, data.docs[0].tokenthumb))]);
  return r;
}

/**
 * 搜索
 * @param {String} url
 */
async function traceSearch(url) {
  try {
    const data = await api.search(url);
    const res = await formatResult(data);
    return res;
  } catch (e) {
    log.warning(e);
    return "失败";
  }
}
/**
 * 搜图
 * @param {Bot} ctx
 * @param {Object} options
 */
module.exports = async (ctx, options) => {
  const mirai = ctx.mirai;
  api = new TraceMoe(options.token || ""); // 实例化
  let searchFlag = {};
  mirai.on("message", async (msg) => {
    if (msg.plain.trim() === "搜番") {
      searchFlag[msg.sender.id.toString()] = true;
      if (msg.messageChain.length == 2) msg.reply("请发送要搜索的截图");
    }
    if (searchFlag[msg.sender.id.toString()]) {
      let searchReply = false;
      msg.messageChain.forEach(async (smsg) => {
        if (smsg.type === "Image") {
          if (!searchReply) {
            msg.reply("少女祈祷中...");
            searchReply = true;
          }
          msg.reply(await traceSearch(smsg.url));
          delete searchFlag[msg.sender.id.toString()];
        }
      });
    }
  });
};
