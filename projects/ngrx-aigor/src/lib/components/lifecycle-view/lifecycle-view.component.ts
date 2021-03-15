import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-lifecycle-view',
  template: `
    <div *ngLet="(aigorService.selectedActionData$ | async) as monacoData">
      <lib-stack-resolver [stackframeMap]="monacoData.stackframeMap"></lib-stack-resolver>
    </div>
  `,
  styles: []
})
export class LifecycleViewComponent implements OnInit {

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

}
