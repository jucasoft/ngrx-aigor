import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-state-diff',
  template: `
    <lib-json-delta *ngLet="(aigorService.diffData$ | async) as diffData" [data]="diffData"></lib-json-delta>
  `,
  styles: []
})
export class StateDiffComponent implements OnInit {

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

}
