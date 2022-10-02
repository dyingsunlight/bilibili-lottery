import * as path from 'path'
import { Configuration, DefinePlugin, ProgressPlugin, ProvidePlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { VueLoaderPlugin } from 'vue-loader'

const GRAY = '\x1b[90m'
const GREEN = '\x1b[32m'

export const createConfig = (args: {
  mode?: 'development' | 'production'
  outDir: string
  publicURL: string
  isSourceMapEnabled: boolean
  isMinimizeEnabled: boolean
  isFilenameHashEnabled: boolean
}) => {
  const {
    mode = 'development',
    outDir,
    isSourceMapEnabled,
    publicURL,
    isMinimizeEnabled,
    isFilenameHashEnabled,
  } = args
  const basePath = path.resolve(__dirname)
  return {
    devtool: isSourceMapEnabled ? 'source-map' : false,
    stats: {
      errorDetails: true,
      children: true
    },
    resolve: {
      fallback: {
        util: false,
        crypto: false,
      },
      modules: ['../node_modules'],
      extensions: ['.js', '.ts'],
    },
    output: {
      path: outDir,
      publicPath: publicURL,
      crossOriginLoading: 'use-credentials',
      libraryTarget: "commonjs2",
      filename: isFilenameHashEnabled ? '[contenthash].js' : '[name].js',
      devtoolModuleFilenameTemplate: info => info.resourcePath,
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
        chunkFilename: '[contenthash].css',
      }),
      new ProgressPlugin((percentage, message, ...args) => {
        console.info(`${GREEN}[Building] ${GRAY}${(percentage * 100).toFixed(2)}% `, message, ...args)
      }),

      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.MODE': JSON.stringify(mode),
        'import.meta.env.MODE': JSON.stringify(mode),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            // 'thread-loader',
            'vue-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
        {
          test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: ['base64-inline-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(basePath, './tsconfig.json'),
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ],
    },
    // cache: mode === 'production' ? false : { type: 'filesystem', cacheDirectory: path.resolve('../../.cache/webpack') },
    optimization: {
      minimize: isMinimizeEnabled,
    },
  } as Configuration
}
