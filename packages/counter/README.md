# 计数器 counter

- 作者：[@YunYouJun](https://github.com/YunYouJun)
- 简介：计数器

例如：

```md
云游君：草

云游君：百草园

Bot: 今天已种下了 1 根草，百草园里已有 x 根草啦。
```

- `match`: 匹配规则，见[配置讲解](https://docs.bot.elpsy.cn/config.html)。
- `command`: 对应的指令，如 `百草园`，返回当前统计结果。
- `reply`: 统计结果的模版信息。

```yaml
counter:
  - re: 草|艹|🌿
    command: 百草园
    reply: 今天已种下了 ${data.today} 根草，百草园里已有 ${data.total} 根草啦。
```
