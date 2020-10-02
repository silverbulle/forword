module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.105.91.30:6669',
        pathRewrite: { // 重写路径
          '^/api': ''
        },
        changeOrigin: true // 是否允许跨域
      }
    }
  }
}
