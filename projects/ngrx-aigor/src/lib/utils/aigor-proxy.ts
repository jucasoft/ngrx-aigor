import * as stackTraceParser from 'stacktrace-parser';
import {StackFrame} from '../model/vo/stack-frame';

export class StackframeMap {
  storeDispatch: StackFrame;
  effectOfType: StackFrame[];
  reducer: StackFrame[];
  effectDispatch: StackFrame;
}

export const handler = (stackframeMap) => ({
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
    if (prop === 'addReducer') {
      stackframeMap.reducer.push(value);
    }
    if (prop === 'addEffectOfType') {
      stackframeMap.effectOfType.push(value);
    }
    return true;
  }
});

export const applyHandlerActionDecorator = {
  apply: (target, thisArg, argumentsList) => {
    if (!argumentsList[0].isProxy) {
      try {
        throw new Error('My error');
      } catch (ex) {
        const stackframeMap: StackframeMap = {
          storeDispatch: getStackFrame(ex.stack, 1),
          effectOfType: [],
          effectDispatch: null,
          reducer: []
        };
        argumentsList[0] = new Proxy(argumentsList[0], handler(stackframeMap));
      }
    }
    return target.call(thisArg, ...argumentsList);
  }
};

export const applyHandlerReducer = (stackframe) => ({
  apply: (target, thisArg, argumentsList) => {
    const stackframeSelt = stackframe;
    (argumentsList[1] as any).addReducer = stackframeSelt;
    return target.call(thisArg, ...argumentsList);
  }
});

export const getStackFrame = (stackString: string, index: number): StackFrame => {
  const stacks = stackTraceParser.parse(stackString);
  const stack = stacks[index];
  return {fileName: stack.file, lineNumber: stack.lineNumber, columnNumber: stack.column};
};

export const renderStackFrame = ({fileName, lineNumber, columnNumber}: StackFrame): string => {
  return `${fileName}:${lineNumber}:${columnNumber}`;
};

