import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AigorStoreEffects} from './effects';
import {featureReducer} from './reducer';
import {Names} from './names';
import {State} from './state';

export const INJECTION_TOKEN = new InjectionToken<ActionReducer<State>>(`${Names.NAME}-store Reducers`);

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(Names.NAME, INJECTION_TOKEN),
    EffectsModule.forFeature([AigorStoreEffects]),
  ],
  declarations: [],
  providers: [AigorStoreEffects,
    {
      provide: INJECTION_TOKEN,
      useFactory: (): ActionReducer<State> => featureReducer
    }]
})
export class AigorStoreModule {
}
