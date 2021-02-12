export interface State {
  monitorState: any;
  nextActionId: number;
  stagedActionIds: number[];
  skippedActionIds: number[];
  currentStateIndex: number;
  isLocked: boolean;
  isPaused: boolean;
  actionsById: { [key: string]: any };
  computedStates: any[];
}

export const initialState: State = {
  monitorState: null,
  nextActionId: 2,
  stagedActionIds: [],
  skippedActionIds: [],
  currentStateIndex: 1,
  isLocked: false,
  isPaused: false,
  actionsById: {},
  computedStates: []
};
