import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../services/logon.service';
import {CikkDto} from '../dtos/torzs/cikk/cikkdto';
import {ZoomSources} from '../enums/zoomsources';
import {environment} from '../../environments/environment';
import {CikkParameter} from '../dtos/torzs/cikk/cikkparameter';
import {CikkResult} from '../dtos/torzs/cikk/cikkresult';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {CikkMozgasResult} from '../dtos/torzs/cikk/cikkmozgasresult';
import {CikkMozgasParameter} from '../dtos/torzs/cikk/cikkmozgasparameter';
import {CikkMozgasTetelDto} from '../dtos/torzs/cikk/cikkmozgasteteldto';
import {CikkContainerMode} from "./cikkcontainermode";
import {CikkEgyMode} from "./cikkegymode";
import {CikkSzerkesztesMode} from "./cikkszerkesztesmode";

@Injectable({
  providedIn: 'root'
})
export class CikkService {
  private readonly _controller = 'api/cikk/';

  cim = 'Cikk';
  szempont = 0;
  minta = '';
  up = new CikkParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: CikkDto[] = new Array<CikkDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new CikkDto();

  BizonylattipusKod: number;
  MozgasDto: CikkMozgasTetelDto[] = new Array<CikkMozgasTetelDto>();

  ContainerMode = CikkContainerMode.List;
  EgyMode = CikkEgyMode.Reszletek;
  SzerkesztesMode = CikkSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: CikkDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<CikkResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CikkResult>(url, body, options).toPromise();
  }

  public Delete(dto: CikkDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<CikkResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CikkResult>(url, body, options).toPromise();
  }

  public Select(up: CikkParameter): Promise<CikkResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = up;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CikkResult>(url, body, options).toPromise();
  }

  public Update(dto: CikkDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Mozgas(par: CikkMozgasParameter): Promise<CikkMozgasResult> {
    const url = environment.BaseHref + this._controller + 'mozgas';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CikkMozgasResult>(url, body, options).toPromise();
  }
}
