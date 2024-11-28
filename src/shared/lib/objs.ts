interface IObj<T> {
  [key: string]: T;
}

export const getUniqueProperties = <T>(oldObj: IObj<T>, newObj: IObj<T>): Partial<IObj<T>> => {
  const res: Partial<IObj<T>> = {};
  Object.keys(oldObj).forEach((key) => {
    if (oldObj[key] !== newObj[key] || Array.isArray(oldObj[key])) {
      res[key] = newObj[key];
    }
  });
  return res;
};