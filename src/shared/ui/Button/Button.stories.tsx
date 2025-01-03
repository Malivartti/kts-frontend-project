import { Theme } from '@app/providers/ThemeProvider';
import { ThemeDecorator } from '@shared/configs/storybook/ThemeDecorator';
import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'components/Button',
  component: Button,
  argTypes: {
    className: {
      control: 'text',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined as undefined,
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined as undefined,
      },
    },
    children: {
      type: { name: 'string', required: false },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: 'Send',
  },
};

export const Dark: Story = {
  args: {
    children: 'Send',
  },
  decorators: [
    ThemeDecorator(Theme.DARK)
  ],
};