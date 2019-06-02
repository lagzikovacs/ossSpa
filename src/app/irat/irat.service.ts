import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {IratParameter} from './iratparameter';
import {environment} from '../../environments/environment';
import {IratDto} from './iratdto';
import {IratResult} from './iratresult';
import {NumberResult} from '../dtos/numberresult';
import {IratContainerMode} from './iratcontainermode';
import {IratEgyMode} from './irategymode';
import {EmptyResult} from '../dtos/emptyresult';
import {IratSzerkesztesMode} from './iratszerkesztesmode';

@Injectable({
  providedIn: 'root'
})
export class IratService {
  private readonly _controller = 'api/irat/';

  cim = 'Irat';
  szempont = 0;
  szempont2 = 0;
  minta = '';
  minta2 = '';
  ip = new IratParameter(0, environment.lapmeret);
  OsszesRekord = 0;

  Dto: IratDto[] = new Array<IratDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new IratDto();

  ContainerMode = IratContainerMode.List;
  EgyMode = IratEgyMode.Dokumentum;
  SzerkesztesMode = IratSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: IratDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<IratResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Delete(dto: IratDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(iratkod: number): Promise<IratResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = iratkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Select(ip: IratParameter): Promise<IratResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = ip;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Update(dto: IratDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
