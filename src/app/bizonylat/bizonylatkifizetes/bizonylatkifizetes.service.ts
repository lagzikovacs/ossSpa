import { Injectable } from '@angular/core';
import {LogonService} from '../../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {KifizetesDto} from './kifizetesdto';
import {KifizetesResult} from './kifizetesresult';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BizonylatkifizetesService {
  private readonly _controller = 'api/kifizetes/';

  Dto = new Array<KifizetesDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new KifizetesDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(bizonylatkod: number): Promise<KifizetesResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<KifizetesResult>(url, body, options).toPromise();
  }
}
