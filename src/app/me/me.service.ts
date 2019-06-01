import { Injectable } from '@angular/core';
import {MeDto} from './medto';
import {EgyszeruKeresesDto} from '../dtos/egyszerukeresesdto';
import {environment} from '../../environments/environment';
import {ZoomSources} from '../enums/zoomsources';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {NumberResult} from '../dtos/numberresult';
import {MeResult} from './meresult';
import {EmptyResult} from '../dtos/emptyresult';
import {MeZoomParameter} from './mezoomparameter';
import {MeContainerMode} from './mecontainermode';
import {MeEgyMode} from './meegymode';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private readonly _controller = 'api/mennyisegiegyseg/';

  cim = 'Mennyiségi egység';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);

  Dto: MeDto[] = new Array<MeDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new MeDto();

  ContainerMode = MeContainerMode.List;
  EgyMode = MeEgyMode.Reszletek;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: MeDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<MeResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<MeResult>(url, body, options).toPromise();
  }

  public Delete(dto: MeDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<MeResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<MeResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<MeResult> {
    const url = environment.CoreRef + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<MeResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: MeDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: MeZoomParameter): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
