import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Panier } from '../model/panier';
import { ProductService } from '../product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  quantityPro: number[]=[];
  totalPricePerProducts: number[] = [];
  panier!: Panier;
  productss: Product[]= [];
  totalProducts: number = 0;
  constructor(private productService: ProductService ){

  }
  ngOnInit(): void {
    this.getQuantity();
    this. getPanier();
    this.reloadPanier();
  }
  loadProducts() {
    this.productService.getallproducts().subscribe(data => {
        this.productss = data;
    });
}

// Function to reload panier
reloadPanier() {
    this.productService.getPanier().subscribe(panier => {
        this.panier = panier;
        console.log("le nombre de produits dans le panier est:", this.panier.products);
    });
}
  getImageUrl(filename: string): string {
    return this.productService.getImageUrl1(filename);
  }
  getPanier(){
    this.productService.getPanier().subscribe(
     (response)=>{
       this.panier= response;
       this.calculateTotalProducts();
     }
    )
 }
 calculateTotalProducts() {
  this.totalProducts = this.panier.products.reduce((total, product) => total + product.quantity, 0); // Utilisez product.quantity pour la somme
  console.log("Nombre total de produits dans le panier: ", this.totalProducts); // Journalisez le nombre total de produits
}

  getQuantity() {
    this.productService.getPanier().subscribe(
      (data: Panier) => {
        // Reset the quantityPro array
        this.quantityPro = [];
  
        
        // Iterate through the products in the panier
        data.products?.forEach((product: Product) => {
          // Push the quantity of each product into the quantityPro array
          this.quantityPro.push(product.quantity);
          console.log("La quantité du produit est: ", product.quantity);
          
          // Calculate and log the total price of the current product
          const totalPricePerProduct = product.price * product.quantity;
          this.totalPricePerProducts.push(totalPricePerProduct);
          console.log(`Le prix total pour le produit ${product.name} est: `, totalPricePerProduct);
        });
      }
    );
  }

  removeProductWithPanier(id : number) {
    this.productService.deleteproductwithpanier(id).subscribe(
      response => {
          console.log('Product removed successfully:', response);
          
        // Reload products and panier
      this.loadProducts();
      this.reloadPanier();
      window.location.reload();
      },
      error => {
          console.error('Error removing product:', error);
      }
  );
}
}
