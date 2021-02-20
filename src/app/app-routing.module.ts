import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{path: '', redirectTo: 'home', pathMatch: 'full'}, {path: 'home', loadChildren: () => import('./main/views/home/home.module').then(m => m.HomeModule)}, {path: 'user', loadChildren: () => import('./main/views/user/user.module').then(m => m.UserModule)}, {path: 'address', loadChildren: () => import('./main/views/address/address.module').then(m => m.AddressModule)}, {path: 'company', loadChildren: () => import('./main/views/company/company.module').then(m => m.CompanyModule)},];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
