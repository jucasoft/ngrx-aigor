import {Component, Input, OnInit} from '@angular/core';
import {StackFrame} from '../../model/vo/stack-frame';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as StackTraceGPS from 'stacktrace-gps';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'lib-stack-resolver',
  template: `
    <div *ngLet="(stackFrame$ | async) as stackFrame">
      <button pButton pRipple type="button" icon="fas fa-code" label="where did the action start?" class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="onClick(stackFrame)"></button>
    </div>
  `,
  styles: []
})
export class StackResolverComponent implements OnInit {

  @Input()
  set stack(stackFrame: StackFrame) {
    this.stackFrame$ = of(stackFrame).pipe(
      switchMap(value => {
        const gps = new StackTraceGPS();
        return gps.pinpoint(value);
      }),
      map(({columnNumber, lineNumber, fileName, functionName}) => {
        return {columnNumber, lineNumber, fileName, functionName};
      })
    );
  }

  stackFrame$: Observable<{ columnNumber, lineNumber, fileName, functionName }>;

  constructor(private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    console.log('StackResolverComponent.ngOnInit()');
  }

  onClick({columnNumber, lineNumber, fileName, functionName}): void {
    const file = fileName.replace('webpack:///', 'webpack:///./');
    const link = `${file}:${lineNumber}:${columnNumber}`;
    console.log(`generated and copied to the clipboard`, link);
    this.clipboard.copy(link.replace('webpack:///./', ''));
  }
}
