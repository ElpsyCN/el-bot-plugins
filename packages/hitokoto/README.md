# 一言 hitokoto

> [一言开发者中心](https://developer.hitokoto.cn/)

- 作者：[@YunYouJun](https://github.com/YunYouJun)
- 简介：一言

例如：

```md
云游君: el say

Bot: 每个人都有不愿回想的……记忆，而我能感知到这些。 ——明日方舟
```

## 描述

收到某指令时，发送一句中二的话。

match 为一个数组，可以包含多种匹配的方式，每种方式下均可设置 `is`, `includes`, `re` 基本与 `answer` 部分相同。

params 字段各含义见 [请求参数 | 一言开发者中心](https://developer.hitokoto.cn/sentence/)

添加 `cron` 和 `target` 可定时向某群发送一条一言内容。（此处请见[配置讲解](https://docs.bot.elpsy.cn/config.html#定时任务)）

## 配置

> [请求参数](https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0)

```yaml
hitokoto:
  cron: 0 0 * * *
  target:
    group:
      - 389401003
  match:
    - is: el say
    - includes: 说点骚话
  params:
    # c:
    # encode:
    # charset:
    # callback:
    # select:
    # min_length:
    # max_length:
```
