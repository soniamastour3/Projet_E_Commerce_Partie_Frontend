import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { ShopComponent } from './component/shop/shop.component';
import { DetailproductComponent } from './component/detailproduct/detailproduct.component';
import { RegistreComponent } from './authentification/registre/registre.component';
import { LoginComponent } from './authentification/login/login.component';
import { PanierComponent } from './component/panier/panier.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, children:[
        { path: '', component: LayoutComponent },
        { path: 'shop', component: ShopComponent},
        { path: 'detail/:id', component: DetailproductComponent},
        {path: 'registre', component: RegistreComponent},
        {path:'login', component: LoginComponent},
        {path: 'panier', component: PanierComponent}
    ]},
];
