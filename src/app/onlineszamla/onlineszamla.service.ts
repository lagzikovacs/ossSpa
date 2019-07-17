import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OnlineszamlaParameter} from './onlineszamlaparameter';
import {OnlineszamlaResult} from './onlineszamlaresult';
import {StringResult} from '../dtos/stringresult';

@Injectable({
  providedIn: 'root'
})
export class OnlineszamlaService {
  private readonly _controller = environment.CoreRef + 'api/onlineszamla/';
  cim = 'Online számla ellenőrzése';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(np: OnlineszamlaParameter): Promise<OnlineszamlaResult> {
    return this._httpClient.post<OnlineszamlaResult>(
      this._controller + 'select', np, this._logonservice.httpoptions())
      .toPromise();
  }

  public Adoszamellenorzes(adoszam: string): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'adoszamellenorzes', JSON.stringify(adoszam), this._logonservice.httpoptions())
      .toPromise();
  }

  public Szamlalekerdezes(szamlaszam: string): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'szamlalekerdezes', JSON.stringify(szamlaszam), this._logonservice.httpoptions())
      .toPromise();
  }
}
