import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product } from '../model/product';
import { SubCategory } from '../model/sub-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

   }
   getallproduct(): Observable<Product[]>{

    return this.http.get<Product[]>(`${environment.url}/products/all`)
   }

   getAllSubCategory(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${environment.url}/subCategorys/all`)
   }



   deleteproduct(id: number):Observable<number>{
    return this.http.delete<number>(`${environment.url}/products/delete/${id}`)
   }
   getproduct(id: number): Observable<Product>{

    return this.http.get<Product>(`${environment.url}/products/getone/${id}`)
}

  updateproduct(id: number,  formData: FormData):Observable<any>{
    return this.http.put<any>(`${environment.url}/products/update/${id}`,formData)
  }

  addproduct(idsubCategory: number, idProvider: number, formData1: FormData): Observable<any>{
    return this.http.post<any>(`${environment.url}/products/saveImageSubPro/${idsubCategory}/${idProvider}`, formData1)
  }
  getImageUrl1(filename: string) {
    return `${environment.url}/products/images/${encodeURIComponent(filename)}`; 
  }

  
  
}
