import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lib-ngrx-aigor',
  template: `
    <lib-ngrx-aigor-container></lib-ngrx-aigor-container>
  `,
  styles: [],
})
export class NgrxAigorComponent {

}


@Component({
  selector: 'lib-ngrx-aigor-container',
  template: `
    <lib-main></lib-main>
  `,
  styleUrls: ['ngrx-aigor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgrxAigorContainerComponent {

}
