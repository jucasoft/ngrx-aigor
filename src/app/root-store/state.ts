import {CompanyStoreState} from '@root-store/company-store';
import {AddressStoreState} from '@root-store/address-store';
import {UserStoreState} from '@root-store/user-store';
import {SlideMenuStoreState} from '@root-store/slide-menu-store';

export interface State {
company:CompanyStoreState.State;
address:AddressStoreState.State;
user:UserStoreState.State;
  slide_menu: SlideMenuStoreState.State;
}
