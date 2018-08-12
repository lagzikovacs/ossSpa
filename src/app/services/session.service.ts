import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from './segedeszkosz/logon.service';
import {SessionResult} from '../dtos/session/sessionresult';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _controller = 'api/session/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) {
  }

  public Get(): Promise<SessionResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SessionResult>(url, body, options).toPromise();
  }
}
