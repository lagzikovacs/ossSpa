import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _subjectErrormessage = new Subject<any>();

  set Error(hiba: any) {
    this._subjectErrormessage.next(hiba);
  }

  ErrormessageObservable(): Observable<any> {
    return this._subjectErrormessage.asObservable();
  }
}
