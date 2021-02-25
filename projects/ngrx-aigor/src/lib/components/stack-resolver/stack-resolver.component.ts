import {Component, Input, OnInit} from '@angular/core';
import {forkJoin, from, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import * as StackTraceGPS from 'stacktrace-gps';
import {Clipboard} from '@angular/cdk/clipboard';
import {renderStackFrame, StackframeMap} from '../../utils/aigor-proxy';

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
  set stackframeMap(stackframeMapValue: StackframeMap) {
    this.collection$ = of(stackframeMapValue).pipe(
      switchMap((value: StackframeMap) => {
        const gps = new StackTraceGPS();

        if (!value) {
          return of([]);
        }
        debugger

        let sourceForkJoin = [];
        if (value.storeDispatch) {
          sourceForkJoin.push(from(gps.pinpoint(value.storeDispatch)).pipe(
            map(stackFrame => ({label: 'storeDispatch', stackFrame})),
            catchError(err => of(null))
          ));
        }

        if (!!value.effectOfType) {
          sourceForkJoin = [...sourceForkJoin,
            ...value.effectOfType.map(value1 => from(gps.pinpoint(value1)).pipe(
              map(stackFrame => ({label: 'effectOfType', stackFrame})),
              catchError(err => of(({label: 'effectOfType', stackFrame: null})))
              )
            )
          ];
        }

        if (!!value.effectDispatch) {
          sourceForkJoin = [...sourceForkJoin,
            from(gps.pinpoint(value.effectDispatch)).pipe(
              map(stackFrame => ({label: 'effectDispatch', stackFrame})),
              catchError(err => of(null))
            )
          ];
        }

        if (!!value.reducer) {
          sourceForkJoin = [...sourceForkJoin,
            ...value.reducer.map(value1 => from(gps.pinpoint(value1)).pipe(
              map(stackFrame => ({label: 'reducer', stackFrame})),
              catchError(err => of(({label: 'reducer', stackFrame: null})))
              )
            )
          ];
        }

        return forkJoin(sourceForkJoin).pipe(
          tap((valueA) => console.log('sourceForkJoin', valueA)),
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
