import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { Forgetpassword1Component } from './components/forgetpassword1/forgetpassword1.component';
import { Verify1Component } from './components/verify1/verify1.component';
import { Resetpassword1Component } from './components/resetpassword1/resetpassword1.component';

const routes: Routes = [
  {path:'',canActivate:[authGuard],
    component:BlankLayoutComponent,children:
    [
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'cart',component:CartComponent},
      {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule) },
      
      {path:'products',component:ProductsComponent},
      {path:'allorders',component:AllordersComponent},
      {path:'checkout/:id',component:CheckoutComponent},
      {path:'details/:id',component:DetailsComponent},
      {path:'whishlist',component:WhishlistComponent},
      {path:'brands',component:BrandsComponent},
      {path:'categories',component:CategoriesComponent}

    ]
  },
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'forgot',component:Forgetpassword1Component},
    {path:'verify' , component:Verify1Component},
    {path:'resetpassword' , component:Resetpassword1Component},
    {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule) },
    {path:'register',component:RegisterComponent}
    
  ]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
