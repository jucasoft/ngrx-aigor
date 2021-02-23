import {createEffect as createEffectA, ofType as ofTypeorigin} from '@ngrx/effects';
import {Action, ActionCreator, createReducer as createReducerA, Creator} from '@ngrx/store';
import {MonoTypeOperatorFunction, pipe} from 'rxjs';
import {StackFrame} from '../model/vo/stack-frame';
import {applyHandlerONSDecorator, getStackFrame, renderStackFrame} from './aigor-proxy';
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
      action.addOfType = stackframe;
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

      const stackframeMap: { dispatch: StackFrame, ofType: StackFrame[] } = {
        dispatch: {...stackframe},
        ofType: []
      };

      const handler = {
        get: (targetA, prop, receiver) => {
          if (prop === 'isProxy') {
            return 'true';
          } else if (prop === 'stackframeMap') {
            return stackframeMap;
          } else {
            return targetA[prop];
          }
        },
        set: (obj, prop, value) => {
          if (prop === 'addOfType') {
            stackframeMap.ofType.push(value);
          }
          return true;
        }
      };
      return new Proxy(value, handler);

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
      reducer: new Proxy(reducer, applyHandlerONSDecorator(stackframe)),
      types
    };
  });
  return createReducerA(initialState, ...onsB as any);
}

export {ofType, createEffect, createReducer};
