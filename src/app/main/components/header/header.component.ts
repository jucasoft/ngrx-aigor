import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {NgrxAigorComponent} from 'ngrx-aigor';

@Component({
  selector: 'app-header',
  template: `
    <div class="p-grid p-justify-between">
      <div class="p-col">
        <div>
          <app-hamburger-button></app-hamburger-button>
        </div>
      </div>
      <div class="p-col text-align-right">
        <em class="fas fa-2x fa-bug fa-button p-1" style="color: #FFF;" (click)="show()"></em>
        <!--        <em class="fas fa-2x fa-user fa-button p-1" style="color: #FFF;"></em>-->
      </div>
    </div>
  `,
  styles: [`
    .fa-button:hover {
      opacity: 0.5;
      transition: transform 0.2s;
      cursor: pointer;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  constructor(public dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  show(): void {
    const ref = this.dialogService.open(NgrxAigorComponent, {
      header: 'Choose a Car',
      width: '90%',
      height: '90%'
    });
  }

}
