import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {SessionResult} from './sessionresult';
import {environment} from '../../environments/environment';
import {SessionDto} from './sessiondto';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _controller = 'api/session/';

  sessiondto = new SessionDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) {
  }

  public Get(): Promise<SessionResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SessionResult>(url, body, options).toPromise();
  }
}
