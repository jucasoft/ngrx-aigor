import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from './ngrx-aigor.service';

@Component({
  selector: 'lib-ngrx-aigor',
  template: `
    <p-orderList [value]="collection$">
      <ng-template let-car pTemplate="item">
        <div>
          <div>{{car.brand}} - {{car.year}} - {{car.color}}</div>
        </div>
      </ng-template>
    </p-orderList>
  `,
  styles: []
})
export class NgrxAigorComponent implements OnInit {

  constructor(private ngrxAigorService: NgrxAigorService) {
  }

  collection$

  ngOnInit(): void {
  }

}
