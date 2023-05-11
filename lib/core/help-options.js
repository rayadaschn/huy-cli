const { program } = require("commander");

function helpOptions() {
  // 1.处理--version的操作
  const version = require("../../package.json").version;
  program.version(version, "-v --version");

  // 2. 打印其它说明
  program.on("--help", () => {
    console.log(""); // 增加间距
    console.log("Others: Created on 2023-05-10");
  });
}

module.exports = helpOptions;
