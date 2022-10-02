import path from "path";
import { createConfigs } from './dev.webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import Webpack from 'webpack'

;(async () => {
  const compiler = Webpack(createConfigs({
    mode: 'development',
    publicURL: '',
    isFilenameHashEnabled: false,
    isMinimizeEnabled: false,
    isSubResourceIntegrateEnabled: false,
    isSourceMapEnabled: true,
    outDir: path.resolve(__dirname, '../dist'),
    srcDir: path.resolve(__dirname, '../src/pages')
  }))
  const server = new WebpackDevServer({
    static: [
    ],
    compress: false,
    hot: true,
    https: false,
    port: 10015,
    devMiddleware: {
      writeToDisk: true
    }
  }, compiler)
  server.start()
})()
