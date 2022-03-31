import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {SessionResult} from './sessionresult';
import {environment} from '../../environments/environment';
import {SessionDto} from './sessiondto';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _controller = environment.CoreRef + 'api/session/';

  sessiondto = new SessionDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) {
  }

  public Get(): Promise<SessionResult> {
    return this._httpClient.post<SessionResult>(
      this._controller + 'get', '', this._logonservice.httpoptions())
      .toPromise();
  }
}
