import { Panier } from "./panier";
import { SubCategorie } from "./sub-categorie";

export interface Product {
    
productId: number;
    name: string;
    ret: string;
    color: string;
    qte: number;
    qte_en_stock: number;
    price: any;
    description: string;
    image: string;
    quantity: number;
    subcategorie: SubCategorie;
    panier: Panier;
}
