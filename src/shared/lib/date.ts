function formatDateNumber(number: number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

export const formatDDMMYYYY = (date: Date): string => {
  return `${formatDateNumber(date.getDate())}.${formatDateNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
};