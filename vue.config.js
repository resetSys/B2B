module.exports = {
  publicPath: "./",

  configureWebpack: {
    resolve: {
      alias: {
        'assets':'@/assets',
        'components':'@/components',
        'views':"@/views",
        'request':"@/request",
        'utils':"@/utils"
      }
    }
  },

  lintOnSave: undefined
}