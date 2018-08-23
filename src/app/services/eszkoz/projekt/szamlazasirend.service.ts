import { Injectable } from '@angular/core';
import {SzamlazasirendDto} from '../../../dtos/projekt/szamlazasirenddto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../../segedeszkosz/logon.service';
import {NumberResult} from '../../../dtos/numberresult';
import {environment} from '../../../../environments/environment';
import {SzamlazasirendResult} from '../../../dtos/projekt/szamlazasirendresult';
import {EmptyResult} from '../../../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class SzamlazasirendService {
  private readonly _controller = 'api/szamlazasirend/';

  cim = 'Számlázási rend';
  Dto: SzamlazasirendDto[] = new Array<SzamlazasirendDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new SzamlazasirendDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: SzamlazasirendDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<SzamlazasirendResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SzamlazasirendResult>(url, body, options).toPromise();
  }

  public Delete(dto: SzamlazasirendDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<SzamlazasirendResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SzamlazasirendResult>(url, body, options).toPromise();
  }

  public Select(projektkod: number): Promise<SzamlazasirendResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<SzamlazasirendResult>(url, body, options).toPromise();
  }

  public Update(dto: SzamlazasirendDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
