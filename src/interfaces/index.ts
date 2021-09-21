export interface ProductItem {
  category: string;
  description: string;
  id?: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
