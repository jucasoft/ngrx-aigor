/**
 * https://github.com/kiksot/delta-json
 */

import util from 'util';

export class DeltaLabels {
  beforeLabel: string;
  afterLabel: string;
  deletedLabel: string;
  createdLabel: string;
  chagedLabel: string;
}

export class DeltaOptions {
  ignore?: string[];
  labels?: DeltaLabels;
  mode?: 'history';
}

const labels: DeltaLabels = {
  beforeLabel: 'before',
  afterLabel: 'after',
  deletedLabel: 'deleted',
  createdLabel: 'created',
  chagedLabel: 'changed'
};


export class Delta {

  private ignore: any;
  private labels: any;
  private history: any;

  constructor(options: DeltaOptions = {}) {
    this.ignore = options.ignore || [];
    this.labels = options.labels || labels;
    if (options.mode && options.mode.toLowerCase() === 'history') {
      options.ignore.push('history');
    }
    // this.isValid(); //non capisco.
    this.history = {};
  }

  // tslint:disable-next-line:typedef
  getChanges(oldObj, newObj) {
    this.isValid(oldObj, newObj);
    if (this.isValue(oldObj) || this.isValue(newObj)) {
      if (oldObj === newObj) {
        return null; // do not save equal values
      }
      if (typeof oldObj === 'undefined') {
        return {[this.labels.createdLabel]: newObj};
      }
      if (typeof newObj === 'undefined') {
        return {[this.labels.deletedLabel]: oldObj};
      }
      return {[this.labels.beforeLabel]: oldObj, [this.labels.afterLabel]: newObj};
    }

    let diff = null;

    Object.keys(oldObj).forEach(key => {
      if (this.isFunction(oldObj[key]) || this.ignore[key]) {
        return;
      }
      let value2;
      if (typeof newObj[key] !== 'undefined') {
        value2 = newObj[key];
      }
      const diffs = this.getChanges(oldObj[key], value2);
      if (diffs) {
        if (!diff) {
          diff = {};
        }
        diff[key] = diffs;
      }
    });

    Object.keys(newObj).forEach(key => {
      if (this.isFunction(newObj[key]) || this.ignore[key] || typeof oldObj[key] !== 'undefined') {
        return;
      }
      const diffs = this.getChanges(undefined, newObj[key]);
      if (diffs) {
        if (!diff) {
          diff = {};
        }
        diff[key] = diffs;
      }
    });

    return diff;
  }

  // tslint:disable-next-line:typedef
  getDelta(oldObj, newObj) {
    this.isValid(oldObj, newObj);
    if (this.isValue(oldObj) || this.isValue(newObj)) {
      if (oldObj === newObj) {
        return null; // do not save equal values
      }
      if (typeof oldObj === 'undefined') {
        return newObj;
      }
      if (typeof newObj === 'undefined') {
        return null;
      }
      return newObj;
    }

    if (this.isArray(oldObj) || this.isArray(oldObj)) {
      if (this.isArray(oldObj) && this.isArray(oldObj)) {
        return this.isEqualArrays(oldObj, newObj) ? null : newObj; // do not save equal values
      }
      if (typeof oldObj === 'undefined') {
        return newObj;
      }
      if (typeof newObj === 'undefined') {
        return null;
      }
      return newObj;
    }

    let diff = null;

    Object.keys(oldObj).forEach(key => {
      if (this.isFunction(oldObj[key]) || this.ignore[key]) {
        return;
      }
      let value2;
      if (typeof newObj[key] !== 'undefined') {
        value2 = newObj[key];
      }
      const diffs = this.getDelta(oldObj[key], value2);
      if (diffs) {
        if (!diff) {
          diff = {};
        }
        diff[key] = diffs;
      }
    });

    Object.keys(newObj).forEach(key => {
      if (this.isFunction(newObj[key]) || this.ignore[key] || typeof oldObj[key] !== 'undefined') {
        return;
      }
      const diffs = this.getDelta(undefined, newObj[key]);
      if (diffs) {
        if (!diff) {
          diff = {};
        }
        diff[key] = diffs;
      }
    });

    return diff;
  }

