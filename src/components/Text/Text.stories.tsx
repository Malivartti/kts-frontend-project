import { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/App/providers/ThemeProvider';
import { ThemeDecorator } from '@/configs/storybook/ThemeDecorator';

import Text from './Text';

const meta = {
  title: 'components/Text',
  component: Text,
  argTypes: {
    className: {
      control: 'text',
    },
    view: {
      options: ['title', 'button', 'p-20', 'p-18', 'p-16', 'p-14'],
      mapping: ['title', 'button', 'p-20', 'p-18', 'p-16', 'p-14'],
      control: 'select'
    },
    tag: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span'],
      mapping:  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span'],
      control: 'select'
    },
    weight: {
      options: ['normal', 'medium', 'bold'],
      mapping:  ['normal', 'medium', 'bold'],
      control: 'select'
    },
    color: {
      options: ['primary', 'secondary', 'accent'],
      mapping:  ['primary', 'secondary', 'accent'],
      control: 'select'
    },
    children: {
      type: { name: 'string', required: false },
      defaultValue: 'Some text'
    }
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
    unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
    publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }
};

export const Dark: Story = {
  args: {
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
    unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
    publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
  ],
};