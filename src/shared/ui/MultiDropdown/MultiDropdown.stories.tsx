import { Theme } from '@app/providers/ThemeProvider';
import { IOption } from '@entities/MultiDropdown';
import { ThemeDecorator } from '@shared/configs/storybook/ThemeDecorator';
import { Meta } from '@storybook/react';
import React from 'react';

import MultiDropdown, { MultiDropdownProps } from './MultiDropdown';

const OPTIONS = [
  { key: 'msk', value: 'Moscow' },
  { key: 'spb', value: 'Saint Petersburg' },
  { key: 'ekb', value: 'Ekaterinburg' }
];

const Component = (props: MultiDropdownProps) => {
  const [value, setValue] = React.useState<IOption[]>(Array.isArray(props.value) ? props.value : []);

  return (
    <MultiDropdown
      className={props.className}
      disabled={props.disabled}
      options={OPTIONS}
      onChange={setValue}
      value={value}
      getTitle={(values: IOption[]) => values.length === 0 ? 'Выберите города': values.map(({ value }) => value).join(', ')}
    />
  );
};

const meta = {
  title: 'components/MultiDropdown',
  component: Component,
  argTypes: {
    className: {
      control: 'text',
    },
    value: {
      mapping: String,
      control: 'object',
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
} satisfies Meta<typeof MultiDropdown>;

export default meta;

export const Light = {};

export const Dark = {
  decorators: [
    ThemeDecorator(Theme.DARK)
  ],
};
