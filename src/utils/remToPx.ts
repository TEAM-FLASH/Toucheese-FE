export const remToPx = (remValue: number) =>
  remValue * parseFloat(getComputedStyle(document.documentElement).fontSize);
