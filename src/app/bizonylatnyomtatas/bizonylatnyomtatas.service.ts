import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SzMT} from '../dtos/szmt';
import {StringResult} from '../dtos/stringresult';
import {EmptyResult} from '../dtos/emptyresult';
import {RiportResult} from '../riport/riportresult';

@Injectable({
  providedIn: 'root'
})
export class BizonylatnyomtatasService {
  private readonly _controller = environment.CoreRef + 'api/bizonylatnyomtatas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public TaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'taskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }

  public TaskCancel(taskToken: string): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'taskcancel', JSON.stringify(taskToken), this._logonservice.httpoptions())
      .toPromise();
  }

  public TaskCheck(taskToken: string): Promise<RiportResult> {
    return this._httpClient.post<RiportResult>(
      this._controller + 'taskcheck', JSON.stringify(taskToken), this._logonservice.httpoptions())
      .toPromise();
  }
}
