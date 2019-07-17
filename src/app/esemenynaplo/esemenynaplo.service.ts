import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {EsemenynaploResult} from './esemenynaploresult';
import {environment} from '../../environments/environment';
import {EsemenynaploParameter} from './esemenynaploparameter';

@Injectable({
  providedIn: 'root'
})
export class EsemenynaploService {
  private readonly _controller = environment.CoreRef + 'api/esemenynaplo/';
  cim = 'Korábbi tevékenység';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(ep: EsemenynaploParameter): Promise<EsemenynaploResult> {
    return this._httpClient.post<EsemenynaploResult>(
      this._controller + 'select', ep, this._logonservice.httpoptions())
      .toPromise();
  }
}
