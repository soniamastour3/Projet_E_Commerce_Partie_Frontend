import { SubCategorie } from "./sub-categorie";

export interface Categorie {
    id: number;
    name: String;
    description: String;
    subCatgorie: SubCategorie;
}
