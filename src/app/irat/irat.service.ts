import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {IratParameter} from './iratparameter';
import {environment} from '../../environments/environment';
import {IratDto} from './iratdto';
import {IratResult} from './iratresult';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {IratSzerkesztesMode} from './iratszerkesztesmode';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class IratService {
  private readonly _controller = 'api/irat/';

  cim = 'Irat';
  szempont = 0;
  szempont2 = 0;
  minta = '';
  minta2 = '';
  ip = new IratParameter(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;

  Dto: IratDto[] = new Array<IratDto>();
  DtoEdited = new IratDto();
  DtoSelectedIndex = -1;

  SzerkesztesMode = IratSzerkesztesMode.Blank;

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: IratDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<IratResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Delete(dto: IratDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(iratkod: number): Promise<IratResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = iratkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Select(ip: IratParameter): Promise<IratResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = ip;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Update(dto: IratDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
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
