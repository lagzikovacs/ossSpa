import { Injectable } from '@angular/core';
import {SzamlazasirendDto} from './szamlazasirenddto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {NumberResult} from '../dtos/numberresult';
import {environment} from '../../environments/environment';
import {SzamlazasirendResult} from './szamlazasirendresult';
import {EmptyResult} from '../dtos/emptyresult';
import {SzamlazasirendSzerkesztesMode} from './szamlazasirendszerkesztesmode';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class SzamlazasirendService {
  private readonly _controller = 'api/szamlazasirend/';

  ProjektKod = -1;

  cim = 'Számlázási rend';
  Dto: SzamlazasirendDto[] = new Array<SzamlazasirendDto>();
  DtoEdited = new SzamlazasirendDto();
  DtoSelectedIndex = -1;

  SzerkesztesMode = SzamlazasirendSzerkesztesMode.Blank;

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: SzamlazasirendDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<SzamlazasirendResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SzamlazasirendResult>(url, body, options).toPromise();
  }

  public Delete(dto: SzamlazasirendDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<SzamlazasirendResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SzamlazasirendResult>(url, body, options).toPromise();
  }

  public Select(projektkod: number): Promise<SzamlazasirendResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SzamlazasirendResult>(url, body, options).toPromise();
  }

  public Update(dto: SzamlazasirendDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Kereses(): Promise<EmptyResult> {
    this.Dto = new Array<SzamlazasirendDto>();
    this.DtoSelectedIndex = -1;

    return this.Select(this.ProjektKod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Dto = res.Result;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
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
