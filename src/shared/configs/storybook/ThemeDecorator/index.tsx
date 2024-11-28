import { Theme } from '@app/providers/ThemeProvider';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/types';

export const ThemeDecorator = (theme: Theme): DecoratorFunction<ReactRenderer,
 { [x: string]: any; }> => (Story) => (
  <div className={`app ${theme}`}>
    <Story />
  </div>
);
