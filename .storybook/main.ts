import type { StorybookConfig } from '@storybook/html-vite';

const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/html-vite',
    options: {},
    staticDirs: ['../assets'],
  },
};
export default config;
