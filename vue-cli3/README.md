# vue-cli3  实战项目总结

## Project setup
```
yarn install 

yarn run serve  

```
构建项目步骤请参考vue-cli3 官网[https://cli.vuejs.org/zh/guide/]  
### 规范

文件名，约定好即可（构建成功之后有一定目录，在其基础上扩展）

```bash
├── build                      // 构建相关  
├── config                     // 配置相关
├── mock                      // 假数据
├── src                        // 源代码
│   ├── api                    // 所有网络请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目icons
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // 页面view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   └── Tradingview                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
```

这个没啥太多说的，记得页面级的组件， 放在view里，公用放在components 
### 数据mock的姿势
vue 中的假数据,在服务端没有开发完善的时候，前端可以自行mock假数据，进行开发  
vue-cli假数据，利用webpack-dev-server内置的express  在vue.config.js中设置
```
module.exports = {
  configureWebpack: {
    // 扩展webpack
    devServer: {
      before(app) {
        // app其实就是个exoress
        app.get('/api/goods', function (req, res) {
          res.json({
            list: [
              { text: '百万年薪架构师', price: 100 },
              { text: 'web全栈架构师', price: 80 },
              { text: 'Python爬虫', price: 60 }
            ]
          });
        });
      }
    }
  }
}
```
2. easy-mock + proxy

开发项目大部分 都会采用swagui 或者easy-mock这种接口文档工具

```js
      proxy: {
        // easymock开头的请求，webpack帮你转发到target之上
        '/easymock': {
          target: 'https://www.easy-mock.com/mock/5d6ccb5238b6442f949552e2/example/queryList',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/easymock': ''
          }
        }
      }
```
后端的开发环境，调试接口 ，除了proxy，还可以让后端直接开启跨域
```js
const express = require('express');
const app = express();

// //设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/api/goods', function (req, res) {
    res.json({
        title:'正式环境',
      list: [
        { text: '百万年薪架构师', price: 100 },
        { text: 'web全栈架构师', price: 8000 },
        { text: 'Python爬虫', price: 60 }
      ]
    });
});

const server = app.listen(9082, function () {
  console.log('Express app server listening on port %d', server.address().port);
});
```
同时还可以直接用mockjs  
### 代码的严谨性用  npm scripts + git hooks  

我们知道npm run lint 校验规则，每次手动执行太麻烦，我们希望做的，git的代码里保持纯净就可以，所以我们使用git hook 在commit代码之前，进行校验，lint不通过就不让commit 这避免了一部分的代码错误，发布项目问题  
我们使用husky支持更多的 Git Hooks 种类，再结合 [lint-staged](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fokonet%2Flint-staged)  
安装的命令
```js
npm i husky lint-staged -D
```
执行命令之后我们可以访问文件中的.git/hooks/pre-commit 被husky改写了
```brsh
#!/bin/sh
# husky

# Hook created by Husky
#   Version: 3.0.5
#   At: 2019-9-5 13:20:31
#   See: https://github.com/typicode/husky#readme

# From
#   Directory: /Users/Locke/majing/learn/调研/vue的相关学习/vue-learn/vue-cli3/node_modules/husky
#   Homepage: https://github.com/typicode/husky#readme

```
```json
//json 中文件
"husky": {
    "hooks": {
      "pre-commit": "npm run lint:js",
      "pre-push": "npm run test"
    }
  },
```
这里可以刻意写一些错误代码，然后git commit 
```brach
/Users/Locke/majing/learn/调研/vue的相关学习/vue-learn/vue-cli3/src/main.js
  7:1   error  Unexpected console statement  no-console
  7:20  error  'qw' is not defined           no-undef
```
每次commit ,都跑全量的eslint，大型项目会贼慢，而且如果推进新规范，上来就好几千个报错，基本不可行，可以使用lins-staged，只能监测当前git中改动的文件  

git push配合docker自动化部署，以后研究一下  

### webpack

vue-cli本身就是基于webpack，复杂项目中，还是要对vue.config.js中做扩展，所以对webpack也是要有一定的熟悉程度的
，基本配置rules，alise entry， output啥的
其实手动实现一个webpack打包的原理就是实现了一个__webpack_require__来实现自己的模块化，把代码都缓存在installModules里，代码文件已对象传递进来，key是路径，value是包裹的代码字符串，并把内部的require都被替换成了__webpack_require__,   
大概的意思就是，我们实现了一个__webpack_require__ 来实现自己的模块化，把代码都缓存在installedModules里，代码文件以对象传递进来，key是路径，value是包裹的代码字符串，并且代码内部的require，都被替换成了__webpack_require__,  如何自己写一个webpack，实现这些打包的逻辑
1.  loader  
loader 是一个函数，是做文件转换的

```js
const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
    // 使用 loaderUtils 来获取 loader 的配置项
    // this 是构建运行时的一些上下文信息
    const options = loaderUtils.getOptions(this);

    this.cacheable();

    // 把配置项直接传递给 marked
    marked.setOptions(options);

    // 使用 marked 处理 markdown 字符串，然后返回
    return marked(markdown);
};
```

2. plugins

 
plugins 的实现可以是一个类，plugin 实例中最重要的方式就是 `apply`,该方法在 webpack compiler 安装插件时会被调用一次 `apply` 接收
webpack complier 对象实例的引用，你可以在compiler 对象实例上注册各种事件钩子函数，来影响webpack 的所有构建流程，以便完成更多其他的构建任务。

```js

class Banner{
    constructor(content){
        this.content = content
    }

    apply(compiler){
        console.log('plugin执行拉')
        compiler.hooks.run.on(()=>{
            console.log('任务开始跑了')
        })
        compiler.hooks.emit.on(()=>{
            console.log(compiler.template)
            compiler.template = `
//      ┏┛ ┻━━━━━┛ ┻┓
//      ┃　　　　　　 ┃
//      ┃　　　━　　　┃
//      ┃　┳┛　  ┗┳　┃
//      ┃　　　　　　 ┃
//      ┃　　　┻　　　┃
//      ┃　　　　　　 ┃
//      ┗━┓　　　┏━━━┛
//        ┃　　　┃   神兽保佑
//        ┃　　　┃   代码无BUG！
//        ┃　　　┗━━━━━━━━━┓
//        ┃　　　　　　　    ┣┓
//        ┃　　　　         ┏┛
//        ┗━┓ ┓ ┏━━━┳ ┓ ┏━┛
//          ┃ ┫ ┫   ┃ ┫ ┫
//          ┗━┻━┛   ┗━┻━┛
            `+compiler.template
            // compiler.template = `/** ${this.content} */\n`+compiler.template
            console.log('完成啦 还没写文件')
        })
        compiler.hooks.done.on(()=>{
            // consol
            console.log('写文件结束')
        })
    }
}

module.exports = Banner
```



如何提高webpack编译速度和产出代码的性能，属于性能优化范畴

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
