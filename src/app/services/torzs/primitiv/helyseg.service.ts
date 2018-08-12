import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NumberResult} from '../../../dtos/numberresult';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {LogonService} from '../../segedeszkosz/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HelysegDto} from '../../../dtos/primitiv/helyseg/helysegdto';
import {HelysegResult} from '../../../dtos/primitiv/helyseg/helysegresult';
import {EmptyResult} from '../../../dtos/emptyresult';
import {ZoomSources} from '../../../enums/zoomsources';
import {HelysegZoomParameter} from '../../../dtos/primitiv/helyseg/helysegzoomparameter';

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

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: HelysegDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<HelysegResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<HelysegResult>(url, body, options).toPromise();
  }

  public Delete(dto: HelysegDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<HelysegResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<HelysegResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<HelysegResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<HelysegResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: HelysegDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: HelysegZoomParameter): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
