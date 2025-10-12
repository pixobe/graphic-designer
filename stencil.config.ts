import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'graphic-designer',
  sourceMap: false,
  globalScript: 'src/global.ts',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  plugins: [sass()],
};
