import { Injectable } from '@angular/core';
import {UgyfelterlogDto} from './ugyfelterlogdto';
import {environment} from '../../environments/environment';
import {UgyfelterlogParameter} from './ugyfelterlogparameter';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UgyfelterlogResult} from './ugyfelterlogresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class UgyfelterlogService {
  private readonly _controller = 'api/ugyfelterlog/';

  cim = 'Ügyféltér log';
  szempont = 0;
  minta = '';

  Dto = new Array<UgyfelterlogDto>();
  DtoSelectedIndex = -1;
  OsszesRekord = 0;
  ulp = new UgyfelterlogParameter(0, environment.lapmeret);

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(ulp: UgyfelterlogParameter): Promise<UgyfelterlogResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = ulp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelterlogResult>(url, body, options).toPromise();
  }
}
