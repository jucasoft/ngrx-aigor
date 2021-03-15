import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-state-view',
  template: `
    <!--    <div class="p-d-flex p-jc-end">-->
    <!--      <button pButton pRipple type="button" icon="pi pi-arrow-down" label="Fold" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="fold()"></button>-->
    <!--      <button pButton pRipple type="button" icon="pi pi-arrow-up" label="Unfold" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="unfold()"></button>-->
    <!--    </div>-->
    <lib-json-tree *ngLet="(aigorService.selectedStateData$ | async) as data"
                   [data]="data">
    </lib-json-tree>
  `,
  styles: []
})
export class StateViewComponent implements OnInit {

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

  fold(): void {
  }

  unfold(): void {
  }
}
