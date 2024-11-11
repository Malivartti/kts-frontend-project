import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/types';

import { Theme } from '@/App/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme): DecoratorFunction<ReactRenderer,
 { [x: string]: any; }> => (Story) => (
  <div className={`app ${theme}`}>
    <Story />
  </div>
);
