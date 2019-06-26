import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HelysegDto} from './helysegdto';
import {HelysegResult} from './helysegresult';
import {HelysegZoomParameter} from './helysegzoomparameter';
import {environment} from '../../../environments/environment';
import {EgyszeruKeresesDto} from '../../dtos/egyszerukeresesdto';
import {ZoomSources} from '../../enums/zoomsources';
import {LogonService} from '../../logon/logon.service';
import {NumberResult} from '../../dtos/numberresult';
import {EmptyResult} from '../../dtos/emptyresult';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class HelysegService {
  private readonly _controller = 'api/helyseg/';

  cim = 'Helység';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: HelysegDto[] = new Array<HelysegDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new HelysegDto();

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: HelysegDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<HelysegResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<HelysegResult>(url, body, options).toPromise();
  }

  public Delete(dto: HelysegDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<HelysegResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<HelysegResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<HelysegResult> {
    const url = environment.CoreRef + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<HelysegResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: HelysegDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: HelysegZoomParameter): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    const url = environment.CoreRef + this._controller + 'getgridsettings';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ColumnSettingsResult>(url, body, options).toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    const url = environment.CoreRef + this._controller + 'getreszleteksettings';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ColumnSettingsResult>(url, body, options).toPromise();
  }
}
