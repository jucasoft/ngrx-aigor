import {NgModule} from '@angular/core';
import {NgrxAigorComponent, NgrxAigorContainerComponent} from './ngrx-aigor.component';
import {NgrxAigorService} from './ngrx-aigor.service';
import {OrderListModule} from 'primeng/orderlist';
import {CommonModule} from '@angular/common';
import {ListboxModule} from 'primeng/listbox';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {SplitterModule} from 'primeng/splitter';
import {NgLetModule} from './utils/ng-let.directive';
import {StateDiffComponent} from './components/state-diff/state-diff.component';
import {CheckboxModule} from 'primeng/checkbox';
import {StateViewComponent} from './components/state-view/state-view.component';
import {TabViewModule} from 'primeng/tabview';
import {ActionViewComponent} from './components/action-view/action-view.component';
import {StackResolverComponent} from './components/stack-resolver/stack-resolver.component';
import {RippleModule} from 'primeng/ripple';
import {TagModule} from 'primeng/tag';
import {TreeModule} from 'primeng/tree';
import {LifecycleViewComponent} from './components/lifecycle-view/lifecycle-view.component';
import {MainComponent} from './components/main/main.component';
import {JsonTreeModule} from './components/json-tree/json-tree.module';
import {JsonDeltaModule} from './components/json-delta/json-delta.module';

@NgModule({
  declarations: [
    NgrxAigorComponent,
    StateDiffComponent,
    StateViewComponent,
    ActionViewComponent,
    StackResolverComponent,
    LifecycleViewComponent,
    MainComponent,
    NgrxAigorContainerComponent
  ],
  imports: [
    OrderListModule,
    CommonModule,
    ListboxModule,
    FormsModule,
    ButtonModule,
    SplitterModule,
    NgLetModule,
    CheckboxModule,
    TabViewModule,
    RippleModule,
    TagModule,
    TreeModule,
    JsonTreeModule,
    JsonDeltaModule,
  ],
  exports: [NgrxAigorComponent],
  providers: [NgrxAigorService]
})
export class NgrxAigorModule {
}
