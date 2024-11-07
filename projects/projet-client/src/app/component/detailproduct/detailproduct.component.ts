import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Product } from '../model/product';
import { SubCategorie } from '../model/sub-categorie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css'
})
export class DetailproductComponent implements OnInit{
  product!: Product;
  subCategories: SubCategorie[] = [];
  quantity: number = 1;

 
constructor(private productService: ProductService, private route: ActivatedRoute){

}
ngOnInit(): void {
  this.getProduct();
  this.getallsubcategoriies();
 
    
}
getProduct(){
  const id = Number(this.route.snapshot.paramMap.get('id')); 
  this.productService.getProduct(id).subscribe((data) => {
    this.product = data;
    console.log("productid",this.product)
  });
}
getImageUrl(filename: string): string {
  return this.productService.getImageUrl1(filename);
}

getallsubcategoriies(){
  this.productService.getallsubcategories().subscribe(
    (res)=>{
        this.subCategories= res;
        console.log("la liste de categories est : ", this.subCategories)
    },
    (err)=>{
      console.error("erreur de récupérations de la liste de catégories ", err)
    }
  )
 }
 

  increaseQuantity() {
    if (this.quantity < this.product.qte_en_stock) {
      this.quantity++;
    }else{
      alert("Dépasser la quantité en stock")
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addPanier(){
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.productService.addproducttopanier(id, this.quantity).subscribe(
      (res)=>{
        console.log(res);
        window.location.reload();
    },
    (err)=>{
      console.error(err)
    })
  }
}
