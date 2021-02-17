import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';
import {EditorComponent} from 'ngx-monaco-editor';

@Component({
  selector: 'lib-state-view',
  template: `
    <div class="p-d-flex p-jc-end">
      <button pButton pRipple type="button" icon="pi pi-arrow-down" label="Fold" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="fold()"></button>
      <button pButton pRipple type="button" icon="pi pi-arrow-up" label="Unfold" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="unfold()"></button>
    </div>
    <ngx-monaco-editor *ngLet="(aigorService.monacoSelectedStateData$ | async) as monacofData"
                       #editorComponent
                       [style]="{'width': '100%', 'height':'600px'}"
                       [options]="editorOptions"
                       [model]="monacofData"
                       (onInit)="onInit($event, editorComponent)">
    </ngx-monaco-editor>
  `,
  styles: []
})
export class StateViewComponent implements OnInit {

  ev;
  editorComponent: any;

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

  fold(): void {
    this.editorComponent._editor.trigger('fold', 'editor.foldAll');
    // this.editorComponent;
    // this.editorComponent.foldAll();
  }

  unfold(): void {
    this.editorComponent._editor.trigger('fold', 'editor.unfoldAll');
    // this.editorComponent;
    // this.editorComponent.unfoldAll();
  }
}
