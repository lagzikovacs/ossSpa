import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SzMT} from '../../common/dtos/szmt';
import {StringResult} from '../../common/dtos/stringresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {RiportResult} from '../../04 Riportok/riportresult';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BizonylatnyomtatasService {
  private readonly _controller = environment.CoreRef + 'api/bizonylatnyomtatas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async TaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'taskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }

  public async TaskCancel(taskToken: string): Promise<EmptyResult> {
    const url = this._controller + 'taskcancel';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, JSON.stringify(taskToken), this._logonservice.httpoptions())
    );
  }

  public async TaskCheck(taskToken: string): Promise<RiportResult> {
    const url = this._controller + 'taskcheck';

    return await lastValueFrom(
      this._httpClient.post<RiportResult>(url, JSON.stringify(taskToken), this._logonservice.httpoptions())
    );
  }
}
