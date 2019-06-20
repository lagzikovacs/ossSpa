import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _subjectSpinner = new Subject<boolean>();

  SpinnerObservable(): Observable<boolean> {
    return this._subjectSpinner.asObservable();
  }

  set Run(par: boolean) {
    this._subjectSpinner.next(par);
  }
}
