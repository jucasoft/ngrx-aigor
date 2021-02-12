import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {Names} from './names';
import {State} from './state';

// const getValueA = (state: State): string => state.valueA;
// const getValueB = (state: State): string => state.valueB;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>(Names.NAME);

// export const selectValueA: MemoizedSelector<object, string> = createSelector(
//   selectState,
//   getValueA
// );
//
// export const selectValueB: MemoizedSelector<object, string> = createSelector(
//   selectState,
//   getValueB
// );
