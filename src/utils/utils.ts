import { CartItem, ProductItem } from "@/interfaces";

export const findIndex = (arr: Array<CartItem>, data: ProductItem): number => {
  const index = arr.findIndex((v: CartItem) => v.product.id === data.id);
  return index;
};
