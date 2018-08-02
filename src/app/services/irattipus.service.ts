import { Injectable } from '@angular/core';
import {NumberResult} from '../dtos/numberresult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EgyszeruKeresesDto} from '../dtos/egyszerukeresesdto';
import {LogonService} from './logon.service';
import {EmptyResult} from '../dtos/emptyresult';
import {IrattipusDto} from '../dtos/primitiv/irattipus/irattipusdto';
import {IrattipusResult} from '../dtos/primitiv/irattipus/irattipusresult';
import {ZoomSources} from '../enums/zoomsources';

@Injectable({
  providedIn: 'root'
})
export class IrattipusService {
  private readonly _controller = 'api/irattipus/';

  cim = 'Irattipus';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: IrattipusDto[] = new Array<IrattipusDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new IrattipusDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: IrattipusDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<IrattipusResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IrattipusResult>(url, body, options).toPromise();
  }

  public Delete(dto: IrattipusDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<IrattipusResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IrattipusResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<IrattipusResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IrattipusResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: IrattipusDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
