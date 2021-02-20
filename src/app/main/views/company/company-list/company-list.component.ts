import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {CompanyStoreActions, CompanyStoreSelectors, RootStoreState} from '@root-store/index';
import {Observable} from 'rxjs';
import {Company} from '@models/vo/company';
import {RouterStoreActions} from '@root-store/router-store/index';
import {tap} from 'rxjs/operators';
import {ConfirmationService} from 'primeng/api';
import {PopUpData} from '@root-store/router-store/pop-up-base.component';

@Component({
  selector: 'app-company-list',
  templateUrl: `company-list.component.html`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent implements OnInit {


  collection$: Observable<Company[]>;
  cols: any;
  itemsSelected$: Observable<Company[]>;

  constructor(private store$: Store<RootStoreState.State>,
              private confirmationService: ConfirmationService) {
    console.log('CompanyListComponent.constructor()');
  }

  ngOnInit(): void {
    console.log('CompanyListComponent.ngOnInit()');

    this.itemsSelected$ = this.store$.pipe(
      select(CompanyStoreSelectors.selectItemsSelected)
    );

    this.collection$ = this.store$.select(
      CompanyStoreSelectors.selectAll
    ).pipe(
      tap(values => {
        if (values && values.length > 0) {
          this.cols = Object.keys(values[0]);
        }
      })
    );

    this.store$.dispatch(
      CompanyStoreActions.SearchRequest({queryParams: {}})
    );

  }

  onEdit(item): void {
    console.log('CompanyListComponent.onEdit()');

    const data: PopUpData<Company> = {
      item,
      props: {title: 'Edit Company', route: 'company'}
    };

    // apro la popUP
    this.store$.dispatch(RouterStoreActions.RouterGoPopUp({
      path: ['company', {outlets: {popUp: ['edit']}}],
      data
    }));

  }

  onCopy(value): void {
    console.log('CompanyListComponent.onCopy()');

    const item = {...{}, ...value, ...{id: null}};
    const data: PopUpData<Company> = {
      item,
      props: {title: 'Copy Company', route: 'company'}
    };

    this.store$.dispatch(RouterStoreActions.RouterGoPopUp({
      path: ['company', {outlets: {popUp: ['edit']}}],
      data
    }));

  }

  onDelete(item): void {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.store$.dispatch(CompanyStoreActions.DeleteRequest({item}));
      }
    });

  }

  onSelectionChange(items: Company[]): void {
    console.log('CompanyListComponent.onSelectionChange()');
    console.log('items', items);
    this.store$.dispatch(CompanyStoreActions.SelectItems({items}));
  }

}
