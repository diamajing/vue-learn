module.exports = {
  configureWebpack: {
    // 扩展webpack
    devServer: {
      before (app) {
        // app就是一个express
        app.get('/api/goods', function (req, res) {
          res.json({
            list: [
              { text: '百万年薪架构师', price: 100,id:'1'},
              {
                text: 'web全栈架构师',
                price: 80,
                id: '3'
              },
              {
                text: 'Python爬虫',
                price: 60,
                id: '2'
              }
            ]
          })
        })
      },
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
    }

  }
}
