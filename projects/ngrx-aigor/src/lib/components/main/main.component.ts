import {Component, OnInit} from '@angular/core';
import {NgrxAigorService} from '../../ngrx-aigor.service';

@Component({
  selector: 'lib-main',
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

    <div class="p-d-flex">
      <div class="p-p-1">
        <p-listbox *ngLet="(aigorService.actions$ | async) as actions"
                   [options]="actions"
                   optionLabel="id"
                   [styleClass]="'h-100'"
                   (onChange)="onChange($event, actions.indexOf($event.value))">
          <ng-template let-item pTemplate="item" let-i="index">
            <div class="p-d-flex p-jc-between w-100">
              <div class="p-d-flex p-text-nowrap"><span>{{item.action.type}}</span></div>
              <div class="p-d-flex p-ml-2">
                <p-tag value="Jump" class="pointer p-mr-1 p-p-0" (click)="onJump(i)"></p-tag>
                <p-tag value="Skip" class="pointer p-p-0" (click)="onSkip(i)"></p-tag>
              </div>
            </div>
          </ng-template>
        </p-listbox>
      </div>
      <div class="p-p-1 w-100">
        <div class="p-buttonset p-p-1 p-mb-2 p-shadow-1">
          <button pButton pRipple icon="pi pi-volume-up" label="action" class="p-button-sm p-button-text" (click)="action()"></button>
          <button pButton pRipple icon="pi pi-volume-up" label="lifecycle" class="p-button-sm p-button-text" (click)="lifecycle()"></button>
          <button pButton pRipple icon="pi pi-wallet" label="state" class="p-button-sm p-button-text" (click)="state()"></button>
          <button pButton pRipple icon="pi pi-th-large" label="diff" class="p-button-sm p-button-text" (click)="diff()"></button>
        </div>
        <div class="p-buttonset p-p-1 p-shadow-1">
          <lib-state-view *ngIf="stateView"></lib-state-view>
          <lib-state-diff *ngIf="diffView"></lib-state-diff>
          <lib-action-view *ngIf="actionView"></lib-action-view>
          <lib-lifecycle-view *ngIf="lifecycleView"></lib-lifecycle-view>
        </div>
      </div>
    </div>
    <!--    <span class="p-buttonset">-->
    <!--      <button *ngLet="(aigorService.isPaused$ | async) as isPaused" pButton pRipple label="{{isPaused ? 'play' : 'pause'}}" class="p-button-sm" icon="pi {{isPaused ? 'pi-pause' : 'pi-play'}}" (click)="onPause(!isPaused)"></button>-->
    <!--      <button *ngLet="(aigorService.isLocked$ | async) as isLocked" pButton pRipple label="{{isLocked ? 'umlock' : 'lock'}}" class="p-button-sm" icon="pi {{isLocked ? 'pi-lock' : 'pi-lock-open'}}" (click)="onLock(!isLocked)"></button>-->
    <!--    </span>-->
  `,
  styles: [`
    .pointer {
      cursor: pointer;
    }

    .p-tag {
      padding: 0.1rem 0.25rem;
    }
  `],
})
export class MainComponent implements OnInit {

  lifecycleView = false;
  stateView = false;
  diffView = false;
  actionView = true;

  ev;

  public show = true;
  editorOptions = {theme: 'vs-dark', language: 'json'};

  constructor(public aigorService: NgrxAigorService) {
  }

  ngOnInit(): void {
  }

  onChange(event: any, i): void {
    console.log('NgrxAigorComponent.onChange()');
    this.aigorService.actionSelected$.next(i);
  }

  onInit(ev: any): void {
    this.ev = ev;
  }

  state(): void {
    this.lifecycleView = false;
    this.stateView = true;
    this.diffView = false;
    this.actionView = false;
  }

  diff(): void {
    this.lifecycleView = false;
    this.stateView = false;
    this.diffView = true;
    this.actionView = false;
  }

  action(): void {
    this.lifecycleView = false;
    this.stateView = false;
    this.diffView = false;
    this.actionView = true;
  }

  lifecycle(): void {
    this.lifecycleView = true;
    this.stateView = false;
    this.diffView = false;
    this.actionView = false;
  }

  onPause(status: boolean): void {
    console.log('NgrxAigorComponent.onPause()');
    this.aigorService.pauseRecording(status);
  }

  onLock(status: boolean): void {
    console.log('NgrxAigorComponent.onLock()');
    this.aigorService.lockChanges(status);
  }

  onJump(index: number): void {
    console.log('NgrxAigorComponent.onJump()');
    this.aigorService.jumpToState(index);
  }

  onSkip(index: number): void {
    console.log('NgrxAigorComponent.onSkip()');
    this.aigorService.jumpToAction(index);
  }
}
