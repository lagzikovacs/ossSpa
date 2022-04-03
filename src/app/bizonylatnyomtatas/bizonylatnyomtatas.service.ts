import { Injectable } from '@angular/core';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SzMT} from '../common/dtos/szmt';
import {StringResult} from '../common/dtos/stringresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {RiportResult} from '../04 Riportok/riportresult';

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
