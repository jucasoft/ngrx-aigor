import {Injectable} from '@angular/core';
import {StoreDevtools} from '@ngrx/store-devtools';
import {distinctUntilChanged, map, withLatestFrom} from 'rxjs/operators';
import {ComputedState, LiftedAction, LiftedActions} from '@ngrx/store-devtools/src/reducer';
import {BehaviorSubject, MonoTypeOperatorFunction, Observable, pipe} from 'rxjs';
import {evalData} from './utils/j-utils';
import {Action, Store} from '@ngrx/store';

const mySelect = (keySelector: (x: any) => any): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(keySelector),
    distinctUntilChanged((x, y) => x === y)
  );
};

const toNgxEditorModel = (): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(value => JSON.stringify(value, null, 2)),
    map(value => ({value, language: 'json', uri: undefined}))
  );
};

const toDiffEditorModel = (): MonoTypeOperatorFunction<any> => {
  return pipe(
    map(([valueA, valueB]) => ([JSON.stringify(valueA, null, 2), JSON.stringify(valueB, null, 2)])),
    map(([codeA, codeB]) => ({originalModel: {code: codeA, language: 'json'}, modifiedModel: {code: codeB, language: 'json'}}))
  );
};

export interface MyLiftedAction extends LiftedAction {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NgrxAigorService {

  public monitorState$: Observable<any>;
  public nextActionId$: Observable<number>;
  public actionsById$: Observable<LiftedActions>;
  public actions$: Observable<MyLiftedAction[]>;
  public stagedActionIds$: Observable<number[]>;
  public skippedActionIds$: Observable<number[]>;
  public committedState$: Observable<any>;
  public currentStateIndex$: Observable<number>;
  public computedStates$: Observable<ComputedState[]>;
  public isLocked$: Observable<boolean>;
  public isPaused$: Observable<boolean>;
  public selectedActionData$: Observable<any>;
  public selectedStateData$: Observable<any>;
  public diffData$: Observable<{ modified: any, original: any }>;
  public actionSelected$ = new BehaviorSubject(-1);


  constructor(private storeDevtools: StoreDevtools, private store$: Store) {

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

    this.selectedActionData$ = this.actionSelected$.pipe(
      withLatestFrom(this.actions$),
      map(([currentStateIndex, computedStates]) => {
        const index = currentStateIndex === -1 ? computedStates.length - 1 : currentStateIndex;
        const action = evalData(() => computedStates[index].action, {});
        return action;
      })
    );

    this.selectedStateData$ = this.actionSelected$.pipe(
      withLatestFrom(this.computedStates$),
      map(([currentStateIndex, computedStates]) => {
        const index = currentStateIndex === -1 ? computedStates.length - 1 : currentStateIndex;
        return evalData(() => computedStates[index].state, {});
      }),
      // toNgxEditorModel(),
    );

    this.diffData$ = this.actionSelected$.pipe(
      withLatestFrom(this.computedStates$),
      map(([currentStateIndex, computedStates]) => {
        const index = currentStateIndex === -1 ? computedStates.length - 1 : currentStateIndex;
        const indexA = index === 0 ? 0 : index - 1;
        const original = evalData(() => computedStates[indexA].state, {});
        const modified = evalData(() => computedStates[index].state, {});
        return {modified, original};
      })
    );
  }

  dispatch(action: Action): void {
    this.storeDevtools.dispatch(action);
  }

  next(action: any): void {
    this.storeDevtools.next(action);
  }

  error(error: any): void {
    this.storeDevtools.error(error);
  }

  complete(): void {
    this.storeDevtools.complete();
  }

  performAction(action: any): void {
    this.storeDevtools.performAction(action);
  }

  refresh(): void {
    this.storeDevtools.refresh();
  }

  reset(): void {
    this.storeDevtools.reset();
  }

  rollback(): void {
    this.storeDevtools.rollback();
  }

  commit(): void {
    this.storeDevtools.commit();
  }

  sweep(): void {
    this.storeDevtools.sweep();
  }

  toggleAction(id: number): void {
    this.storeDevtools.toggleAction(id);
  }

  jumpToAction(actionId: number): void {
    this.storeDevtools.jumpToAction(actionId);
  }

  jumpToState(index: number): void {
    this.storeDevtools.jumpToState(index);
  }

  importState(nextLiftedState: any): void {
    this.storeDevtools.importState(nextLiftedState);
  }

  lockChanges(status: boolean): void {
    this.storeDevtools.lockChanges(status);
  }

  pauseRecording(status: boolean): void {
    this.storeDevtools.pauseRecording(status);
  }

}
