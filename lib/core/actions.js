const download = require("download-git-repo");
const { exec } = require("child_process");
const { HuyCli } = require("../config/repo");

const confirmMessage = `Are you sure you want to update the scaffolding project? (y/N) `;
const updateCommand = `cd ${__dirname} && git pull`;
let initGitCommand;

/**
 * @description: 创建新的项目
 * @param {*} project 项目名
 */
async function createProjectAction(project) {
  initGitCommand = `cd ${project} && git remote rm origin && cd -`;
  try {
    // 1.从编写的项目模板中clone下来项目
    await download(HuyCli, project, { clone: true }, CallBack);

    // 2.脚手架提示
    console.log("");
    console.log("Now you can run the following command:");
    console.log(`$: cd ${project}`);
    console.log(`$: npm install`);
  } catch (error) {
    console.log("github连接失败, 请稍后重试");
  }
}

/**
 * @description: 实际执行的 Action 更新脚手架函数
 * @param {*} _
 * @param {*} program
 * @return {*}
 */
async function updateAction(_, program) {
  if (program.force) {
    runUpdateCommand();
  } else {
    process.stdout.write(confirmMessage);
    process.stdin.once("data", (input) => {
      const answer = input.toString().trim();
      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "Y") {
        runUpdateCommand();
      } else {
        console.log("The update process has been canceled.");
        process.exit();
      }
    });
  }
}

/**
 * @description: 更新脚手架指令
 */
function runUpdateCommand() {
  exec(updateCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`${stdout}${stderr}`);
    console.log("The scaffolding project has been updated successfully.");
    process.exit();
  });
}

/**
 * @description: 回调函数
 * @param {*} err Error
 */
function CallBack(err) {
  if (err) {
    // console.error(err);
  }
  console.log("Downloaded!");

  exec(initGitCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}

module.exports = {
  createProjectAction,
  updateAction,
};
