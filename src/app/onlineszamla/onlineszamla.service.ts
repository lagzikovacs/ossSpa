import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {OnlineszamlaDto} from './onlineszamladto';
import {environment} from '../../environments/environment';
import {OnlineszamlaParameter} from './onlineszamlaparameter';
import {OnlineszamlaResult} from './onlineszamlaresult';
import {StringResult} from '../dtos/stringresult';

@Injectable({
  providedIn: 'root'
})
export class OnlineszamlaService {
  private readonly _controller = 'api/onlineszamla/';

  cim = 'NAV feltöltés ellenőrzése';
  szempont = 0;
  minta = '';
  up = new OnlineszamlaParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: OnlineszamlaDto[] = new Array<OnlineszamlaDto>();
  DtoSelectedIndex = -1;
  DtoEdited = new OnlineszamlaDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(np: OnlineszamlaParameter): Promise<OnlineszamlaResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = np;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<OnlineszamlaResult>(url, body, options).toPromise();
  }

  public Adoszamellenorzes(adoszam: string): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'adoszamellenorzes';
    const body = JSON.stringify(adoszam);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public Szamlalekerdezes(szamlaszam: string): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'szamlalekerdezes';
    const body = JSON.stringify(szamlaszam);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
}
