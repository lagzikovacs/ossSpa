import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _subjectSpinner = new Subject<boolean>();
  private _eppFrissit = false;

  SpinnerObservable(): Observable<boolean> {
    return this._subjectSpinner.asObservable();
  }

  set Run(par: boolean) {
    this._subjectSpinner.next(par);
  }

  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this.Run = value;
  }
}
