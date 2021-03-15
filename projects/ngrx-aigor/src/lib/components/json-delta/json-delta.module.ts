import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JsonDeltaComponent} from './json-delta.component';
import {TreeModule} from 'primeng/tree';


@NgModule({
  declarations: [JsonDeltaComponent],
  imports: [
    CommonModule,
    TreeModule
  ],
  exports: [JsonDeltaComponent]
})
export class JsonDeltaModule {
}
