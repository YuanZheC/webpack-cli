
## 主要 完成 通用的 react 开发环境 配置

## 延伸到 Vue 开发环境， 生产环境配置

> 核心模块
```js
"autoprefixer": "^7.2.5",
"webpack": "^3.10.0",
// babel 的核心功能模块，所有的 babel 包都依赖它
"babel-core": "^6.24.0",
// webpack 的 babel 加载器，带 JSX 编译支持
"babel-loader": "^6.4.1",
// ES2015语法支持，可以使用 ES6 最新特性
"babel-preset-es2015": "^6.24.0",
// 专为 react 优化，使代码支持 React ES6 classes 的写法，同时支持 JSX 语法格式
"babel-preset-react": "^6.23.0",
// react 的核心功能模块，所有的 react 包都依赖它
"react": "^15.4.2",
// react DOM 相关功能模块，独立出来发展和维护
"react-dom": "^15.4.2",
// 下面这些条 有什么作用
"babel-plugin-import": "^1.1.0", // ??
"babel-polyfill": "^6.23.0", // 垫片
"babel-preset-env": "^1.6.1", // ??
"babel-preset-stage-0": "^6.22.0", // 第一阶段
// 要兼容什么， 就下载响应的 transform
"babel-plugin-transform-class-properties": "^6.24.1",
"babel-plugin-transform-object-rest-spread": "^6.26.0",
"babel-plugin-transform-proto-to-assign": "^6.26.0",

"json-loader": "^0.5.7",
"less": "^2.7.3",
"less-loader": "^4.0.5",
"url-loader": "^0.5.7",
"uglifyjs-webpack-plugin": "^1.1.1",
    

```