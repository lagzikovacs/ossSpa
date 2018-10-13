import { Injectable } from '@angular/core';
import {StringResult} from '../dtos/stringresult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NGMParam} from './ngmparam';
import {LogonService} from '../logon/logon.service';

@Injectable({
  providedIn: 'root'
})
export class NgmService {
  private readonly _controller = 'api/ngm/';

  cim = 'Adóhatósági ellenőrzési adatszolgáltatás';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Adataszolgaltatas(np: NGMParam): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'adataszolgaltatas';
    const body = np;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
}
