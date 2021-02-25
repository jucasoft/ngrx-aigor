import {createEffect as createEffectA, ofType as ofTypeorigin} from '@ngrx/effects';
import {Action, ActionCreator, createReducer as createReducerA, Creator} from '@ngrx/store';
import {MonoTypeOperatorFunction, pipe} from 'rxjs';
import {StackFrame} from '../model/vo/stack-frame';
import {applyHandlerReducer, getStackFrame, handler, renderStackFrame, StackframeMap} from './aigor-proxy';
import {map, tap} from 'rxjs/operators';

function ofType(...allowedTypes: Array<string | ActionCreator<string, Creator>>): MonoTypeOperatorFunction<any> {
  let stackframe: StackFrame;
  let stackframeString: string;
  try {
    throw new Error(); // generates an exception
  } catch (ex) {
    stackframe = getStackFrame(ex.stack, 1);
    stackframeString = renderStackFrame(stackframe);
  }
  return pipe(
    ofTypeorigin(...allowedTypes),
    tap((action: any) => {
      action.addEffectOfType = stackframe;
    })
  );
}

function createEffect(
  source,
  config?
): any {
  let stackframe: StackFrame;
  let stackframeString: string;
  try {
    throw new Error(); // generates an exception
  } catch (ex) {
    stackframe = getStackFrame(ex.stack, 1);
    stackframeString = renderStackFrame(stackframe);
  }
  const effect = source().pipe(
    map(value => {
      const stackframeMap: StackframeMap = {
        storeDispatch: null,
        effectOfType: [],
        effectDispatch: {...stackframe},
        reducer: []
      };
      return new Proxy(value, handler(stackframeMap));

    })
  );
  return createEffectA(() => effect, config);
}

function createReducer<S, A extends Action = Action>(
  initialState: S,
  ...ons: any[]
): any {
  let stackframe;
  try {
    throw new Error('My error');
  } catch (ex) {
    stackframe = getStackFrame(ex.stack, 1);
  }
  const onsB = ons.map(({reducer, types}) => {
    return {
      reducer: new Proxy(reducer, applyHandlerReducer(stackframe)),
      types
    };
  });
  return createReducerA(initialState, ...onsB as any);
}

export {ofType, createEffect, createReducer};
