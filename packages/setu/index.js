const { Message, check } = require("mirai-ts");
const axios = require("axios");
const Bot = require("el-bot");
const { utils } = require("el-bot");
const { SetuImage, SetuOptions } = require(".");

const setu = {
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

/**
 * 获取随机图片
 * @param {SetuImage[]} image
 */
function getRandomImage() {
  const index = Math.floor(Math.random() * image.length);
  return image[index];
}

/**
 *
 * @param {Bot} ctx
 * @param {SetuOptions} options
 */
export default function (ctx, options) {
  const mirai = ctx.mirai;
  utils.config.merge(setu, options);

  let image;
  if (setu.url) {
    mirai.on("message", (msg) => {
      setu.match.forEach(async (obj) => {
        if (check.match(msg.plain.toLowerCase(), obj)) {
          if (setu.reply) {
            msg.reply(setu.reply);
          }

          if (utils.isUrl(setu.url)) {
            const { data } = await axios.get(setu.url);
            image = data;
            if (!image.url) image = data.data[0];
          } else {
            const setuJson = await require(setu.url);
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
