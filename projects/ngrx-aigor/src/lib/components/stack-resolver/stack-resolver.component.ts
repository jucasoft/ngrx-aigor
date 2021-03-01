import {Component, Input, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {renderStackFrame, StackframeMap} from '../../utils/aigor-proxy';
import {TreeNode} from 'primeng/api';
import {StackFrame} from '../../model/vo/stack-frame';

@Component({
  selector: 'lib-stack-resolver',
  template: `
    <p-tree [value]="treeNode" layout="horizontal" selectionMode="single"></p-tree>
  `,
  styles: []
})
export class StackResolverComponent implements OnInit {


  @Input()
  set stackframeMap(value: StackframeMap) {

    // const gps = new StackTraceGPS();

    if (!value) {
      this.treeNode = [];
      return;
    }

    const root = this.getRoot(value.storeDispatch, value.effectDispatch);
    let children = [];

    if (!!value.effectOfType) {
      children = [...children, ...value.effectOfType.map(item => {
        return this.getChildren('effectOfType', item);
      })];
    }

    if (!!value.reducer) {
      children = [...children, ...value.reducer.map(item => {
        return this.getChildren('reducer', item);
      })];
    }

    root.children = children;

    this.treeNode = [root];

    //
    // let sourceForkJoin = [];
    // if (value.storeDispatch) {
    //   sourceForkJoin.push(from(gps.pinpoint(value.storeDispatch)).pipe(
    //     map(stackFrame => ({label: 'storeDispatch', stackFrame})),
    //     catchError(err => of(null))
    //   ));
    // }
    //
    // if (!!value.effectDispatch) {
    //   sourceForkJoin = [...sourceForkJoin,
    //     from(gps.pinpoint(value.effectDispatch)).pipe(
    //       map(stackFrame => ({label: 'effectDispatch', stackFrame})),
    //       catchError(err => of(null))
    //     )
    //   ];
    // }
    //
    // if (!!value.effectOfType) {
    //   sourceForkJoin = [...sourceForkJoin,
    //     ...value.effectOfType.map(value1 => from(gps.pinpoint(value1)).pipe(
    //       map(stackFrame => ({label: 'effectOfType', stackFrame})),
    //       catchError(err => of(({label: 'effectOfType', stackFrame: null})))
    //       )
    //     )
    //   ];
    // }
    //
    // if (!!value.reducer) {
    //   sourceForkJoin = [...sourceForkJoin,
    //     ...value.reducer.map(value1 => from(gps.pinpoint(value1)).pipe(
    //       map(stackFrame => ({label: 'reducer', stackFrame})),
    //       catchError(err => of(({label: 'reducer', stackFrame: null})))
    //       )
    //     )
    //   ];
    // }
    // return forkJoin(sourceForkJoin).pipe(
    //   tap((valueA) => console.log('sourceForkJoin', valueA)),
    //   map((values: { label: string, stackFrame: StackFrame }[]) => {
    //     if (values.length === 0) {
    //       return values;
    //     }
    //     const rootElement = values.shift();
    //     if (rootElement.label === 'storeDispatch' || rootElement.label === 'effectDispatch') {
    //       return values;
    //     }
    //
    //   }),
    //   catchError(err => of([]))
    // );
    // );

  }

  treeNode: TreeNode[];

  // collection$: Observable<{ label: string, stackFrame: { columnNumber: number, lineNumber: number, fileName: string, functionName: string } }[]>;

  constructor(private clipboard: Clipboard) {
  }

  getRoot(storeDispatch: StackFrame, effectDispatch: StackFrame): TreeNode {
    const data = storeDispatch || effectDispatch;
    const label = storeDispatch ? 'storeDispatch' : 'effectDispatch';

    return {
      label,
      data,
      expanded: true,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder'
    };
  }

  getChildren(label: string, data: StackFrame): TreeNode {
    return {
      label,
      data,
      expanded: true,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder'
    };
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
