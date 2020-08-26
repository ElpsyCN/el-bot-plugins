module.exports = (ctx) => {
  const mirai = ctx.mirai;
  mirai.on("message", (msg) => {
    const engineString = msg.plain.split(" ")[0];
    const keyword = msg.plain.slice(engineString.length).trim();
    const engineList = [
      {
        id: "baidu",
        keywords: ["百度", "度娘", "baidu"],
        url: "https://www.baidu.com/s?wd=",
      },
      {
        id: "google",
        keywords: ["谷歌", "google"],
        url: "https://www.google.com/search?q=",
      },
      {
        id: "bing",
        keywords: ["bing", "必应"],
        url: "https://cn.bing.com/search?q=",
      },
    ];
    if (engineString.includes("不会百度")) {
      msg.reply("https://buhuibaidu.me/?s=" + encodeURI(keyword));
    } else {
      engineList.forEach((engine) => {
        if (engine.keywords.includes(engineString)) {
          msg.reply(engine.url + keyword);
        }
      });
    }
  });
};
