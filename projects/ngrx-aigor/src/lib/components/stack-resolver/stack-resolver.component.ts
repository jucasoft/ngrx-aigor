import {Component, Input, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {renderStackFrame, StackframeMap} from '../../utils/aigor-proxy';
import {TreeNode} from 'primeng/api';
import {StackFrame} from '../../model/vo/stack-frame';
import * as StackTraceGPS from 'stacktrace-gps';

@Component({
  selector: 'lib-stack-resolver',
  template: `
    <p-tree [value]="treeNode"
            layout="horizontal"
            emptyMessage="AB..WHO?"
            selectionMode="single"
            (onNodeSelect)="onNodeSelect($event)"></p-tree>
  `,
  styles: []
})
export class StackResolverComponent implements OnInit {


  @Input()
  set stackframeMap(value: StackframeMap) {

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

  }

  treeNode: TreeNode[];

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

  onNodeSelect($event: any): void {
    const gps = new StackTraceGPS();
    gps.pinpoint($event.node.data).then(
      res => {
        const {columnNumber, lineNumber, fileName, functionName} = res;
        const link = renderStackFrame({columnNumber, lineNumber, fileName: fileName.replace('webpack:///', 'webpack:///./')});
        console.log(`generated and copied to the clipboard`, link);
        // this.clipboard.copy(link.replace('webpack:///./', ''));
      },
      err => {
        console.log('err', err);
      }
    );
  }
}
