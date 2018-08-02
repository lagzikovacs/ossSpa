import { Injectable } from '@angular/core';
import {UgyfelParameter} from '../dtos/ugyfel/ugyfelparameter';
import {environment} from '../../environments/environment';
import {UgyfelDto} from '../dtos/ugyfel/ugyfeldto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from './logon.service';
import {UgyfelResult} from '../dtos/ugyfel/ugyfelresult';
import {ZoomSources} from "../enums/zoomsources";

@Injectable({
  providedIn: 'root'
})
export class UgyfelService {
  private readonly _controller = 'api/ugyfel/';

  cim = 'Ügyfél';
  szempont = 0;
  minta = '';
  up = new UgyfelParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: UgyfelDto[] = new Array<UgyfelDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new UgyfelDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNew(): Promise<UgyfelResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelResult>(url, body, options).toPromise();
  }

  public Select(up: UgyfelParameter): Promise<UgyfelResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = up;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelResult>(url, body, options).toPromise();
  }
}
