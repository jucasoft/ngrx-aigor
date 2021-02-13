import {NgModule} from '@angular/core';
import {NgrxAigorComponent} from './ngrx-aigor.component';
import {NgrxAigorService} from './ngrx-aigor.service';
import {OrderListModule} from 'primeng/orderlist';
import {CommonModule} from '@angular/common';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [NgrxAigorComponent],
  imports: [OrderListModule, CommonModule, ListboxModule],
  exports: [NgrxAigorComponent],
  providers: [NgrxAigorService]
})
export class NgrxAigorModule {
}
