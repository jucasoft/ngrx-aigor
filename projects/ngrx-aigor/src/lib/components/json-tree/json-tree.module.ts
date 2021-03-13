import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JsonTreeComponent} from './json-tree.component';
import {TreeModule} from 'primeng/tree';

@NgModule({
  declarations: [JsonTreeComponent],
  exports: [JsonTreeComponent],
  imports: [
    CommonModule,
    TreeModule
  ]
})
export class JsonTreeModule {
}
