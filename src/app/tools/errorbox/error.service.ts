import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _subjectErrormessage = new Subject<void>();
  hiba: string;

  set Error(hiba: any) {
    this.hiba = hiba;
    this._subjectErrormessage.next();
  }

  ErrormessageObservable(): Observable<void> {
    return this._subjectErrormessage.asObservable();
  }
}
