import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

@Injectable()
export class AigorStoreEffects {
  constructor(private readonly actions$: Actions) {
  }
}
