import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categorie } from '../model/categorie';
import { SubCategorie } from '../model/sub-categorie';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, NgxSliderModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  products: any;
  product!: Product;
  subCategories: SubCategorie[] = [];
  selectedColor: string | null = null;
  nameSearch= '';
  selectedValues: string[]=[];
  priceselection = '';
  minValue: number = 50;
  maxValue: number = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000,
  };



  constructor(private productService: ProductService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.getallproducts();
    this.getallSubcategoriies();
      
  }


  getallproducts(){
    this.productService.getallproducts().subscribe(
      (response)=>{
        this.products = response;
        console.log(this.products)
      },
      (error)=>{
        console.error("Erreur de récupération des produits", error)
      }
    )
  }
  getImageUrl(filename: string): string {
    return this.productService.getImageUrl1(filename);
  }

  getProduct(id: number){
      this.productService.getProduct(id).subscribe(
        (reponse)=>{
          this.product = reponse;
          console.log("le produit est", this.product) 
        },
        (error)=>{
          console.error("erreur lors de récupération de produit")
        }
      )
  }
  
  getallSubcategoriies(){
    this.productService.getallsubcategories().subscribe(
      (res)=>{
          this.subCategories= res;
          console.log("la liste de Subcategories est : ", this.subCategories)
      },
      (err)=>{
        console.error("erreur de récupérations de la liste de Subcatégories ", err)
      }
    )
   }
   getProductBySubcategory(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedValues.push(checkbox.value);
    } else {
      this.selectedValues = this.selectedValues.filter(
        (value) => value !== checkbox.value
      );
    }
  
    this.productService.getallproducts().subscribe((products: any) => {
  
      if (products && Array.isArray(products)) {
        if (this.selectedValues.length === 0) {
          this.products = products;  // Aucun filtre sélectionné
          console.log('Tous les produits :', this.products);
        } else {
          this.products = products.filter((product: any) => {
            const subcategoryId = product.subCategory?.id; // Accédez à subCategory ici
            const isSelected = this.selectedValues.includes(subcategoryId?.toString() || ''); // Utilisez une chaîne vide si undefined
            console.log(`Produit ID: ${subcategoryId}, Sélectionné: ${isSelected}`);
            return isSelected;
        });
        }
      } else {
        console.error('Aucune donnée de produit reçue.');
      }
    },
    (err) => {
      console.error('Erreur lors de la récupération des produits', err);
    });
  }
  
  changePrice(): void {
    console.log('Price change event:', this.priceselection);
    // Vérifiez si priceselection est défini
    if (!this.priceselection) {
      console.warn('No price selection provided.');
      return; // Quitte la méthode si aucune sélection de prix
    }
    // Récupération de la liste des produits
    this.productService.getallproducts().subscribe(
      (res: any) => {
        console.log(res)
        // Remplacez Product par le type approprié
        this.products = res;
        const [minPrice, maxPrice] = this.priceselection;
        // Filtrer les produits par prix
        this.products = this.products.filter(
          (product: Product) =>
            product.price >= minPrice && product.price <= maxPrice
        );
        console.log('Filtered products by price:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Vous pouvez également afficher un message d'erreur à l'utilisateur ici
      }
    );
  }
  filterByColor(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedValue = target.value;
    if (this.selectedColor === selectedValue) {
      this.selectedColor = null; // Désélectionnez la couleur si elle est déjà sélectionnée
    } else {
      this.selectedColor = selectedValue; // Sélectionnez la nouvelle couleur
    }
    // Appelez l'API pour récupérer les produits
    this.productService.getallproducts().subscribe(
      (products: any[]) => { // Utiliser directement 'products' comme tableau
        // Filtrer les produits en fonction de la couleur sélectionnée
        this.products = this.selectedColor
          ? products.filter((product: any) => product.color === this.selectedColor)
          : products; // Si aucune couleur n'est sélectionnée, affichez tous les produits
        console.log(this.selectedColor
          ? 'La liste des produits filtrée :'
          : 'Tous les produits :',
          this.products);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }
  
}
