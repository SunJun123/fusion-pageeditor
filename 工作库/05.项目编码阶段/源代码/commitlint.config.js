/*
 * @Description: 提交信息规范的配置文件
 * @Author: sunjun
 * @Date: 2022-10-11 16:43:08
 * @LastEditors: sunjun
 * @LastEditTime: 2022-10-11 16:47:15
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修补bug
        "upd", // 更新功能
        "doc", // 文档（documentation）
        "style", // 格式（不影响代码运行的变动）
        "perf", // 性能优化
        "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "test", // 增加测试
        "chore", // 改变构建流程、或者增加依赖库、工具等
        "build", // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        "revert", // 回滚到上一个版本
        "mod" // 不确定分类的修改
      ]
    ],
    "type-case": [2, "always", "lower-case"],// <type> 格式 小写
    "type-empty": [2, "never"],// <type> 不能为空
    "scope-case": [0], // <scope> 范围格式
    "subject-empty": [2, "never"],// <subject> 主要 message 不能为空
    "subject-full-stop": [0, "never"],// <subject> 以什么为结束标志，禁用
    "subject-case": [0, "never"],// <subject> 格式，禁用
    "body-leading-blank": [1, "always"],// <body> 以空行开头
  },
};
