import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SzMT} from '../dtos/szmt';
import {StringResult} from '../dtos/stringresult';
import {EmptyResult} from '../dtos/emptyresult';
import {RiportResult} from '../riport/riportresult';

@Injectable({
  providedIn: 'root'
})
export class BizonylatnyomtatasService {
  private readonly _controller = 'api/bizonylatnyomtatas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public TaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'taskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public TaskCancel(taskToken: string): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'taskcancel';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, JSON.stringify(body), options).toPromise();
  }

  public TaskCheck(taskToken: string): Promise<RiportResult> {
    const url = environment.CoreRef + this._controller + 'taskcheck';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<RiportResult>(url, JSON.stringify(body), options).toPromise();
  }
}
