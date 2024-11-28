import type { Preview } from '@storybook/react';

import { Theme } from '../../src/app/providers/ThemeProvider';
import { StyleDecorator } from '../../src/shared/configs/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/configs/storybook/ThemeDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT)
  ],
};

export default preview;
