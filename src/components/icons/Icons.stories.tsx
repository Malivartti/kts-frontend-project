import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Theme } from '@/App/providers/ThemeProvider';
import { ThemeDecorator } from '@/configs/storybook/ThemeDecorator';

import ArrowDownIcon from './ArrowDownIcon';
import CheckIcon from './CheckIcon';
import { IconProps } from './Icon';

const Component = (props: IconProps) => (
  <div style={{ display: 'flex', gap: '20px'}}>
    <CheckIcon {...props} />
    <ArrowDownIcon {...props} />
  </div>
);

const meta = {
  title: 'components/Icons',
  component: Component,
  argTypes: {
    className: {
      control: 'text',
    },
    color: {
      options: ['primary', 'secondary', 'accent'],
      mapping:  ['primary', 'secondary', 'accent'],
      control: 'select'
    },
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK)
  ]
};