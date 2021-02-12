import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {initialState, State} from './state';
import {
  Commit, ImportState,
  JumpToAction,
  JumpToState, LockChanges, PauseRecording,
  PerformAction,
  Refresh,
  Reset,
  Rollback,
  SetActionsActive,
  Sweep,
  ToggleAction
} from './actions';

export const featureReducer: ActionReducer<State, Action> = createReducer(
  initialState,
  on(PerformAction, (state) => state),
  on(Refresh, (state) => state),
  on(Reset, (state) => state),
  on(Rollback, (state) => state),
  on(Commit, (state) => state),
  on(Sweep, (state) => state),
  on(ToggleAction, (state) => state),
  on(SetActionsActive, (state) => state),
  on(JumpToState, (state) => state),
  on(JumpToAction, (state) => state),
  on(ImportState, (state) => state),
  on(LockChanges, (state) => state),
  on(PauseRecording, (state) => state)
);
