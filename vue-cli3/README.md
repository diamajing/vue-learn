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


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
