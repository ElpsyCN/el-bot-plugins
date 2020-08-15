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

    const name = `[${plugin.name}](./packages/${plugin.folder})`;
    const badge = `[![npm](https://img.shields.io/npm/v/${plugin.name})](https://www.npmjs.com/package/${plugin.name})`;
    const author = plugin.author.name
      ? `[${plugin.author.name}](${plugin.author.url})`
      : `[@${plugin.author}](https://github.com/${plugin.author})`;

    toc_md += `|${i + 1}|${name}|${badge}|${author}|${plugin.description}|\n`;
  }

  return toc_md;
}

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
