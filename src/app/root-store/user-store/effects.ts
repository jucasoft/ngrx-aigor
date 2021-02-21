import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as actions from './actions';
import {User} from '@models/vo/user';
import {UserService} from '@services/user.service';
import {
  createCall, createCatchError, createResponse,
  createManyCall, createManyCatchError, createManyResponse,
  deleteCall, deleteCatchError, deleteResponse,
  deleteManyCall, deleteManyCatchError, deleteManyResponse,
  editCall, editCatchError, editResponse,
  editManyCall, editManyCatchError, editManyResponse,
  searchCall, searchCatchError, searchResponse,
  selectCall, selectCatchError, selectResponse
} from 'ngrx-entity-crud';
import {repeat} from 'rxjs/operators';
// import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Actions, createEffect, ofType as ofTypeorigin} from '@ngrx/effects';
import {applyHandlerStackTraceOfType} from 'ngrx-aigor';
const ofType = new Proxy(ofTypeorigin, applyHandlerStackTraceOfType);

@Injectable()
export class UserStoreEffects {
    constructor(private readonly actions$: Actions, private readonly service: UserService) {
    }

  searchRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.SearchRequest),
    searchCall<User>(this.service),
    searchResponse<User>(actions, {dispatchResponse: false}),
    searchCatchError<User>(actions),
    repeat()
  ));

  deleteRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteRequest),
    deleteCall<User>(this.service),
    deleteResponse<User>(actions, User, {dispatchResponse: false}),
    deleteCatchError<User>(actions),
    repeat()
  ));

  deleteManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteManyRequest),
    deleteManyCall<User>(this.service),
    deleteManyResponse<User>(actions, User, {dispatchResponse: false}),
    deleteManyCatchError<User>(actions),
    repeat()
  ));

  createRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateRequest),
    createCall<User>(this.service),
    createResponse<User>(actions, {dispatchResponse: false}),
    createCatchError<User>(actions),
    repeat()
  ));

  createManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateManyRequest),
    createManyCall<User>(this.service),
    createManyResponse<User>(actions, {dispatchResponse: false}),
    createManyCatchError<User>(actions),
    repeat()
  ));

  editRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.EditRequest),
    editCall<User>(this.service),
    editResponse<User>(actions, {dispatchResponse: false}),
    editCatchError<User>(actions),
    repeat()
  ));

  editManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.EditManyRequest),
    editManyCall<User>(this.service),
    editManyResponse<User>(actions, {dispatchResponse: false}),
    editManyCatchError<User>(actions),
    repeat()
  ));

  selectRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.SelectRequest),
    selectCall<User>(this.service),
    selectResponse<User>(actions, {dispatchResponse: false}),
    selectCatchError<User>(actions),
    repeat()
  ));

}
