import {Component, OnInit} from '@angular/core';
import {MonoTypeOperatorFunction, Observable, pipe} from 'rxjs';
import {ComputedState, LiftedAction, LiftedActions} from '@ngrx/store-devtools/src/reducer';
import {StoreDevtools} from '@ngrx/store-devtools';
import {distinctUntilChanged, map, withLatestFrom} from 'rxjs/operators';

const mySelect = (keySelector: (x: any) => any): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(keySelector),
    distinctUntilChanged((x, y) => x === y)
  );
};

export interface MyLiftedAction extends LiftedAction {
  id: number;
}

@Component({
  selector: 'lib-ngrx-aigor',
  template: `
    <p-listbox [options]="actions$ | async" (onChange)="onChange($event)" optionLabel="id">
      <ng-template let-item pTemplate="item">
        <div>{{item.id}} {{item.action.type}}</div>
      </ng-template>
    </p-listbox>
  `,
  styles: []
})
export class NgrxAigorComponent implements OnInit {

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

  }

  ngOnInit(): void {
  }

  onChange(event: any): void {
    console.log('&event', event);
  }

}
