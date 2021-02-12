import {NgModule} from '@angular/core';
import {NgrxAigorComponent} from './ngrx-aigor.component';
import {NgrxAigorService} from './ngrx-aigor.service';
import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  declarations: [NgrxAigorComponent],
  imports: [OrderListModule],
  exports: [NgrxAigorComponent],
  providers: [NgrxAigorService]
})
export class NgrxAigorModule {
}
