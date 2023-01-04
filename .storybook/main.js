const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {mergeConfig, loadConfigFromFile} = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [ "@storybook/addon-essentials" ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  async viteFinal(previousConfig) {
    const { config } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    );
    return mergeConfig(previousConfig, {
      ...config,
      plugins: [
      ],
    });
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~@': path.resolve(__dirname, '../src')
    }
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.module.rules.push( {
      test: /\.txt$/i,
      use: 'raw-loader',
    });
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
};
