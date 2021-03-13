import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'lib-json-tree',
  template: `
  <p-tree [value]="_data">
  <ng-template let-node pTemplate="array">
    {{node.label}}: <span class="node-type-array">{{node.expanded ? node.data[0] : node.data}}</span>
  </ng-template>
  <ng-template let-node pTemplate="object">
    {{node.label}}: <span class="node-type-object">{{node.expanded ? node.data[0] : node.data}}</span>
  </ng-template>
  <ng-template let-node pTemplate="boolean">
    {{node.label}}: <span class="node-type-boolean">{{node.data}}</span>
  </ng-template>
  <ng-template let-node pTemplate="number">
    {{node.label}}: <span class="node-type-number">{{node.data}}</span>
  </ng-template>
  <ng-template let-node pTemplate="string">
    {{node.label}}: <span class="node-type-string">"{{node.data}}"</span>
  </ng-template>
  <ng-template let-node pTemplate="default">
    {{node.label}}: <span class="node-type-default">{{node.data}}</span>
  </ng-template>
</p-tree>
  `,
  styleUrls: ['./json-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonTreeComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _data: TreeNode;
  test: any;

  @Input()
  set data(value: any) {
    this.test = {};
    this._data = this.getNodes(value);
    console.log('test', this.test);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  getNodes(object): TreeNode {
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
        const icons = {
          // expandedIcon: 'pi pi-folder-open',
          // collapsedIcon: 'pi pi-folder'
        };

        const type = Array.isArray(value) ? 'array' : (typeof value);

        this.test[type] = [];

        const result = value && typeof value === 'object'
          ? {label: key, data: this.renderDesk(value), key, children: this.getNodes(value), type}
          : {label: key, data: value, key, value, type};
        return {...icons, ...result};
      }
    );
  }

  renderDesk(value: any): string {
    const max = 30;
    const result = JSON.stringify(value).substr(0, max);
    return result + (result.length > max - 2 ? '...' : '');
  }

}
