import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';
import {EditorComponent} from 'ngx-monaco-editor';

@Component({
  selector: 'lib-action-view',
  template: `
    <div *ngLet="(aigorService.monacoSelectedActionData$ | async) as monacoData">
      <ngx-monaco-editor #editorComponent
                         [style]="{'width': '100%', 'height':'600px'}"
                         [options]="editorOptions"
                         [model]="monacoData.action"
                         (onInit)="onInit($event, editorComponent)">
      </ngx-monaco-editor>
    </div>
  `,
  styles: []
})
export class ActionViewComponent implements OnInit {

  ev;
  editorComponent: EditorComponent;

  editorOptions = {
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
