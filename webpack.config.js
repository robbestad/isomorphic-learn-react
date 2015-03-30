var path = require('path');

module.exports = {
  entry: "./app/client",

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join('app', 'js'),
    publicPath: '/js/'
  },

  module: {
    loaders: [
      { test: /[\.js?$|\.jsx?$]/, loaders: 
        ['jsx?harmony','babel-loader?experimental'], 
        exclude: /node_modules/ },
      { test: require.resolve('react'), 
        loader: 'expose?React' }
    ]
  },
 resolve: {
      // you can now require('file') instead of require('file.js')
      extensions: ['', '.js', '.json', '.jsx'],
      modulesDirectories: ['node_modules', 'vendors', 'app'],
      alias: {
        app: '/app/components'
      }
  }
};

