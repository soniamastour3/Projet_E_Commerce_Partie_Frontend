import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { Panier } from '../model/panier';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit{
  
  panier!: Panier;
  quantityPro: number[]=[];
  totalPricePerProducts: number[] = [];
  product!: Product;
  productss: Product[]=[];
  ProductId: number[]=[];



  constructor(private productService: ProductService, private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.getPanier(); 
      this.getQuantity();
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
    });
}
getPanier(){
   this.productService.getPanier().subscribe(
    (response)=>{
      this.panier= response;
      console.log("le panier est: ", this.panier)
    }
   )
}

removeProductWithPanier(id : number) {
        this.productService.deleteproductwithpanier(id).subscribe(
          response => {
              console.log('Product removed successfully:', response);
              // Optionally refresh the product list
              Swal.fire({
                icon: 'success',
                title: 'suppression avec success',
                text: 'Produit a été Supprimé avec succès.',
                willClose: () => {
                  // Reload the page when the modal is closed
                  window.location.reload();
              }
          }).then(() => {
              // Optionally refresh the product list and panier
              this.loadProducts();
              this.reloadPanier();
          });
       
          },
          error => {
              console.error('Error removing product:', error);
          }
      );
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



getImageUrl(filename: string): string {
  return this.productService.getImageUrl1(filename);
}
}
