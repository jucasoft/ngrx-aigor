import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AddressStoreActions, AddressStoreSelectors, RootStoreState} from '@root-store/index';
import {Address} from '@models/vo/address';

@Component({
  selector: 'app-button-delete-address',
  template: `
    <button type="button" *ngLet="(itemsSelected$|async) as itemsSelected" pButton icon="pi pi-trash"
            label="Delete ({{itemsSelected.length}})" (click)="onDelete(itemsSelected)"
            [disabled]="!(itemsSelected.length > 0)"
            class="p-button-danger"></button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDeleteAddressComponent implements OnInit {

  itemsSelected$: Observable<Address[]>;

  constructor(private readonly store$: Store<RootStoreState.State>) {
  }

  ngOnInit(): void {
    this.itemsSelected$ = this.store$.pipe(
      select(AddressStoreSelectors.selectItemsSelected)
    );
  }

  onDelete(items: Address[]): void {
    this.store$.dispatch(AddressStoreActions.DeleteManyRequest({items}));
  }

}
