import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubCategory } from '../model/sub-category';
import { FilterPipe } from '../../../../../projet-client/src/app/component/filter.pipe';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterModule, FilterPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  products: Product[] = [];
  subcategorys: SubCategory[] =[];
  product!: Product ;
  productForm!: FormGroup;
  productFormA!: FormGroup;
  productId!: number;
  selectedfile!:File;
  providerId!: number;
  
  searchText: string = '';
  items: any[] = [];  
  
 


  constructor(private productService: ProductService, private router: Router,  private fb: FormBuilder, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    /*this.productService.getallproduct().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );*/
    this.productForm = this.fb.group({
     name :['', Validators.required],
     ret :[Validators.required],
     color :['', Validators.required],
     qte :[Validators.required],
     qte_en_stock :[Validators.required],
     price :[Validators.required],
     description :['', Validators.required]
    })
    this.productFormA = this.fb.group({
      name :['', Validators.required],
      ret :[Validators.required],
      color :['', Validators.required],
      qte :[Validators.required],
      qte_en_stock :[Validators.required],
      price :[Validators.required],
      description :['', Validators.required],
      subCategory_id:[Validators.required]
     })


    this.getAllProduct();
  }
  getAllProduct(){
    this.productService.getallproduct().subscribe(
      (data)=>{
        this.items = data;
      },
      (error)=>{
        console.error("Erreur lors de la récupération des produits: ", error)
      }
    )
  }

  getAllSubCategory(){
    this.productService.getAllSubCategory().subscribe(
      (data)=>{
        this.subcategorys = data;
        console.log(this.subcategorys)
      },
      (error)=>{
        console.error("Erreur lors de la récupération des subcategorys: ", error)
      }
    )
  }


  deleteProduct(id: number){
   this.productService.deleteproduct(id).subscribe({
    next:()=>{
      this.products= this.products.filter(p=>p.id!== id);
      
    
    },
    error:(err)=>{
      console.error("Erreur lors de la suppression", err)
    }
   }

   )
  }

  onSubmit(){
    if(this.productForm.valid){
    const formData: FormData = new FormData();
    const productData = this.productForm.value;
          formData.append('name',productData.name);  
          formData.append('ret', productData.ret); 
          formData.append('color',productData.color);
          formData.append('qte',productData.qte);
          formData.append('qte_en_stock', productData.qte_en_stock);
          formData.append('price', productData.price);
          formData.append('description', productData.description);

          if(this.selectedfile){
            formData.append('file',this.selectedfile);// Ajouter l'image au FormData
          }
    
    this.productService.updateproduct(this.productId, formData).subscribe(
      (res) => {
        console.log('le produit aprés la mise à jour:', res);
        this.getAllProduct();
      },
      (error) => console.error('Erreur lors de la mise à jour du produit', error)
    );}
  }

  addproduct(){
    if(this.productFormA.valid){
      const formData1: FormData = new FormData();
      
    const productData = this.productFormA.value;
          formData1.append('name',productData.name);  
          formData1.append('ret', productData.ret); 
          formData1.append('color',productData.color);
          formData1.append('qte',productData.qte);
          formData1.append('qte_en_stock', productData.qte_en_stock);
          formData1.append('price', productData.price);
          formData1.append('description', productData.description);
            formData1.append('subCategory_id',productData.subCategory_id);
            
          if(this.selectedfile){
            formData1.append('file',this.selectedfile);// Ajouter l'image au FormData
          }
          const provider_id = localStorage.getItem('id');
          var st = provider_id ? JSON.parse(provider_id) : 0;
          
          
      this.productService.addproduct(productData.subCategory_id, st, formData1).subscribe(
        (res)=>{
          console.log("Le produit est:", res);
        this.getAllProduct();
        
        // Reset the form after successful addition
        this.productFormA.reset();
      },
      (error)=>{
        console.error("Erreur lors d'ajout du produit", error)
      }
      ) 
    } else {
      // Optionally, handle the case where the form is invalid
      console.warn("Le formulaire est invalide.");
    }
  }

  productById(id: number){
    this.productService.getproduct(id).subscribe(
      (data)=>{
        this.product = data;
        this.productId= this.product.id;
        console.log("id de produit est: ", this.productId)
         // Utilisation de patchValue pour mettre à jour le formulaire avec les détails du produit
        this.productForm.patchValue({
          name: this.product.name,
          ret: this.product.ret,
          color: this.product.color,
          qte: this.product.qte,
          qte_en_stock: this.product.qte_en_stock,
          price: this.product.price,
          description: this.product.description
        })
        console.log(this.product);
      },
      (error)=>{
        console.error(error)
      }
    )

  }
  onFileSelected(event: any): void {
    this.selectedfile = event.target.files[0]; // Récupérer le fichier sélectionné
  }

  getImageUrl(filename: string): string {
    return this.productService.getImageUrl1(filename);
  }
}
