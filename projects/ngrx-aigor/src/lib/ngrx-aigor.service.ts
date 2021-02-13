import {Injectable} from '@angular/core';
import {StoreDevtools} from '@ngrx/store-devtools';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ComputedState, LiftedActions, LiftedState} from '@ngrx/store-devtools/src/reducer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgrxAigorService {

  monitorState$: Observable<any>;
  nextActionId$: Observable<number>;
  actionsById$: Observable<LiftedActions>;
  stagedActionIds$: Observable<number[]>;
  skippedActionIds$: Observable<number[]>;
  committedState$: Observable<any>;
  currentStateIndex$: Observable<number>;
  computedStates$: Observable<ComputedState[]>;
  isLocked$: Observable<boolean>;
  isPaused$: Observable<boolean>;

  constructor(private storeDevtools: StoreDevtools) {
    this.actionsById$ = storeDevtools.liftedState.pipe(
      map<LiftedState, LiftedActions>(state => state.actionsById),
      distinctUntilChanged((x, y) => x === y)
    );
  }
}
