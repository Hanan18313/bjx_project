module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', //解决prettier和eslint的冲突
    'plugin:prettier/recommended', //解决prettier和eslint的冲突
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-bitwise': 'off',
    indent: [
      'error',
      2,
      {
        MemberExpression: 1,
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral'],
        ObjectExpression: 1,
        ImportDeclaration: 1,
      },
    ], // 强制使用一致的缩进'
    'class-methods-use-this': 0,
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'], // 要求或禁止末尾逗号
    'object-curly-spacing': ['error', 'always'], // 强制在大括号中使用一致的空格
    'linebreak-style': 'off', // 强制使用一致的换行风格
    'import/extensions': 'off', // 确保在导入路径中统一使用文件扩展名
    'eol-last': 'off', // 要求或禁止文件末尾存在空行
    'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
    'no-unused-vars': 'warn', // 禁止出现未使用过的变量
    "@typescript-eslint/no-unused-vars": ["warn", { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }],
    'import/no-cycle': 'off', // 禁止一个模块导入一个有依赖路径的模块回到自己身上
    'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号
    eqeqeq: 'off', // 要求使用 === 和 !==
    'no-use-before-define': 'off', // 禁止在变量定义之前使用它们，则倾向于默认输出
    'prefer-destructuring': 'off', // 优先使用数组和对象解构
    'prefer-const': 'warn', // 要求使用 const 声明那些声明后不再被修改的变量
    'no-trailing-spaces': 'off', // 禁用行尾空格
    'vue/html-indent': ['error', 2], // 在<template>中强制一致缩进
    'vue/html-self-closing': 'off', // 执行自闭合的风格
    'no-var': 'off', // 禁止使用var
    strict: 'off', // 严格模式
    semi: [2, 'always'], //语句强制分号结尾
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'max-len': 0, // 单行最大长度限制关闭
    // 'max-len': ['error', 300],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用|判空
    'no-underscore-dangle': 'off', // 允许使用下划线
    'no-param-reassign': 0,
    'no-new': 0,
    // "prettier/prettier": "off"
    "@typescript-eslint/ban-types": ["error", { "extendDefaults": true,"types": { "Function": false } }] // Funtion可作为类型使用
  },
};
