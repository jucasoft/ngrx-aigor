import {Component, Input, OnInit} from '@angular/core';
import {StackFrame} from '../../model/vo/stack-frame';
import {forkJoin, from, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as StackTraceGPS from 'stacktrace-gps';
import {Clipboard} from '@angular/cdk/clipboard';
import {renderStackFrame} from '../../utils/aigor-proxy';

@Component({
  selector: 'lib-stack-resolver',
  template: `
    <div *ngLet="(collection$ | async) as collection; let last = last">
      <div *ngFor="let item of collection">
        <button [disabled]="!item.stackFrame" pButton pRipple type="button" icon="fas {{!!item.stackFrame ? 'fa-map-marker-alt' : 'fa-times'}}"
                label="{{item.label}}"
                class="p-button-sm p-button-rounded p-button-text p-mr-1" (click)="onClick(item.stackFrame)"></button>
      </div>
    </div>
  `,
  styles: []
})
export class StackResolverComponent implements OnInit {

  @Input()
  set stackframeMap(stackframeMapValue: { dispatch: StackFrame, ofType: StackFrame[] }) {
    this.collection$ = of(stackframeMapValue).pipe(
      switchMap((value: { dispatch: StackFrame, ofType: StackFrame[] }) => {
        const gps = new StackTraceGPS();

        if (!value) {
          return of([]);
        }

        return forkJoin([
          from(gps.pinpoint(value.dispatch)).pipe(
            map(stackFrame => ({label: 'dispatch', stackFrame})),
            catchError(err => of(null))
          ),
          ...value.ofType.map(value1 => from(gps.pinpoint(value1)).pipe(
            map(stackFrame => ({label: 'ofType', stackFrame})),
            catchError(err => of(({label: 'ofType', stackFrame: null})))
            )
          )
        ]).pipe(
          catchError(err => of([]))
        );

      })
    );

  }

  collection$: Observable<{ label: string, stackFrame: { columnNumber: number, lineNumber: number, fileName: string, functionName: string } }[]>;

  constructor(private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    console.log('StackResolverComponent.ngOnInit()');
  }

  onClick({columnNumber, lineNumber, fileName, functionName}): void {
    const link = renderStackFrame({columnNumber, lineNumber, fileName: fileName.replace('webpack:///', 'webpack:///./')});
    console.log(`generated and copied to the clipboard`, link);
    this.clipboard.copy(link.replace('webpack:///./', ''));
  }
}
