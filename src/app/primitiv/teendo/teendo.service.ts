import { Injectable } from '@angular/core';
import {TeendoDto} from './teendodto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TeendoResult} from './teendoresult';
import {TeendoZoomParameter} from './teendozoomparameter';
import {TeendoEgyMode} from './teendoegymode';
import {TeendoContainerMode} from './teendocontainermode';
import {environment} from '../../../environments/environment';
import {EgyszeruKeresesDto} from '../../dtos/egyszerukeresesdto';
import {ZoomSources} from '../../enums/zoomsources';
import {LogonService} from '../../logon/logon.service';
import {NumberResult} from '../../dtos/numberresult';
import {EmptyResult} from '../../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class TeendoService {
  private readonly _controller = 'api/teendo/';

  cim = 'Teendő';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);

  Dto: TeendoDto[] = new Array<TeendoDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new TeendoDto();

  ContainerMode = TeendoContainerMode.List;
  EgyMode = TeendoEgyMode.Reszletek;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: TeendoDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<TeendoResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<TeendoResult>(url, body, options).toPromise();
  }

  public Delete(dto: TeendoDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<TeendoResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<TeendoResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<TeendoResult> {
    const url = environment.CoreRef + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<TeendoResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: TeendoDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: TeendoZoomParameter): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
