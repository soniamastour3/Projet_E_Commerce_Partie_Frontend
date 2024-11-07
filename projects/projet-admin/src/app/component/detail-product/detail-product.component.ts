import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  product!: Product;
  constructor(private productService: ProductService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get product ID from route
    this.productService.getproduct(id).subscribe((data) => {
      this.product = data;
    });
  }
  getImageUrl(filename: string): string {
    return this.productService.getImageUrl1(filename);
  }
}
