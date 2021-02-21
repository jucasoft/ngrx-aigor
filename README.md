# ngrx-entity-crud-prime-ng-boilerplate
This project was generated with [ngrx-entity-crud](https://www.npmjs.com/package/ngrx-entity-crud)

# How to use it?
This project was created to be used with the [ngrx-entity-crud](https://www.npmjs.com/package/ngrx-entity-crud) library, to understand how to use it read this [guide](https://www.npmjs.com/package/ngrx-entity-crud).

# What is it for?
You will be able to create [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) [Angular](https://angular.io/) [NgRx](https://ngrx.io/) applications.

# ngrx-aigor note
ofType interceptor:
```ts
// import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Actions, createEffect, ofType as ofTypeorigin} from '@ngrx/effects';
import {applyHandlerStackTraceOfType} from 'ngrx-aigor';
const ofType = new Proxy(ofTypeorigin, applyHandlerStackTraceOfType);
```

dispatch interceptor:
```ts
  constructor(private readonly store$: Store<RootStoreState.State>) {
    const dispatch = store$.dispatch;
    store$.dispatch = new Proxy(dispatch, applyHandlerActionDecorator);
  }
```

override importer beta:
```ts
import * as effectsO from '@ngrx/effects';
import {applyHandlerStackTraceOfType} from '../utils/aigor-proxy';

const ofType = new Proxy(effectsO.ofType, applyHandlerStackTraceOfType);

const effects: any = {...effectsO, ofType};

export {effects};
```

# Note

compile the library:  
```
npm run build
```

publish library:  
  
go to the "libs/ngrx-entity-crud" folder. 
```
npm login (authentication)
npm publish 
```

## DEVELOP
Package linking:
```
cd <library-compiled>
npm link
```
go to the main folder of the project where to use the library:
```
npm link <library-name>
```

##  in case ...
if the error appears:  

```
... 'No provider for Injector!' ...
```
edit the file angular.json, set the value of "projects/*/architect/build/options":  
"preserveSymlinks": true. 

if you don't see changes to the library under development:  
temporarily remove the library reference from the "package.json" file and rerun "npm link <library-name>". 
