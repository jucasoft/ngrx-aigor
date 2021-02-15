import {Component, OnInit, ViewChild} from '@angular/core';
import {MonoTypeOperatorFunction, Observable, pipe} from 'rxjs';
import {ComputedState, LiftedAction, LiftedActions} from '@ngrx/store-devtools/src/reducer';
import {StoreDevtools} from '@ngrx/store-devtools';
import {distinctUntilChanged, map, withLatestFrom} from 'rxjs/operators';
import {NgxEditorModel} from 'ngx-monaco-editor';

const mySelect = (keySelector: (x: any) => any): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(keySelector),
    distinctUntilChanged((x, y) => x === y)
  );
};

const toNgxEditorModel = (): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(value => JSON.stringify(value)),
    map(value => ({value, language: 'json', uri: undefined}))
  );
};

export interface MyLiftedAction extends LiftedAction {
  id: number;
}

@Component({
  selector: 'lib-ngrx-aigor',
  template: `
    <div class="p-d-flex p-mt-1 p-mb-1">
      <button pButton type="button" label="monitorState" class="p-button-sm p-mr-1" (click)="monitorState()"></button>
      <button pButton type="button" label="nextActionId" class="p-button-sm p-mr-1" (click)="nextActionId()"></button>
      <button pButton type="button" label="actionsById" class="p-button-sm p-mr-1" (click)="actionsById()"></button>
      <button pButton type="button" label="actions" class="p-button-sm p-mr-1" (click)="actions()"></button>
      <button pButton type="button" label="stagedActionIds" class="p-button-sm p-mr-1" (click)="stagedActionIds()"></button>
      <button pButton type="button" label="skippedActionIds" class="p-button-sm p-mr-1" (click)="skippedActionIds()"></button>
      <button pButton type="button" label="committedState" class="p-button-sm p-mr-1" (click)="committedState()"></button>
      <button pButton type="button" label="currentStateIndex" class="p-button-sm p-mr-1" (click)="currentStateIndex()"></button>
      <button pButton type="button" label="computedStates" class="p-button-sm p-mr-1" (click)="computedStates()"></button>
      <button pButton type="button" label="isLocked" class="p-button-sm p-mr-1" (click)="isLocked()"></button>
      <button pButton type="button" label="isPaused" class="p-button-sm p-mr-1" (click)="isPaused()"></button>
    </div>

    <p-splitter [panelSizes]="[20,80]" layout="horizontal">
      <ng-template>
        <p-listbox [options]="actions$ | async" (onChange)="onChange($event)" optionLabel="id">
          <ng-template let-item pTemplate="item" let-i="index">
            <div>{{item.id}} {{item.action.type}}</div>
          </ng-template>
        </p-listbox>
      </ng-template>
      <ng-template>
        <ngx-monaco-editor #editor [style]="{'width': '100%', 'height':'1000px'}" [options]="editorOptions" [model]="(monacoData$ | async)" (onInit)="onInit($event)"></ngx-monaco-editor>
      </ng-template>
    </p-splitter>
  `,
  styles: []
})
export class NgrxAigorComponent implements OnInit {

  ev;

  @ViewChild('editor', {static: true}) editor: any;

  editorOptions = {theme: 'vs-dark', language: 'json'};

  monitorState$: Observable<any>;
  nextActionId$: Observable<number>;
  actionsById$: Observable<LiftedActions>;
  actions$: Observable<MyLiftedAction[]>;
  stagedActionIds$: Observable<number[]>;
  skippedActionIds$: Observable<number[]>;
  committedState$: Observable<any>;
  currentStateIndex$: Observable<number>;
  computedStates$: Observable<ComputedState[]>;
  isLocked$: Observable<boolean>;
  isPaused$: Observable<boolean>;

  monacoData$: Observable<NgxEditorModel>;

  constructor(private storeDevtools: StoreDevtools) {

    this.monitorState$ = storeDevtools.liftedState.pipe(mySelect(x => x.monitorState));
    this.nextActionId$ = storeDevtools.liftedState.pipe(mySelect(x => x.nextActionId));
    this.actionsById$ = storeDevtools.liftedState.pipe(
      mySelect(x => x.actionsById)
    );

    this.stagedActionIds$ = storeDevtools.liftedState.pipe(
      mySelect(x => x.stagedActionIds)
    );

    this.skippedActionIds$ = storeDevtools.liftedState.pipe(mySelect(x => x.skippedActionIds));
    this.committedState$ = storeDevtools.liftedState.pipe(mySelect(x => x.committedState));
    this.currentStateIndex$ = storeDevtools.liftedState.pipe(mySelect(x => x.currentStateIndex));
    this.computedStates$ = storeDevtools.liftedState.pipe(mySelect(x => x.computedStates));
    this.isLocked$ = storeDevtools.liftedState.pipe(mySelect(x => x.isLocked));
    this.isPaused$ = storeDevtools.liftedState.pipe(mySelect(x => x.isPaused));

    // creo una lista di azioni unendo gli ids e le entities
    this.actions$ = this.stagedActionIds$.pipe(
      withLatestFrom(this.actionsById$),
      map(([ids, entities]): any => ids.map((id) => ({...entities[id], id})))
    );

    this.monacoData$ = this.actions$.pipe(toNgxEditorModel());
  }

  ngOnInit(): void {
  }

  monitorState(): void {
    this.monacoData$ = this.monitorState$.pipe(toNgxEditorModel());
  }

  nextActionId(): void {
    this.monacoData$ = this.nextActionId$.pipe(toNgxEditorModel());
  }

  actionsById(): void {
    this.monacoData$ = this.actionsById$.pipe(toNgxEditorModel());
  }

  actions(): void {
    this.monacoData$ = this.actions$.pipe(toNgxEditorModel());
  }

  stagedActionIds(): void {
    this.monacoData$ = this.stagedActionIds$.pipe(toNgxEditorModel());
  }

  skippedActionIds(): void {
    this.monacoData$ = this.skippedActionIds$.pipe(toNgxEditorModel());
  }

  committedState(): void {
    this.monacoData$ = this.committedState$.pipe(toNgxEditorModel());
  }

  currentStateIndex(): void {
    this.monacoData$ = this.currentStateIndex$.pipe(toNgxEditorModel());
  }

  computedStates(): void {
    this.monacoData$ = this.computedStates$.pipe(toNgxEditorModel());
  }

  isLocked(): void {
    this.monacoData$ = this.isLocked$.pipe(toNgxEditorModel());
  }

  isPaused(): void {
    this.monacoData$ = this.isPaused$.pipe(toNgxEditorModel());
  }

  onChange(event: any): void {
    this.monacoData$ = this.computedStates$.pipe(
      withLatestFrom(this.stagedActionIds$),
      map(([computedStates, stagedActionIds$]) => {
        const index = stagedActionIds$.indexOf(event.value.id);
        return computedStates[index];
      }),
      toNgxEditorModel()
    );
    setTimeout(() => {
      this.ev.getAction('editor.action.formatDocument').run()
    }, 10);
  }

  onInit(ev: any): void {
    this.ev = ev;
  }
}
