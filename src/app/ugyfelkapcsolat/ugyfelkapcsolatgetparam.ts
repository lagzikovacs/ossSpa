import {FromTo} from '../enums/fromto';

export class UgyfelkapcsolatGetParam {
  Key: number;
  FromTo: FromTo;

  constructor(Key: number, fromTo: FromTo) {
    this.Key = Key;
    this.FromTo = fromTo;
  }
}
