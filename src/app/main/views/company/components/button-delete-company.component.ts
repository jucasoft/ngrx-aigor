import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CompanyStoreActions, CompanyStoreSelectors, RootStoreState} from '@root-store/index';
import {Company} from '@models/vo/company';

@Component({
  selector: 'app-button-delete-company',
  template: `
    <button type="button" *ngLet="(itemsSelected$|async) as itemsSelected" pButton icon="pi pi-trash"
            label="Delete ({{itemsSelected.length}})" (click)="onDelete(itemsSelected)"
            [disabled]="!(itemsSelected.length > 0)"
            class="p-button-danger"></button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDeleteCompanyComponent implements OnInit {

  itemsSelected$: Observable<Company[]>;

  constructor(private readonly store$: Store<RootStoreState.State>) {
  }

  ngOnInit(): void {
    this.itemsSelected$ = this.store$.pipe(
      select(CompanyStoreSelectors.selectItemsSelected)
    );
  }

  onDelete(items: Company[]): void {
    this.store$.dispatch(CompanyStoreActions.DeleteManyRequest({items}));
  }

}
