import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StringResult} from '../../common/dtos/stringresult';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';

@Injectable({
  providedIn: 'root'
})
export class VerzioService {
  private _controller = 'api/verzio/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) {
  }

  public async VerzioEsBuild(): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'verzioesbuild';
    const body = null;

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, body, this._logonservice.httpoptions())
    );
  }
}
