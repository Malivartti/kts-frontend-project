import { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/App/providers/ThemeProvider';
import { ThemeDecorator } from '@/configs/storybook/ThemeDecorator';

import CheckBox from './CheckBox';

const meta = {
  title: 'components/CheckBox',
  component: CheckBox,
  argTypes: {
    className: {
      control: 'text',
    },
    disabled: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined as undefined,
      },
      control: 'boolean',
    },
    checked: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined as undefined,
      },
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    onChange: () => '',
  },
};

export const Dark: Story = {
  args: {
    onChange: () => '',
  },
  decorators: [
    ThemeDecorator(Theme.DARK)
  ],
};