import { Injectable } from '@angular/core';
import {UgyfelParameter} from './ugyfelparameter';
import {environment} from '../../environments/environment';
import {UgyfelDto} from './ugyfeldto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {UgyfelResult} from './ugyfelresult';
import {ZoomSources} from '../enums/zoomsources';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {UgyfelContainerMode} from './ugyfelcontainermode';
import {UgyfelEgyMode} from './ugyfelegymode';
import {UgyfelSzerkesztesMode} from "./ugyfelszerkesztesmode";
import {UgyfelZoomParameter} from "./ugyfelzoomparameter";
import {ProjektDto} from "../projekt/projekt/projektdto";
import {ProjektParameter} from "../projekt/projekt/projektparameter";

@Injectable({
  providedIn: 'root'
})
export class UgyfelService {
  private readonly _controller = 'api/ugyfel/';

  cim = 'Ügyfél';
  szempont = 0;
  minta = '';
  up = new UgyfelParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: UgyfelDto[] = new Array<UgyfelDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new UgyfelDto();

  ContainerMode = UgyfelContainerMode.List;
  EgyMode = UgyfelEgyMode.Reszletek;
  SzerkesztesMode = UgyfelSzerkesztesMode.Blank;

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto: ProjektDto[] = new Array<ProjektDto>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: UgyfelDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<UgyfelResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelResult>(url, body, options).toPromise();
  }

  public Delete(dto: UgyfelDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<UgyfelResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelResult>(url, body, options).toPromise();
  }

  public Select(up: UgyfelParameter): Promise<UgyfelResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = up;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelResult>(url, body, options).toPromise();
  }

  public Update(dto: UgyfelDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public ZoomCheck(par: UgyfelZoomParameter): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'zoomcheck';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
