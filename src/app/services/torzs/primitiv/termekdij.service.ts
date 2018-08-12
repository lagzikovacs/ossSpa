import { Injectable } from '@angular/core';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {environment} from '../../../../environments/environment';
import {TermekdijDto} from '../../../dtos/primitiv/termekdij/termekdijdto';
import {ZoomSources} from '../../../enums/zoomsources';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../../segedeszkosz/logon.service';
import {TermekdijResult} from '../../../dtos/primitiv/termekdij/termekdijresult';
import {EmptyResult} from '../../../dtos/emptyresult';
import {NumberResult} from '../../../dtos/numberresult';
import {TermekdijZoomParameter} from "../../../dtos/primitiv/termekdij/termekdijzoomparameter";

@Injectable({
  providedIn: 'root'
})
export class TermekdijService {
  private readonly _controller = 'api/termekdij/';

  cim = 'Termékdíj';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: TermekdijDto[] = new Array<TermekdijDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new TermekdijDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: TermekdijDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<TermekdijResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<TermekdijResult>(url, body, options).toPromise();
  }

  public Delete(dto: TermekdijDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<TermekdijResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<TermekdijResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<TermekdijResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<TermekdijResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: TermekdijDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: TermekdijZoomParameter): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
