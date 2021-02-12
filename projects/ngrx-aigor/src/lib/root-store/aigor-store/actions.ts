import {Action, createAction, props} from '@ngrx/store';

export const PERFORM_ACTION = 'PERFORM_ACTION';
export const REFRESH = 'REFRESH';
export const RESET = 'RESET';
export const ROLLBACK = 'ROLLBACK';
export const COMMIT = 'COMMIT';
export const SWEEP = 'SWEEP';
export const TOGGLE_ACTION = 'TOGGLE_ACTION';
export const SET_ACTIONS_ACTIVE = 'SET_ACTIONS_ACTIVE';
export const JUMP_TO_STATE = 'JUMP_TO_STATE';
export const JUMP_TO_ACTION = 'JUMP_TO_ACTION';
export const IMPORT_STATE = 'IMPORT_STATE';
export const LOCK_CHANGES = 'LOCK_CHANGES';
export const PAUSE_RECORDING = 'PAUSE_RECORDING';

export const PerformAction = createAction(PERFORM_ACTION, props<{ action: Action, timestamp: number }>());
export const Refresh = createAction(REFRESH);
export const Reset = createAction(RESET, props<{ imestamp: number }>());
export const Rollback = createAction(ROLLBACK, props<{ imestamp: number }>());
export const Commit = createAction(COMMIT, props<{ imestamp: number }>());
export const Sweep = createAction(SWEEP);
export const ToggleAction = createAction(TOGGLE_ACTION, props<{ id: number }>());
// public active: boolean = true capire come rendere predefinito il valore.
export const SetActionsActive = createAction(SET_ACTIONS_ACTIVE, props<{ start: number, end: number, active: boolean }>());
export const JumpToState = createAction(JUMP_TO_STATE, props<{ index: number }>());
export const JumpToAction = createAction(JUMP_TO_ACTION, props<{ actionId: number }>());
export const ImportState = createAction(IMPORT_STATE, props<{ nextLiftedState: any }>());
export const LockChanges = createAction(LOCK_CHANGES, props<{ status: boolean }>());
export const PauseRecording = createAction(PAUSE_RECORDING, props<{ status: boolean }>());

