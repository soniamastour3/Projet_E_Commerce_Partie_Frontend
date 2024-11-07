import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from './model/product';
import { environment } from '../../environments/environment.development';
import { Categorie } from './model/categorie';
import { SubCategorie } from './model/sub-categorie';
import { Panier } from './model/panier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) { }

  getallproducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.url}/products/all`).pipe()
      //catchError(this.handleError)
  }

  getImageUrl1(filename: string) {
    return `${environment.url}/products/images/${encodeURIComponent(filename)}`; 
  }

  getProduct(id: number):Observable<Product>{
    return this.http.get<Product>(`${environment.url}/products/getone/${id}`)
  }

  getallsubcategories(): Observable<SubCategorie[]>{
   return this.http.get<SubCategorie[]>(`${environment.url}/subCategorys/all`)
  }

  filterByName(): Observable<any>{
    return this.http.get<any>(`${environment.url}/products/searchByName`);
  }

  addproducttopanier(product_id: number, quantity: number): Observable<Panier>{
    return this.http.post<Panier>(`${environment.url}/paniers/add/${product_id}?quantity=${quantity}`, 
      null);
  }

  getPanier(): Observable<Panier>{
    return this.http.get<Panier>(`${environment.url}/paniers/active`)
   }

   deleteproductwithpanier(productId: number): Observable<any> {
    // Check if the ID is valid
    if (!productId) {
        console.error('Invalid product ID:', productId);
        return throwError('Invalid product ID'); // Emit an error
    }
    return this.http.delete<any>(`${environment.url}/paniers/remove/${productId}`);
}
}
