module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import  "@/styles/_main.scss";
        `
      }
    }
  }
}
