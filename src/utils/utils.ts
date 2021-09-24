import { CartItem, ProductItem } from "@/interfaces";

export const findIndex = (arr: Array<CartItem>, data: ProductItem): number => {
  const index = arr.findIndex((v: CartItem) => v.product.id === data.id);
  return index;
};

export const capitalize = (value: string): string => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const currencySymbol = (value: string, symbol = "Rs."): string => {
  return `${symbol} ${value}`;
};
