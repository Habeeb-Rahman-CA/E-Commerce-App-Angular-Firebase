import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'add-products', component: AddProductsComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'my-cart', component: MyCartComponent },
    {path: 'payment', component: PaymentComponent}

];
