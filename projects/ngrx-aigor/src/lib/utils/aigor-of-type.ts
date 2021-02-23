import {ofType as ofTypeorigin} from '@ngrx/effects';
import {ActionCreator, Creator} from '@ngrx/store';
import {MonoTypeOperatorFunction, pipe} from 'rxjs';
import {StackFrame} from '../model/vo/stack-frame';
import {getStackFrame, renderStackFrame} from './aigor-proxy';
import {map, tap} from 'rxjs/operators';
import {createEffect as createEffectA} from '@ngrx/effects';

function ofType(...allowedTypes: Array<string | ActionCreator<string, Creator>>): MonoTypeOperatorFunction<any> {
  console.log('ofType.ofType()');
  let stackframe: StackFrame;
  let stackframeString: string;
  try {
    throw new Error(); // generates an exception
  } catch (ex) {
    console.log('ex.stack', ex.stack);
    stackframe = getStackFrame(ex.stack, 1);
    stackframeString = renderStackFrame(stackframe);
    console.log('stackframe', stackframe);
  }
  return pipe(
    ofTypeorigin(...allowedTypes),
    tap((action: any) => {
      console.log('action.type', action.type);
      action.addOfType = stackframe;
      console.log('action.isProxy', action.isProxy);
      console.log('action.stackframeTunzTunz', action.stackframeTunzTunz);
      console.log('stackframe', stackframe);
      console.log('stackframeString', stackframeString);
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
    console.log('ex.stack', ex.stack);
    stackframe = getStackFrame(ex.stack, 1);
    stackframeString = renderStackFrame(stackframe);
    console.log('stackframe', stackframe);
  }
  const effect = source().pipe(
    tap(action => {
      console.log('action', action)
    }),
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
          console.log('handler.set()');
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

export {ofType, createEffect};
