import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from './ngrx-aigor.service';


@Component({
  selector: 'lib-ngrx-aigor',
  template: `
    <!--    <div>monitorState$: {{aigorService.monitorState$ | async}}</div>-->
    <!--    <div>nextActionId$: {{aigorService.nextActionId$ | async}}</div>-->
    <!--    <div>actionsById$: {{aigorService.actionsById$ | async}}</div>-->
    <!--    <div>actions$: {{aigorService.actions$ | async}}</div>-->
    <!--    <div>stagedActionIds$: {{aigorService.stagedActionIds$ | async}}</div>-->
    <!--    <div>skippedActionIds$: {{aigorService.skippedActionIds$ | async}}</div>-->
    <!--    <div>committedState$: {{aigorService.committedState$ | async}}</div>-->
    <!--    <div>currentStateIndex$: {{aigorService.currentStateIndex$ | async}}</div>-->
    <!--    <div>computedStates$: {{aigorService.computedStates$ | async}}</div>-->
    <!--    <div>isLocked$: {{aigorService.isLocked$ | async}}</div>-->
    <!--    <div>isPaused$: {{aigorService.isPaused$ | async}}</div>-->
    <!--    <div>actionSelected$: {{aigorService.actionSelected$ | async}}</div>-->

    <div class="p-grid">
      <div class="p-col-fixed p-p-0">
        <p-listbox *ngLet="(aigorService.actions$ | async) as actions" [options]="actions" optionLabel="id" (onChange)="onChange($event, actions.indexOf($event.value))">
          <ng-template let-item pTemplate="item" let-i="index">
            <div>{{item.id}} {{item.action.type}}</div>
          </ng-template>
        </p-listbox>
      </div>
      <div class="p-col p-p-0">
        <span class="p-buttonset">
          <button pButton pRipple icon="pi pi-wallet" label="state" class="p-button-sm p-button-text" (click)="state()"></button>
          <button pButton pRipple icon="pi pi-th-large" label="diff" class="p-button-sm p-button-text" (click)="diff()"></button>
        </span>
        <lib-state-view *ngIf="stateView"></lib-state-view>
        <lib-state-diff *ngIf="diffView"></lib-state-diff>
      </div>
    </div>
    <div>
      <!--      <div class="p-d-flex p-mt-1 p-mb-1">-->
      <!--        <button pButton type="button" label="monitorState" class="p-button-sm p-mr-1"></button>-->
      <!--        <button pButton type="button" label="nextActionId" class="p-button-sm p-mr-1"></button>-->
      <!--        <button pButton type="button" label="actionsById" class="p-button-sm p-mr-1"></button>-->
      <!--      </div>-->
    </div>
  `,
  styles: []
})
export class NgrxAigorComponent implements OnInit {

  stateView = true;
  diffView = false;

  ev;

  public show = true;
  editorOptions = {theme: 'vs-dark', language: 'json'};

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

  onChange(event: any, i): void {
    console.log('NgrxAigorComponent.onChange()');
    console.log('event', event);
    console.log('i', i);
    this.aigorService.actionSelected$.next(i);
  }

  onInit(ev: any): void {
    this.ev = ev;
  }

  state(): void {
    this.stateView = true;
    this.diffView = false;
  }

  diff(): void {
    this.stateView = false;
    this.diffView = true;
  }
}
