export const onlyLatinLettersAndNumbers = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(value);
};

export const validateEmailString = (value: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

export const validatePhoneNumberString = (value: string): boolean => {
  const regex = /^\d{11}$/;
  return regex.test(value);
};

export const onlyNumbers = (value: string): boolean => {
  const regex = /^\d+$/;
  return regex.test(value);
};

export const validateCardNumberString = (value: string): boolean => {
  const regex = /^\d{16}$/;
  return regex.test(value);
};

export const validateCardExpiryString = (value: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return regex.test(value);
};