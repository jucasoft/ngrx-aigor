import * as stackTraceParser from 'stacktrace-parser';
import {StackFrame} from '../model/vo/stack-frame';

export const applyHandlerActionDecorator = {
  apply: (target, thisArg, argumentsList) => {
    if (!argumentsList[0].isProxy) {
      try {
        throw new Error('My error');
      } catch (ex) {
        const stackframeMap: { dispatch: StackFrame, ofType: StackFrame[] } = {
          dispatch: getStackFrame(ex.stack, 1),
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
        argumentsList[0] = new Proxy(argumentsList[0], handler);
      }
    }
    return target.call(thisArg, ...argumentsList);
  }
};

export const applyHandlerStackTraceOfType = {
  apply: (target, thisArg, argumentsList) => {
    // argumentsList[0] = new Proxy(argumentsList[0], getHandler)
    try {
      throw new Error(); // generates an exception
    } catch (ex) {
      console.log('ex.stack', ex.stack);
      const stackframe: StackFrame = getStackFrame(ex.stack, 1);
      console.log('stackframe', stackframe);
    }
    return target.call(thisArg, ...argumentsList);
  }
};

export const getStackFrame = (stackString: string, index: number): StackFrame => {
  const stacks = stackTraceParser.parse(stackString);
  const stack = stacks[index];
  return {fileName: stack.file, lineNumber: stack.lineNumber, columnNumber: stack.column};
};

export const renderStackFrame = ({fileName, lineNumber, columnNumber}: StackFrame): string => {
  return `${fileName}:${lineNumber}:${columnNumber}`;
};

