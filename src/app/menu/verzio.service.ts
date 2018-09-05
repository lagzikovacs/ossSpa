import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {StringResult} from '../dtos/stringresult';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerzioService {
  private _controller = 'api/verzio/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) {
  }

  public VerzioEsBuild(): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'verzioesbuild';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
}
