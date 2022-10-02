import Webpack from 'webpack'
import { createConfig } from './build.webpack.config'
import path from 'path'

const config = {
  ...createConfig({
    mode: 'production',
    outDir: path.resolve(__dirname, '../dist'),
    publicURL: '',
    isSourceMapEnabled: true,
    isMinimizeEnabled: true,
    isFilenameHashEnabled: false
  }),
  entry: {
    'index': path.join(__dirname, '../src/index.ts')
  }
}

console.log('config', config)

Webpack(config, (err, stats) => {
  // [Stats Object](#stats-object)
  if (err || stats.hasErrors()) {
    console.error('err', err, stats)
  }
})
