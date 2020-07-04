# 色图 setu

- 作者：[@YunYouJun](https://github.com/YunYouJun)
- 简介：发点色图

例如：

```md
云游君: 来点色图

EBJ: [假装我是一张真正的色图]
```

- `url`: API 地址 或本地 JSON 数据的文件所在路径
- `match` 见[配置讲解](https://docs.bot.elpsy.cn/js/config.html)。
- `reply`: 默认的回复文本消息

> 不需要自定义时，不需要配置，默认使用 `https://el-bot-api.vercel.app/api/setu`。

另一个 [色图 API](https://api.lolicon.app/#/setu)：https://api.lolicon.app/setu/

```yaml
setu:
  url: https://el-bot-api.vercel.app/api/setu
  match:
    - is: 不够色
    - includes:
        - 来点
        - 色图
  reply: 让我找找
```
