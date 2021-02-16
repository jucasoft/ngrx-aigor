import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-state-view',
  template: `
    <div class="p-d-flex p-jc-end">
      <button pButton pRipple type="button" icon="pi pi-arrow-down" label="Test A" class="p-button-sm p-button-rounded p-button-text p-mr-1"></button>
      <button pButton pRipple type="button" icon="pi pi-arrow-up" label="Test B" class="p-button-sm p-button-rounded p-button-text p-mr-1"></button>
    </div>
    <ngx-monaco-editor *ngLet="(aigorService.monacoData$ | async) as monacofData"
                       [style]="{'width': '100%', 'height':'600px'}"
                       [options]="editorOptions"
                       [model]="monacofData"
                       (onInit)="onInit($event)">
    </ngx-monaco-editor>
  `,
  styles: []
})
export class StateViewComponent implements OnInit {

  ev;

  navi;

  editorOptions = {
    theme: 'vs-dark',
    language: 'json'
  };

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

  onInit(ev: any): void {
    this.ev = ev;
  }

}
