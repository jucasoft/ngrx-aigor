import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as actions from './actions';
import {Address} from '@models/vo/address';
import {AddressService} from '@services/address.service';
import {createCall, createCatchError, createManyCall, createManyCatchError, createManyResponse, createResponse, deleteCall, deleteCatchError, deleteManyCall, deleteManyCatchError, deleteManyResponse, deleteResponse, editCall, editCatchError, editManyCall, editManyCatchError, editManyResponse, editResponse, searchCall, searchCatchError, searchResponse, selectCall, selectCatchError, selectResponse} from 'ngrx-entity-crud';
import {repeat} from 'rxjs/operators';
import {Actions} from '@ngrx/effects';
import {ofType, createEffect} from 'ngrx-aigor';


@Injectable()
export class AddressStoreEffects {
  constructor(private readonly actions$: Actions, private readonly service: AddressService) {
  }

  searchRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.SearchRequest),
    searchCall<Address>(this.service),
    searchResponse<Address>(actions, {dispatchResponse: false}),
    searchCatchError<Address>(actions),
    repeat()
  ));

  deleteRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteRequest),
    deleteCall<Address>(this.service),
    deleteResponse<Address>(actions, Address, {dispatchResponse: false}),
    deleteCatchError<Address>(actions),
    repeat()
  ));

  deleteManyRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.DeleteManyRequest),
    deleteManyCall<Address>(this.service),
    deleteManyResponse<Address>(actions, Address, {dispatchResponse: false}),
    deleteManyCatchError<Address>(actions),
    repeat()
  ));

  createRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateRequest),
    createCall<Address>(this.service),
    createResponse<Address>(actions, {dispatchResponse: false}),
    createCatchError<Address>(actions),
    repeat()
  ));

  createManyRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.CreateManyRequest),
    createManyCall<Address>(this.service),
    createManyResponse<Address>(actions, {dispatchResponse: false}),
    createManyCatchError<Address>(actions),
    repeat()
  ));

  editRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.EditRequest),
    editCall<Address>(this.service),
    editResponse<Address>(actions, {dispatchResponse: false}),
    editCatchError<Address>(actions),
    repeat()
  ));

  editManyRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.EditManyRequest),
    editManyCall<Address>(this.service),
    editManyResponse<Address>(actions, {dispatchResponse: false}),
    editManyCatchError<Address>(actions),
    repeat()
  ));

  selectRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.SelectRequest),
    selectCall<Address>(this.service),
    selectResponse<Address>(actions, {dispatchResponse: false}),
    selectCatchError<Address>(actions),
    repeat()
  ));

}
