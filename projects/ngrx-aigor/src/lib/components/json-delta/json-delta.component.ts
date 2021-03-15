import {Component, Input, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Delta, DeltaLabels} from '../../utils/delta';

export class JsonDeltaModel {
  original: any;
  modified: any;
}

@Component({
  selector: 'lib-json-delta',
  template: `
    <p-tree [value]="_data" emptyMessage="equal">
      <ng-template let-node pTemplate="array">
        {{node.label}}: <span class="node-type-array">{{node.expanded ? node.data[0] : node.data}}</span>
      </ng-template>
      <ng-template let-node pTemplate="object">
        {{node.label}}: <span class="node-type-object">{{node.expanded ? node.data[0] : node.data}}</span>
      </ng-template>
      <ng-template let-node pTemplate="edit">
        {{node.label}}: <span class="node-before-label">{{render(node.data[labels.beforeLabel])}}</span> => <span class="node-after-label">{{render(node.data[labels.afterLabel])}}</span>
      </ng-template>
      <ng-template let-node pTemplate="delete">
        {{node.label}}: <span class="node-deleted-label">{{render(node.data[labels.deletedLabel])}}</span>
      </ng-template>
      <ng-template let-node pTemplate="create">
        {{node.label}}: <span class="node-created-label">{{render(node.data[labels.createdLabel])}}</span>
      </ng-template>
      <ng-template let-node pTemplate="changed">
        {{node.label}}: <span class="node-chaged-label">{{render(node.data[labels.chagedLabel])}}</span>
      </ng-template>
    </p-tree>
  `,
  styleUrls: ['./json-delta.component.css']
})
export class JsonDeltaComponent implements OnInit {

  labels: DeltaLabels = {
    beforeLabel: '__before__',
    afterLabel: '__after__',
    deletedLabel: '__deleted__',
    createdLabel: '__created__',
    chagedLabel: '__changed__'
  };

  isDeltaInfo = (obj: any) => {
    const keys = Object.keys(obj).join(',');
    if (keys.includes(this.labels.beforeLabel)) {
      return 'edit';
    }
    if (keys.includes(this.labels.deletedLabel)) {
      return 'delete';
    }
    if (keys.includes(this.labels.createdLabel)) {
      return 'create';
    }
    if (keys.includes(this.labels.chagedLabel)) {
      return 'changed';
    }
    if (Array.isArray(obj)) {
      return 'array';
    }
    return 'object';
  };

  render = (value) => {
    return JSON.stringify(!!value ? value : null);
  }

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  _data: TreeNode;

  @Input()
  set data(value: JsonDeltaModel) {
    // console.log('value', inspect(value, {compact: true, depth: 5, breakLength: 80}));
    const delta = new Delta({labels: this.labels});
    const change = delta.getChanges(value.original, value.modified);
    this._data = this.getNodes(change);
  }

  ngOnInit(): void {
  }

  getNodes(objectA): TreeNode {
    const object = objectA || {};
    const isArray = Array.isArray(object);
    const entries = isArray ? object : Object.entries(object);
    return entries.map((item, i) => {
        let key;
        let value;
        if (isArray) {
          key = i;
          value = item;
        } else {
          const [keyA, valueA] = item;
          key = keyA;
          value = valueA;
        }
        const base = {
          expanded: true
          // expandedIcon: 'pi pi-folder-open',
          // collapsedIcon: 'pi pi-folder'
        };

        // const type = Array.isArray(value) ? 'array' : (typeof value);
        const type = this.isDeltaInfo(value);
        const result = 'array,object'.includes(type)
          ? {label: key, data: this.renderDesc(value), key, children: this.getNodes(value)}
          : {label: key, data: value, key, value, type};
        return {...base, ...result};
      }
    );
  }

  renderDesc(value: any): string {
    const max = 30;
    const result = JSON.stringify(value).substr(0, max);
    return result + (result.length > max - 2 ? '...' : '');
  }

}
