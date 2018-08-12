import { Injectable } from '@angular/core';
import {NumberResult} from '../../../dtos/numberresult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {AfakulcsDto} from '../../../dtos/primitiv/afakulcs/afakulcsdto';
import {ZoomSources} from '../../../enums/zoomsources';
import {LogonService} from '../../segedeszkosz/logon.service';
import {AfakulcsResult} from '../../../dtos/primitiv/afakulcs/afakulcsresult';
import {EmptyResult} from '../../../dtos/emptyresult';
import {AfakulcsZoomParameter} from '../../../dtos/primitiv/afakulcs/afakulcszoomparameter';

@Injectable({
  providedIn: 'root'
})
export class AfakulcsService {
  private readonly _controller = 'api/afakulcs/';

  cim = 'ÁFA kulcs';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: AfakulcsDto[] = new Array<AfakulcsDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new AfakulcsDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: AfakulcsDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<AfakulcsResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AfakulcsResult>(url, body, options).toPromise();
  }

  public Delete(dto: AfakulcsDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<AfakulcsResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AfakulcsResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<AfakulcsResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AfakulcsResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: AfakulcsDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: AfakulcsZoomParameter): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
