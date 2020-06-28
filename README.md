# 社区插件

此处提供一些 [el-bot-js](https://github.com/ElpsyCN/el-bot-js/) 可用的社区插件。你可以为其提交 PR，提供给更多人使用，并在对应插件的 README 中留下你的大名。

## 说明

社区插件仓库中每个目录以插件名命名，不可重复。

### 命名规则

- 纯小写字母
- 多个单词时以 `-` 分割

各插件主入口文件为 `index.js`，并须附带 README.md 作为相关说明文档。

## 在 el-bot-js 中使用

el-bot-js 目录下

```sh
git clone https://github.com/ElpsyCN/el-bot-js-plugins packages/el-bot-js-plugins
```

修改你的 `config/custom/index.yml`：

> 插入对应想要加载的插件名

```yaml
plugins:
  community:
    - niubi
    - setu
```
