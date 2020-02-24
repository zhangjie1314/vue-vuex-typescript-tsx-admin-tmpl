const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

// 线上打包路径
const BASE_URL = process.env.NODE_ENV === 'prod' ? '/' : '/'

module.exports = {
    publicPath: BASE_URL,
    outputDir: 'dist',
    assetsDir: '',
    indexPath: 'index.html',
    pages: undefined, // 构建多页
    productionSourceMap: false,
    chainWebpack: config => {
        // 配置目录别名
        config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'))
    },
    css: {
        requireModuleExtension: true, // 启用 CSS modules
        extract: true, // 是否使用css分离插件
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {}, // css预设器配置项
    },
    devServer: {
        port: 8080, // 端口
        // proxy: 'https://www.easy-mock.com', // 设置代理
    },
}
