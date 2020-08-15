# 官方插件

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

此处提供一些 [el-bot](https://github.com/ElpsyCN/el-bot/) 可用的官方插件。你可以为其提交 PR，提供给更多人使用。

## [插件目录](./TOC.md)

> 此处的插件将由 el-bot 官方进行审核，并发布为 [`@el-bot`](https://www.npmjs.com/org/el-bot) 命名空间下的 npm 包。

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
      // 官方插件
      official: ["niubi"],
      // 使用社区插件 el-bot-plugin-xxx
      // community: ['xxx]
    },
  },
};
```

> 或 yml 插入对应想要加载的插件名（自行解析载入）

```yaml
plugins:
  official:
    - niubi
    - setu
```

## 开发

欢迎提交更多有趣的插件。

插件可以默认使用 [mirai-ts](https://github.com/YunYouJun/mirai-ts) 中的 API 以提升开发效率。

同时也可以参考 [配置讲解](https://docs.bot.elpsy.cn/js/config.html) 中的一些配置设计，并可直接引入 el-bot 中已有的一些根据配置匹配、发送等函数。

更多插件开发内容见 [插件系统](https://docs.bot.elpsy.cn/js/plugins/)。

### 命名规则

- 纯小写字母
- 多个单词时以 `-` 分割
- 若插件含有自定义配置，请与插件名保持一致

如 niubi 插件对应的配置为：

```yaml
niubi:
  url: https://el-bot-api.vercel.app/api/niubi
  match:
    - re:
        pattern: 来点(\S*)笑话
    - includes: nb
```

### 说明

- 官方插件仓库中每个目录以插件名命名，不可重复。
- 须附带 README.md 作为相关说明文档。
- 并填写上名称、版本、描述、作者、协议等，这些将会在加载插件时，作为插件的信息记录。
- 因为 mirai 属于 [AGPL-3.0](https://github.com/mamoe/mirai/blob/master/LICENSE) 协议，您提交在本仓库的插件将须默认使用 AGPL-3.0 协议。
- `dist` 文件无须提交，将由仓库统一发布编译并发布于 `@el-bot` 命名空间下。

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
  "main": "index.js",
  "author": "YunYouJun",
  "license": "AGPL-3.0",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "echo index.js"
  }
}
```

#### JavaScript

原生 js 入口文件为 `index.js`，使用 nodejs 原生可运行的语法进行编写，发布时不会被编译。

#### TypeScript

入口文件为 `dist/index.js`，发布时将自动编译 `src/index.ts` 生成。

## 相关

- [el-bot](https://github.com/ElpsyCN/el-bot)：机器人主体
- [el-bot-api](https://github.com/ElpsyCN/el-bot-api): 提供一些插件的默认 API
- [el-bot-template](https://github.com/ElpsyCN/el-bot-template)：机器人模版
