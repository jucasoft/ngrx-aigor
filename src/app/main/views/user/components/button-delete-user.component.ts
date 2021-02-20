import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserStoreActions, UserStoreSelectors, RootStoreState} from '@root-store/index';
import {User} from '@models/vo/user';

@Component({
  selector: 'app-button-delete-user',
  template: `
    <button type="button" *ngLet="(itemsSelected$|async) as itemsSelected" pButton icon="pi pi-trash"
            label="Delete ({{itemsSelected.length}})" (click)="onDelete(itemsSelected)"
            [disabled]="!(itemsSelected.length > 0)"
            class="p-button-danger"></button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDeleteUserComponent implements OnInit {

  itemsSelected$: Observable<User[]>;

  constructor(private readonly store$: Store<RootStoreState.State>) {
  }

  ngOnInit(): void {
    this.itemsSelected$ = this.store$.pipe(
      select(UserStoreSelectors.selectItemsSelected)
    );
  }

  onDelete(items: User[]): void {
    this.store$.dispatch(UserStoreActions.DeleteManyRequest({items}));
  }

}
