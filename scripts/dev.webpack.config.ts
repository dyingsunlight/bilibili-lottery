import * as path from 'path'
// @ts-ignore
import { Configuration, ProgressPlugin, Plugin, IgnorePlugin } from 'webpack'
import * as fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { createConfig } from './build.webpack.config'

export const createConfigs = function (args: {
  mode: 'development' | 'production'
  outDir: string
  srcDir: string
  publicURL: string
  isSourceMapEnabled: boolean
  isMinimizeEnabled: boolean
  isFilenameHashEnabled: boolean
  isSubResourceIntegrateEnabled: boolean
  entryFolderFilter?: (filePath: string) => boolean
  folderNameMappings?: { [key: string]: string }
  assetsManifests?: { [src: string]: string }
  assetsHashes?: { [src: string]: string }
}): Configuration[] {
  const {
    mode = 'development',
    srcDir,
    outDir,
    entryFolderFilter = () => true,
    folderNameMappings = {},
    isSourceMapEnabled,
    isFilenameHashEnabled,
    publicURL = process.env.PUBLIC_URL,
    isMinimizeEnabled,
  } = args

  const webpackConfigs: Configuration[] = []
  for (const folderName of fs.readdirSync(srcDir)) {
    if (!fs.existsSync(path.resolve(srcDir, folderName, 'entry.ts'))) continue

    if (!fs.statSync(path.resolve(srcDir, folderName)).isDirectory()) continue
    if (!entryFolderFilter(folderName)) continue

    const entryScript = require(path.resolve(srcDir, folderName, 'entry.ts')).default
    const presetConfigs = createConfig({
      mode,
      outDir: outDir,
      isSourceMapEnabled,
      isMinimizeEnabled,
      isFilenameHashEnabled,
      publicURL,
    })
    const webpackConfig: Configuration = {
      mode,

      ...presetConfigs,

      entry: entryScript.entries.reduce((prev, jsFilePath) => {
        const fullPath = path.resolve(srcDir, folderName, jsFilePath)
        const ext = path.extname(jsFilePath)
        const basename = path.basename(jsFilePath, ext)
        prev[`${basename}.${ext}`] = fullPath
        return prev
      }, {}),

      plugins: [
        ...presetConfigs.plugins,

        new HtmlWebpackPlugin({
          filename: (folderNameMappings[folderName] || folderName) + '.html',
          ...(entryScript.template
            ? {
                template: entryScript.template,
              }
            : {}),
          favicon: entryScript.favicon || undefined,
          inject: entryScript.inject ?? true,
        }),


      ],
    }

    webpackConfigs.push(webpackConfig)
  }

  console.log('Config: ', JSON.stringify(webpackConfigs, null, 2))

  return webpackConfigs
}
