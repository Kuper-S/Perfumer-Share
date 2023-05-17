const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
// THis is the path of the folder .
// C:\Projects\Perfumer-Share\client\webpack.config.js