  // tslint:disable-next-line:typedef
  createHistory(oldObj, newObj, user = 'anonymous', oldHistory = [], key) {
    let history = Object.assign([], oldHistory);
    this.isValid(oldObj, newObj);
    if (this.isValue(oldObj) || this.isValue(newObj)) {
      if (oldObj === newObj) {
        return history; // do not save equal values
      }
      if (typeof oldObj === 'undefined') {
        return history.concat([
          `${new Date().toISOString()} ${user} ${this.labels.createdLabel} property "${key}" with value "${toRead(
            newObj
          )}"`
        ]);
      }
      if (typeof newObj === 'undefined') {
        return history.concat([`${new Date().toISOString()} ${user} ${this.labels.deletedLabel} property "${key}"`]);
      }
      return history.concat([
        `${new Date().toISOString()} ${user} ${this.labels.chagedLabel} property "${key}" from value "${toRead(
          oldObj
        )}" to "${toRead(newObj)}"`
      ]);
    }

    if (this.isArray(oldObj) || this.isArray(oldObj)) {
      if (this.isArray(oldObj) && this.isArray(oldObj)) {
        if (!this.isEqualArrays(oldObj, newObj)) {
          return history.concat([
            `${new Date().toISOString()} ${user} ${this.labels.chagedLabel} property "${key}" from array "${toRead(
              oldObj
            )}" to "${toRead(newObj)}"`
          ]);
        }
      }
      if (typeof oldObj === 'undefined') {
        return history.concat([
          `${new Date().toISOString()} ${user} ${this.labels.createdLabel} property "${key}" with array "${toRead(
            newObj
          )}"`
        ]);
      }
      if (typeof newObj === 'undefined') {
        return history.concat([`${new Date().toISOString()} ${user} ${this.labels.deletedLabel} property "${key}"`]);
      }
      return history.concat([
        `${new Date().toISOString()}   ${user}   ${this.labels.chagedLabel} from: ${oldObj}  to ${newObj}`
      ]);
    }

    Object.keys(oldObj).forEach(keyA => {
      if (this.isFunction(oldObj[keyA]) || this.ignore[keyA]) {
        return;
      }
      let value2;
      if (typeof newObj[keyA] !== 'undefined') {
        value2 = newObj[keyA];
      }
      // const test = this.createHistory(oldObj[key], value2, history);
      history = this.createHistory(oldObj[keyA], value2, user, history, keyA);
    });

    Object.keys(newObj).forEach(keyB => {
      if (this.isFunction(newObj[keyB]) || this.ignore[keyB] || typeof oldObj[keyB] !== 'undefined') {
        return;
      }
      history = this.createHistory(undefined, newObj[keyB], user, history, keyB);
    });

    return history;
  }

  isFunction(obj): boolean {
    return {}.toString.apply(obj) === '[object Function]';
  }

  isArray(obj): boolean {
    return {}.toString.apply(obj) === '[object Array]';
  }

  isObject(obj): boolean {
    return {}.toString.apply(obj) === '[object Object]';
  }

  isValue(obj): boolean {
    return typeof obj === 'undefined' || (!this.isObject(obj) && !this.isArray(obj));
  }

  isEqualArrays(array1, array2): boolean {
    return array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index]);
  }

  // tslint:disable-next-line:typedef
  isValid(oldObj, newObj) {
    if (this.isFunction(oldObj) || this.isFunction(newObj)) {
      throw new Object({
        code: 500,
        message: 'Diff failed. Invalid argument.'
      });
    }
  }
}

const toRead = value => {
  if ({}.toString.apply(value) === '[object Object]') {
    return util.inspect(value, false, null, true);
  }
  return value;
};
