/**
 *  * Created by dxz on 2020/8/11-8:59.
 * explain：【修改后需要重启】
 */
const docsLoader = require.resolve('./doc-loader') // 内容暂无

module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 去除html中多余的空格（空格默认渲染）
    extractCSS: !isDev, // vue中的css提取到css单独打包文件
    cssModules: {},
    // postcss 全局已配置
    hotReload: true, // 是否热重载（默认true：可局部更新，false：刷新整个页面更新【可能有vue-style-loader重载style样式】）
    loaders: { // 指定loader解析自定义docs标签
      'docs': docsLoader
    },
    preLoader: {}, // 先使用的loader
    postLoader: {} // 后使用的loader
  }
}