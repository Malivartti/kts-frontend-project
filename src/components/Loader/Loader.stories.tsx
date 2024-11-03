import { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/App/providers/ThemeProvider';
import { ThemeDecorator } from '@/configs/storybook/ThemeDecorator';

import Loader from './Loader';

const meta = {
  title: 'components/Loader',
  component: Loader,
  argTypes: {
    className: {
      control: 'text',
    },
    size: {
      options: [undefined, 'l', 'm', 's'],
      mapping: ['undefined', 'l', 'm', 's'],
      control: 'select'
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  
};

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK)
  ]
};