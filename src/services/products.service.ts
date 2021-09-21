import { ProductItem } from "@/interfaces";
import { get, post, put } from "@/plugins/axios";
import { AxiosResponse } from "axios";

const productService = {
  get: (): Promise<AxiosResponse<Array<ProductItem>>> => get(`products`),
  getById: (id: string): Promise<AxiosResponse<ProductItem>> =>
    get(`products/${id}`),
  add: (body: ProductItem): Promise<AxiosResponse<void>> =>
    post(`products`, body),
  update: (id: string, body: ProductItem): Promise<AxiosResponse<void>> =>
    put(`products/${id}`, body),
};
export default productService;
