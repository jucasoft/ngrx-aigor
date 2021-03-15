import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-action-view',
  template: `
    <lib-json-tree *ngLet="(aigorService.selectedActionData$ | async) as data"
                   [data]="data">
    </lib-json-tree>
  `,
  styles: []
})
export class ActionViewComponent implements OnInit {

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

}
