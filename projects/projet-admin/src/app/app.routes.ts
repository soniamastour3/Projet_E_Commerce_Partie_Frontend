import { Routes } from '@angular/router';
import { LoginComponent } from './Authentification/login/login.component';
import { RegistreComponent } from './Authentification/registre/registre.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './component/layout/layout.component';
import { ListProductsComponent } from './component/list-products/list-products.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'registre', component: RegistreComponent},
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard],
         children:[
        { path: '', component: LayoutComponent },
        { path: 'listProduct', component: ListProductsComponent},
        {path: 'detailProduct/:id', component: DetailProductComponent}
    
    ] }
];
