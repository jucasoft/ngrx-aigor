import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as actions from './actions';
import {Company} from '@models/vo/company';
import {CompanyService} from '@services/company.service';
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
export class CompanyStoreEffects {
    constructor(private readonly actions$: Actions, private readonly service: CompanyService) {
    }

  searchRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.SearchRequest),
    searchCall<Company>(this.service),
    searchResponse<Company>(actions, {dispatchResponse: false}),
    searchCatchError<Company>(actions),
    repeat()
  ));

  deleteRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteRequest),
    deleteCall<Company>(this.service),
    deleteResponse<Company>(actions, Company, {dispatchResponse: false}),
    deleteCatchError<Company>(actions),
    repeat()
  ));

  deleteManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteManyRequest),
    deleteManyCall<Company>(this.service),
    deleteManyResponse<Company>(actions, Company, {dispatchResponse: false}),
    deleteManyCatchError<Company>(actions),
    repeat()
  ));

  createRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateRequest),
    createCall<Company>(this.service),
    createResponse<Company>(actions, {dispatchResponse: false}),
    createCatchError<Company>(actions),
    repeat()
  ));

  createManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateManyRequest),
    createManyCall<Company>(this.service),
    createManyResponse<Company>(actions, {dispatchResponse: false}),
    createManyCatchError<Company>(actions),
    repeat()
  ));

  editRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.EditRequest),
    editCall<Company>(this.service),
    editResponse<Company>(actions, {dispatchResponse: false}),
    editCatchError<Company>(actions),
    repeat()
  ));

  editManyRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.EditManyRequest),
    editManyCall<Company>(this.service),
    editManyResponse<Company>(actions, {dispatchResponse: false}),
    editManyCatchError<Company>(actions),
    repeat()
  ));

  selectRequestEffect$: Observable<Action>  = createEffect(() => this.actions$.pipe(
    ofType(actions.SelectRequest),
    selectCall<Company>(this.service),
    selectResponse<Company>(actions, {dispatchResponse: false}),
    selectCatchError<Company>(actions),
    repeat()
  ));

}
