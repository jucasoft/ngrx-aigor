import * as stackTraceParser from 'stacktrace-parser';
import {StackFrame} from '../model/vo/stack-frame';

export const applyHandlerActionDecorator = {
  apply: (target, thisArg, argumentsList) => {
    try {
      throw new Error('My error');
    } catch (ex) {
      const stacks = stackTraceParser.parse(ex.stack);
      const stack = stacks[1];
      const stackframe: StackFrame = {fileName: stack.file, lineNumber: stack.lineNumber, columnNumber: stack.column};

      if (!argumentsList[0].isProxy) {
        const handler = {
          get: (targetA, prop, receiver) => {
            if (prop === 'isProxy') {
              return true;
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
//
// export const applyHandlerStackTrace = (title) => ({
//   apply: (target, thisArg, argumentsList) => {
//     // argumentsList[0] = new Proxy(argumentsList[0], getHandler)
//     try {
//       throw new Error(); // generates an exception
//     } catch (ex) {
//       const {type} = argumentsList[0];
//       const callback = (stackframes) => {
//         console.groupCollapsed(title + type);
//         // stackframes.forEach((sf) => {
//         //   // sostituisco il percorso, con il percorso corretto
//         //   sf.setFileName(sf.getFileName().replace('webpack:///', 'webpack:///./'));
//         //   console.log(sf.toString());
//         // });
//         const sf = stackframes[1];
//         sf.setFileName(sf.getFileName().replace('webpack:///', 'webpack:///./'));
//         console.log(sf.toString());
//         console.groupEnd();
//       };
//
//       StackTrace.get().then(callback);
//
//     }
//     return target.call(thisArg, ...argumentsList);
//   }
// });
//
// export const applyHandlerStackTraceParser = (title) => ({
//   apply: (target, thisArg, argumentsList) => {
//     try {
//       throw new Error(); // generates an exception
//     } catch (ex) {
//       const {type} = argumentsList[0];
//       const stack = stackTraceParser.parse(ex.stack);
//       const {methodName, file, lineNumber, column} = stack[1];
//       const log = `${methodName} (${file}:${lineNumber}:${column})`;
//       console.groupCollapsed(title + type);
//       console.log(log);
//       console.log(argumentsList[0]);
//       console.groupEnd();
//
//     }
//     return target.call(thisArg, ...argumentsList);
//   }
// });
//
// export const applyHandlerStackTraceOfType = applyHandlerStackTrace('ofType: ');
// export const applyHandlerStackTraceDispatch = applyHandlerStackTrace('dispatch: ');
// // export const applyHandlerStackTraceOfType = applyHandlerStackTraceParser('ofType: ');
// // export const applyHandlerStackTraceDispatch = applyHandlerStackTraceParser('dispatch: ');
