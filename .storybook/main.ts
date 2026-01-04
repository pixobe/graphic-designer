const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@stencil/storybook-plugin',
    options: {},
    staticDirs: ['../assets'],
  },
};
export default config;
