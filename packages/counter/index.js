const { default: Bot, utils } = require("el-bot");
const { check } = require("mirai-ts");

/**
 *
 * @param {import("mirai-ts/dist/types/message-type").ChatMessage} msg
 * @param {object} option
 * @param {number} counter
 */
async function countKeyword(msg, option, counter) {
  // temp
  const data = {
    today: counter,
    total: counter,
  };

  if (msg.plain === option.command) {
    await msg.reply(utils.renderString(option.reply, data, "data"));
  } else if (check.match(msg.plain, option)) {
    counter++;
  }

  return counter;
}

/**
 * 计数器
 * @param {Bot} ctx
 */
module.exports = (ctx, options) => {
  const { mirai } = ctx;

  options.forEach((option) => {
    mirai.on("message", (msg) => {
      let counter = 0;
      counter = countKeyword(msg, option, counter);
    });
  });
};
