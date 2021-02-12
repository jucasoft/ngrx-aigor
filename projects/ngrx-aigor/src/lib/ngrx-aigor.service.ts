import {Injectable} from '@angular/core';
import {StoreDevtools} from '@ngrx/store-devtools';

@Injectable({
  providedIn: 'root'
})
export class NgrxAigorService {

  constructor(private storeDevtools: StoreDevtools) {
    debugger
  }
}
