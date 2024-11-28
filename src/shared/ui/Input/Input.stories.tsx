
import { Theme } from '@app/providers/ThemeProvider';
import { ThemeDecorator } from '@shared/configs/storybook/ThemeDecorator';
import { Meta, StoryObj } from '@storybook/react';

import ArrowDownIcon from '../icons/ArrowDownIcon';
import Input from './Input';

const meta = {
  title: 'components/Input',
  component: Input,
  argTypes: {
    className: {
      control: 'text',
    },
    value: {
      control: 'text',
      mapping: {
        'undefined': undefined as undefined,
      },
    },
    placeholder: {
      control: 'text',
      mapping: {
        'undefined': undefined as undefined,
      },
    },
    disabled: {
      mapping: {
        'true': true,
        'false': false,
        'undefined': undefined as undefined,
      },
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    afterSlot: <ArrowDownIcon color="secondary" />,
    onChange: () => ({}),
    value: '',
  },
};

export const Dark: Story = {
  args: {
    afterSlot: <ArrowDownIcon color="secondary" />,
    onChange: () => ({}),
    value: '',
  },
  decorators: [
    ThemeDecorator(Theme.DARK)
  ],
};
