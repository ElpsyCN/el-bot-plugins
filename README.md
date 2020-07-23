# 社区插件

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

此处提供一些 [el-bot](https://github.com/ElpsyCN/el-bot/) 可用的社区插件。你可以为其提交 PR，提供给更多人使用，并在对应插件的 README 中留下你的大名。

## 说明

社区插件仓库中每个目录以插件名命名，不可重复。

目录结构：

```txt
.
└── packages
    └── niubi
        ├── README.md
        ├── dist
        │   └── index.js
        ├── index.js
        └── package.json
    └── ...
```

`packages/niubi/package.json` :

```json
{
  "name": "@el-bot/plugin-niubi",
  "version": "0.0.2",
  "description": "夸人牛逼",
  "main": "dist/index.js",
  "author": "YunYouJun",
  "license": "AGPL-3.0",
  "publishConfig": {
    "access": "public"
  }
}
```

各插件主入口文件为 `dist/index.js`，并须附带 README.md 作为相关说明文档。

因为 mirai 属于 [AGPL-3.0](https://github.com/mamoe/mirai/blob/master/LICENSE) 协议，您提交在本仓库的插件将须默认使用 AGPL-3.0 协议。

`dist` 文件无须提交，将由仓库统一发布编译并发布于 `@el-bot` 命名空间下。

### 命名规则

- 纯小写字母
- 多个单词时以 `-` 分割
- 若插件需要自定义配置，请与插件名保持一致，含有连字符的插件名对应的 `yaml` 配置属性使用 `_` 替代。

## 在 el-bot 中使用

```sh
npm install @el-bot/plugin-niubi
# yarn add @el-bot/plugin-niubi
```

修改你的配置文件：

```js
module.exports = {
  // ...
  config: {
    plugin: {
      community: ['niubi']
    }
  }
}
```

> 或 yml 插入对应想要加载的插件名（自行解析载入）

```yaml
plugins:
  community:
    - niubi
    - setu
```

## 开发

欢迎提交更多有趣的插件。

插件可以默认使用 [mirai-ts](https://github.com/YunYouJun/mirai-ts) 中的 API 以提升开发效率。

同时也可以参考 [配置讲解](https://docs.bot.elpsy.cn/js/config.html) 中的一些配置设计，并可直接引入 el-bot 中已有的一些根据配置匹配、发送等函数。

更多插件开发内容见 [插件系统](https://docs.bot.elpsy.cn/js/plugins/)。

## 相关

- [el-bot](https://github.com/ElpsyCN/el-bot)：机器人主体
- [el-bot-api](https://github.com/ElpsyCN/el-bot-api): 提供一些插件的默认 API
- [el-bot-template](https://github.com/ElpsyCN/el-bot-template)：机器人模版
