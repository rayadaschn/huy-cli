#!/usr/bin/env node
const { program } = require("commander");
const { createProjectAction, updateAction } = require("./core/actions");
const helpOptions = require("./core/help-options");

// 1.配置所有的options
helpOptions();

// 2.增加具体的一些功能操作
program
  .command("create <project> [options]")
  .description("create project into a folder")
  .action(createProjectAction);
program
  .command("update [isForce]")
  .description("Update the scaffolding project")
  .option("-f, --force", "Force update without confirmation")
  .action(updateAction);

// 让commander解析process.argv参数
program.parse(process.argv);
