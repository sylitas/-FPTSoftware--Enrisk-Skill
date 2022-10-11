const path = require('path');
const { yamlParse } = require('yaml-cfn');
const fs = require('fs');
const { functions } = yamlParse(fs.readFileSync('./serverless.yml'));

module.exports = {
  entry: Object.keys(functions)
    .map((key) => functions[key].handler)
    .reduce((result, current) => {
      const entry = current.split('.')[0].replace('dist/', '');
      if (!result[entry]) {
        result[entry] = `./src/${entry}`;
      }
      return result;
    }, {}),

  mode: 'development',
  target: 'node',
  devtool: false, // 'source-map',
  resolve: {
    extensions: ['.js', '.es6'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [],
  externals: [
    'aws-sdk',
    {
      express: 'express',
    },
  ],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    minimize: false,
  },
};
