import type { Preview } from '@storybook/html-vite';
import '../www/build/graphic-designer.esm.js';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
