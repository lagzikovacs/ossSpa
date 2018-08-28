import { Injectable } from '@angular/core';
import {LogonService} from '../../segedeszkosz/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {IratParameter} from '../../../dtos/irat/iratparameter';
import {environment} from '../../../../environments/environment';
import {IratDto} from '../../../dtos/irat/iratdto';
import {IratResult} from '../../../dtos/irat/iratresult';
import {NumberResult} from '../../../dtos/numberresult';

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
  elsokereses = true;
  Dto: IratDto[] = new Array<IratDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new IratDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: IratDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<IratResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Get(iratkod: number): Promise<IratResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = iratkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Select(ip: IratParameter): Promise<IratResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = ip;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratResult>(url, body, options).toPromise();
  }

  public Update(dto: IratDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
