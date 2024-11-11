import '@/styles/index.scss';

import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/types';

export const StyleDecorator: DecoratorFunction<ReactRenderer,
 { [x: string]: any; }> = (Story) => (<Story />);
