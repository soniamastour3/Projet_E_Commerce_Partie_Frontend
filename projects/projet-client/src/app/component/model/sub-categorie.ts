import { Categorie } from "./categorie";

export interface SubCategorie {
    id: number;
    name: String;
    description: String; 
    categorie: Categorie;
}
