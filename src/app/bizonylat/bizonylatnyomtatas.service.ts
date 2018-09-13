import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SzMT} from '../dtos/szmt';
import {StringResult} from '../dtos/stringresult';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatNyomtatasResult} from './bizonylatnyomtatasresult';

@Injectable({
  providedIn: 'root'
})
export class BizonylatnyomtatasService {
  private readonly _controller = 'api/bizonylatnyomtatas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public BizonylatNyomtatasTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'bizonylatnyomtatastaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public BizonylatNyomtatasTaskCancel(taskToken: string): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'bizonylatnyomtatastaskcancel';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, JSON.stringify(body), options).toPromise();
  }

  public BizonylatNyomtatasTaskCheck(taskToken: string): Promise<BizonylatNyomtatasResult> {
    const url = environment.BaseHref + this._controller + 'bizonylatnyomtatastaskcheck';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatNyomtatasResult>(url, JSON.stringify(body), options).toPromise();
  }
}
