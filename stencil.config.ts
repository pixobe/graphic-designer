import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'graphic-designer',
  sourceMap: false,
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  plugins: [sass()],
};
