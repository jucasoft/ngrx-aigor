import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddressEditComponent} from './address-edit/address-edit.component';
import {AddressMainComponent} from './address-main/address-main.component';
import {AddressListComponent} from './address-list/address-list.component';
import {AddressRoutingModule} from './address-routing.module';
import {ButtonNewAddressComponent} from './components/button-new-address.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SearchModule} from '@components/search/search.module';
import {PipesModule} from '@core/pipe/pipes.module';
import {ButtonDeleteAddressComponent} from './components/button-delete-address.component';
import {ButtonEditManyTestAddressComponent} from './components/button-edit-many-test-address.component';
import {ButtonCreateManyTestAddressComponent} from './components/button-create-many-test-address.component';
import {NgLetModule} from '@core/directive/ng-let.directive';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  declarations: [
    AddressEditComponent,
    AddressMainComponent,
    AddressListComponent,
    ButtonNewAddressComponent,
    ButtonDeleteAddressComponent,
    ButtonEditManyTestAddressComponent,
    ButtonCreateManyTestAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PipesModule,
    SearchModule,
    NgLetModule,
    ToolbarModule
  ],
  providers: [],
  entryComponents: []
})
export class AddressModule {
}
