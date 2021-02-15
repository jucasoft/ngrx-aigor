import {NgModule} from '@angular/core';
import {NgrxAigorComponent} from './ngrx-aigor.component';
import {NgrxAigorService} from './ngrx-aigor.service';
import {OrderListModule} from 'primeng/orderlist';
import {CommonModule} from '@angular/common';
import {ListboxModule} from 'primeng/listbox';
import {FormsModule} from '@angular/forms';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {ButtonModule} from 'primeng/button';
import {SplitterModule} from 'primeng/splitter';

@NgModule({
  declarations: [NgrxAigorComponent],
  imports: [
    OrderListModule,
    CommonModule,
    ListboxModule,
    FormsModule,
    MonacoEditorModule,
    ButtonModule,
    SplitterModule
  ],
  exports: [NgrxAigorComponent],
  providers: [NgrxAigorService]
})
export class NgrxAigorModule {
}
