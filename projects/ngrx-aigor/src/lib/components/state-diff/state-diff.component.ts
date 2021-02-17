import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-state-diff',
  template: `
    <div class="p-d-flex p-jc-end">
      <button pButton pRipple type="button" icon="pi pi-arrow-down" label="Next diff" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="nextDiff()"></button>
      <button pButton pRipple type="button" icon="pi pi-arrow-up" label="Prev diff" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="prevDiff()"></button>
    </div>
    <ngx-monaco-diff-editor *ngLet="(aigorService.monacoSelectedStateDifData$ | async) as monacoDifData"
                            [style]="{'width': '100%', 'height':'600px'}"
                            [options]="editorOptions"
                            [modifiedModel]="monacoDifData.modifiedModel"
                            [originalModel]="monacoDifData.originalModel"
                            (onInit)="onInit($event)">
    </ngx-monaco-diff-editor>
  `,
  styles: []
})
export class StateDiffComponent implements OnInit {

  ev;

  navi;

  editorOptions = {
    // theme: 'vs-dark',
    language: 'json',
    renderSideBySide: true
  };

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

  onInit(ev: any): void {
    this.ev = ev;
  }

  prevDiff(): void {
    this.ev.diffReviewPrev();
  }

  nextDiff(): void {
    this.ev.diffReviewNext();
  }
}
