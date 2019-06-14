import { Injectable } from '@angular/core';
import {EmptyResult} from '../dtos/emptyresult';
import {LogonService} from '../logon/logon.service';
import {CsoportService} from '../csoport/csoport.service';
import {SessionService} from '../session/session.service';
import {ProjektService} from '../projekt/projekt.service';
import {IratService} from '../irat/irat.service';
import {AfakulcsService} from '../primitiv/afakulcs/afakulcs.service';
import {FelhasznaloService} from '../primitiv/felhasznalo/felhasznalo.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private _logonservice: LogonService,
              private _csoportservice: CsoportService,
              private _sessionservice: SessionService,
              private _afakulcsservice: AfakulcsService,
              private _felhasznaloservice: FelhasznaloService,

              private _projektservice: ProjektService,
              private _iratservice: IratService) { }

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

        return this._afakulcsservice.GetGridSettings();
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        this._afakulcsservice.GridSettings = res3.Result;

        return this._afakulcsservice.GetReszletekSettings();
      })
      .then(res4 => {
        if (res4.Error != null) {
          throw res4.Error;
        }

        this._afakulcsservice.ReszletekSettings = res4.Result;

        return this._felhasznaloservice.GetGridSettings();
      })
      .then(res5 => {
        if (res5.Error != null) {
          throw res5.Error;
        }

        this._felhasznaloservice.GridSettings = res5.Result;

        return this._felhasznaloservice.GetReszletekSettings();
      })
      .then(res6 => {
        if (res6.Error != null) {
          throw res6.Error;
        }

        this._felhasznaloservice.ReszletekSettings = res6.Result;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  //
}
