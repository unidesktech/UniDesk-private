const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = function (options) {
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'libs/prisma/generated'),
            to: path.resolve(__dirname, 'dist/libs/prisma/generated'),
          },
        ],
      }),
    ],
  };
};
