import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {StringResult} from '../dtos/stringresult';
import {KapcsolatihaloTaskResult} from './kapcsolatihalotaskresult';

@Injectable({
  providedIn: 'root'
})
export class KapcsolatihaloService {
  private readonly _controller = environment.CoreRef + 'api/kapcsolatihalo/';
  cim = 'Kapcsolati háló';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public TaskStartNew(): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'taskstartnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public TaskCheck(taskToken: string): Promise<KapcsolatihaloTaskResult> {
    return this._httpClient.post<KapcsolatihaloTaskResult>(
      this._controller + 'taskcheck', JSON.stringify(taskToken), this._logonservice.httpoptions())
      .toPromise();
  }
}
