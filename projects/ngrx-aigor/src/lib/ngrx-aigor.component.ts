import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lib-ngrx-aigor',
  template: `
    <lib-ngrx-aigor-container></lib-ngrx-aigor-container>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NgrxAigorComponent {

}


@Component({
  selector: 'lib-ngrx-aigor-container',
  template: `
    <lib-main class="lib-ngrx-aigor"></lib-main>
  `,
  styleUrls: ['ngrx-aigor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgrxAigorContainerComponent {

}
