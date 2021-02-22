import {ofType as ofTypeorigin} from '@ngrx/effects';
import {ActionCreator, Creator} from '@ngrx/store';
import {MonoTypeOperatorFunction, pipe} from 'rxjs';
import {StackFrame} from '../model/vo/stack-frame';
import {getStackFrame, renderStackFrame} from './aigor-proxy';
import {tap} from 'rxjs/operators';

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

export {ofType};
