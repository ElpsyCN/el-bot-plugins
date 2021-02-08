// @ts-nocheck
const fs = require("fs");

/**
 * 生成 markdown
 */
function generateMarkdown(plugins) {
  let toc_md = `# 插件目录 (${plugins.length})

|#|名称|版本|作者|简介|
|-|---|---|----|---|
`;

  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];

    let name = plugin.folder
      ? `[${plugin.name}](./packages/${plugin.folder})`
      : `[${plugin.name}](https://github.com/${plugin.author}/${plugin.name})`;

    if (plugin.deprecated) {
      name += "（已弃用）";
    }
    const badge = `[![npm](https://img.shields.io/npm/v/${plugin.name})](https://www.npmjs.com/package/${plugin.name})`;
    const author = plugin.author.name
      ? `[${plugin.author.name}](${plugin.author.url})`
      : `[@${plugin.author}](https://github.com/${plugin.author})`;

    toc_md += `|${i + 1}|${name}|${badge}|${author}|${plugin.description}|\n`;
  }

  return toc_md;
}

/**
 * 生成官方插件目录
 */
function generateOfficialPluginsToc() {
  fs.readdir("./packages", (err, files) => {
    if (err) console.log(err);

    let plugins = [];
    files.forEach((file) => {
      try {
        const pkg = require(`../packages/${file}/package.json`);
        pkg.folder = file;
        plugins.push(pkg);
      } catch (err) {}
    });

    const md = generateMarkdown(plugins);
    fs.writeFile("TOC.md", md, (err) => {
      if (err) throw err;
      console.log(`成功生成插件目录，共 ${plugins.length} 个插件。`);
    });
  });
}

/**
 * 生成社区插件目录
 */
function generateCommunityPluginsToc() {
  try {
    fs.mkdirSync("./dist/");
  } catch ({ code }) {
    if (code !== "EEXIST") return;
  }

  const yaml = require("js-yaml");
  const data = yaml.load(fs.readFileSync("./data/plugins.yml", "utf8"));
  if (data.community) {
    const communityPlugins = data.community;
    const communityMd = generateMarkdown(communityPlugins);
    fs.writeFile("./dist/community.md", communityMd, (err) => {
      if (err) throw err;
      console.log(
        `成功生成社区插件目录，共 ${communityPlugins.length} 个插件。`
      );
    });
  }
}

// start
generateOfficialPluginsToc();
generateCommunityPluginsToc();
