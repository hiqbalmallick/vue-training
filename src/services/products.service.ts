import { get, post, put } from "@/plugins/axios";
import { AxiosResponse } from "axios";

const productService = {
  get: (): Promise<AxiosResponse<any>> => get(`products`),
  getById: (id: string): Promise<AxiosResponse<any>> => get(`products/${id}`),
  add: (body: any): Promise<AxiosResponse<any>> => post(`products`, body),
  update: (id: string, body: any): Promise<AxiosResponse<any>> =>
    put(`products/${id}`, body),
};
export default productService;
