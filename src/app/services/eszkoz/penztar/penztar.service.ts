import { Injectable } from '@angular/core';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {environment} from '../../../../environments/environment';
import {PenztarDto} from '../../../dtos/penztar/penztardto';
import {ZoomSources} from '../../../enums/zoomsources';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../../segedeszkosz/logon.service';
import {NumberResult} from '../../../dtos/numberresult';
import {PenztarResult} from '../../../dtos/penztar/penztarresult';
import {EmptyResult} from '../../../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class PenztarService {
  private readonly _controller = 'api/penztar/';

  cim = 'Pénztár';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: PenztarDto[] = new Array<PenztarDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new PenztarDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: PenztarDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<PenztarResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztarResult>(url, body, options).toPromise();
  }

  public Delete(dto: PenztarDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<PenztarResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztarResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<PenztarResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztarResult>(url, JSON.stringify(body), options).toPromise();
  }
  public ReadById(key: number): Promise<PenztarResult> {
    const url = environment.BaseHref + this._controller + 'readbyid';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztarResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: PenztarDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
