import * as stackTraceParser from 'stacktrace-parser';
import {StackFrame} from '../model/vo/stack-frame';

export const applyHandlerActionDecorator = {
  apply: (target, thisArg, argumentsList) => {
    if (!argumentsList[0].isProxy) {
      try {
        throw new Error('My error');
      } catch (ex) {
        const stacks = stackTraceParser.parse(ex.stack);
        const stack = stacks[1];
        const stackframe: StackFrame = {fileName: stack.file, lineNumber: stack.lineNumber, columnNumber: stack.column};
        const handler = {
          get: (targetA, prop, receiver) => {
            if (prop === 'isProxy') {
              return 'true';
            } else if (prop === 'stackframeTunzTunz') {
              return stackframe;
            } else {
              return targetA[prop];
            }
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
      const stacks = stackTraceParser.parse(ex.stack);
      const stack = stacks[1];
      const stackframe: StackFrame = {fileName: stack.file, lineNumber: stack.lineNumber, columnNumber: stack.column};
      console.log('stackframe', stackframe);
    }
    return target.call(thisArg, ...argumentsList);
  }
};

