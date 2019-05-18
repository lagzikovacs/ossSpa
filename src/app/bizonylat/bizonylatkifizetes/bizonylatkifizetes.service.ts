import { Injectable } from '@angular/core';
import {LogonService} from '../../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {KifizetesDto} from './kifizetesdto';
import {KifizetesResult} from './kifizetesresult';
import {environment} from '../../../environments/environment';
import {NumberResult} from '../../dtos/numberresult';
import {EmptyResult} from '../../dtos/emptyresult';
import {BizonylatKifizetesContainerMode} from './bizonylatkifizetescontainermode';
import {BizonylatKifizetesSzerkesztesMode} from "./bizonylatkifizetesszerkesztesmode";
import {BizonylatKifizetesEgyMode} from "./bizonylatkifizetesegymode";

@Injectable({
  providedIn: 'root'
})
export class BizonylatkifizetesService {
  private readonly _controller = 'api/kifizetes/';

  cim = 'Kifizetés';

  Dto = new Array<KifizetesDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new KifizetesDto();

  ContainerMode = BizonylatKifizetesContainerMode.Blank;
  EgyMode = BizonylatKifizetesEgyMode.Reszletek;
  SzerkesztesMode = BizonylatKifizetesSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: KifizetesDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<KifizetesResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<KifizetesResult>(url, body, options).toPromise();
  }

  public Delete(dto: KifizetesDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<KifizetesResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<KifizetesResult>(url, body, options).toPromise();
  }

  public Update(dto: KifizetesDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Select(bizonylatkod: number): Promise<KifizetesResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<KifizetesResult>(url, body, options).toPromise();
  }
}
