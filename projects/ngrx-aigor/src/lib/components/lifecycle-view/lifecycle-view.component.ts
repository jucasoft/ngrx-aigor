import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';
import {EditorComponent} from 'ngx-monaco-editor';

@Component({
  selector: 'lib-lifecycle-view',
  template: `
    <div *ngLet="(aigorService.monacoSelectedActionData$ | async) as monacoData">
      <lib-stack-resolver [stackframeMap]="monacoData.stackframeMap"></lib-stack-resolver>
    </div>
  `,
  styles: []
})
export class LifecycleViewComponent implements OnInit {

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
