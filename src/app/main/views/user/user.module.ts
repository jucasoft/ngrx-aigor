import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserMainComponent} from './user-main/user-main.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserRoutingModule} from './user-routing.module';
import {ButtonNewUserComponent} from './components/button-new-user.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SearchModule} from '@components/search/search.module';
import {PipesModule} from '@core/pipe/pipes.module';
import {ButtonDeleteUserComponent} from './components/button-delete-user.component';
import {ButtonEditManyTestUserComponent} from './components/button-edit-many-test-user.component';
import {ButtonCreateManyTestUserComponent} from './components/button-create-many-test-user.component';
import {NgLetModule} from '@core/directive/ng-let.directive';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  declarations: [
    UserEditComponent,
    UserMainComponent,
    UserListComponent,
    ButtonNewUserComponent,
    ButtonDeleteUserComponent,
    ButtonEditManyTestUserComponent,
    ButtonCreateManyTestUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
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
export class UserModule {
}
