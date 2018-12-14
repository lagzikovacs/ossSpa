import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NavfeltoltesDto} from './navfeltoltesdto';
import {environment} from '../../environments/environment';
import {NavfeltoltesParameter} from './navfeltoltesparameter';
import {NavfeltoltesResult} from './navfeltoltesresult';
import {StringResult} from '../dtos/stringresult';

@Injectable({
  providedIn: 'root'
})
export class NavfeltoltesService {
  private readonly _controller = 'api/navfeltoltes/';

  cim = 'NAV feltöltés ellenőrzése';
  szempont = 0;
  minta = '';
  up = new NavfeltoltesParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: NavfeltoltesDto[] = new Array<NavfeltoltesDto>();
  DtoSelectedIndex = -1;
  DtoEdited = new NavfeltoltesDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(np: NavfeltoltesParameter): Promise<NavfeltoltesResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = np;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NavfeltoltesResult>(url, body, options).toPromise();
  }

  public Adoszamellenorzes(adoszam: string): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'adoszamellenorzes';
    const body = JSON.stringify(adoszam);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public Szamlalekerdezes(szamlaszam: string): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'szamlalekerdezes';
    const body = JSON.stringify(szamlaszam);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
}