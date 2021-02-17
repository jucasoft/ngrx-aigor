import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';
import {EditorComponent} from 'ngx-monaco-editor';

@Component({
  selector: 'lib-action-view',
  template: `
    <div class="p-d-flex p-jc-end">
      <button pButton pRipple type="button" icon="pi pi-arrow-down" label="Test A" class="p-button-sm p-button-rounded p-button-text p-mr-1"></button>
      <button pButton pRipple type="button" icon="pi pi-arrow-up" label="Test B" class="p-button-sm p-button-rounded p-button-text p-mr-1"></button>
    </div>
    <ngx-monaco-editor *ngLet="(aigorService.monacoSelectedActionData$ | async) as monacofData"
                       #editorComponent
                       [style]="{'width': '100%', 'height':'600px'}"
                       [options]="editorOptions"
                       [model]="monacofData"
                       (onInit)="onInit($event, editorComponent)">
    </ngx-monaco-editor>`,
  styles: []
})
export class ActionViewComponent implements OnInit {

  ev;
  editorComponent: EditorComponent;

  editorOptions = {
    // theme: 'vs-dark',
    language: 'json'
  };

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

  onInit(ev: any, editorComponent: EditorComponent): void {
    this.ev = ev;
    this.editorComponent = editorComponent;
  }

}
