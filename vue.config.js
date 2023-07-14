const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/jingdong',
  transpileDependencies: true,
  // 忽略格式报错
  lintOnSave: false
})
