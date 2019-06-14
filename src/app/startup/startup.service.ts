import { Injectable } from '@angular/core';
import {EmptyResult} from '../dtos/emptyresult';
import {LogonService} from '../logon/logon.service';
import {CsoportService} from '../csoport/csoport.service';
import {SessionService} from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private _logonservice: LogonService,
              private _csoportservice: CsoportService,
              private _sessionservice: SessionService) { }

  public SzerepkorValasztas(particiokod: number, csoportkod: number): Promise<EmptyResult> {
    return this._logonservice.SzerepkorValasztas(particiokod, csoportkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._csoportservice.Jogaim();
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this._logonservice.Jogaim = res1.Result;

        return this._sessionservice.Get();
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this._sessionservice.sessiondto = res2.Result[0];
        this._logonservice.SzerepkorKivalasztva = true;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }
}
