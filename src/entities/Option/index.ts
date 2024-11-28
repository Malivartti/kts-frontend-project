import { CategoryModel } from '@entities/Category';

export interface OptionModel {
  key: string;
  value: string;
};

export const normalizeOption = (category: CategoryModel): OptionModel => {
  return {
    key: String(category.id),
    value: category.name,
  };
};