import { Product } from "./product";

export interface Panier {
id: number;
qteTotal: number;
totalPrice: number;
active: boolean;
products: Product[];
}