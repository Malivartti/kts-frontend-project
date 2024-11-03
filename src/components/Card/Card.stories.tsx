import { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/App/providers/ThemeProvider';
import { ThemeDecorator } from '@/configs/storybook/ThemeDecorator';

import Button from '../Button';
import Card from './Card';

const meta = {
  title: 'components/Card',
  component: Card,
  argTypes: {
    className: {
      control: 'text',
    },
    image: {
      control: 'text'
    },
    captionSlot: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
    title: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text',
    },
    subtitle: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text',
    },
    contentSlot: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    captionSlot: 'Текст над заголовком',
    title: 'Заголовок карточки в несколько строк Заголовок карточки в несколько строк',
    subtitle: 'Описание карточки Описание карточки Описание карточкиОписание карточкиОписание карточки Описание карточки',
    contentSlot: '$63.47',
    actionSlot: <Button>В корзину</Button>,
    image: './picture.svg'
  }
};

export const Dark: Story = {
  args: {
    captionSlot: 'Текст над заголовком',
    title: 'Заголовок карточки в несколько строк Заголовок карточки в несколько строк',
    subtitle: 'Описание карточки Описание карточки Описание карточкиОписание карточкиОписание карточки Описание карточки',
    contentSlot: '$63.47',
    actionSlot: <Button>В корзину</Button>,
    image: './picture.svg'
  },
  decorators: [
    ThemeDecorator(Theme.DARK)
  ]
};