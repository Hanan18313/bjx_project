# bjx_project

# 注意事项

## commit 规范参考以下文档

1. Commitlit: https://commitlint.js.org/
2. Husky: https://github.com/typicode/husky

## 命令操作

1. 执行命令 npm run commit 校验代码格式失败时 执行命令 npm run eslint 进行代码格式修复

## 版本

1. node 版本 v18.12.1
2. npm 版本 v8.19.2

## 命令

1. npm run start 启动项目
2. npm run release3000 发布测试 3000 端口
3. npm run release4000 发布测试 4000 端口
4. npm run release5000 发布测试 5000 端口
5. npm run build 发布生产环境
6. npm run eslint eslint 校验、修复
7. npm run prettier prettier 格式校验修复
8. npm run lint:style 校验样式格式
9. npm run fix:style 修复校验样式文件
10. npm run commit 代码提交到暂存区

## vscode 添加设置

### 配置 settings.json

{
"security.workspace.trust.untrustedFiles": "open",
"diffEditor.ignoreTrimWhitespace": false,
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true,
"source.fixAll.stylelint": true,
"source.fixAll.prettier": true
},
"editor.tabSize": 2,
"http.proxyAuthorization": null
}

### 安装插件

1. Prettier - Code formatter
2. Stylelint
3. TypeScript Vue Plugin (Volar)

## 包管理

volta-cli 项目根目录下 执行 volta pin node@version
