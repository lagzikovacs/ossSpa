import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UgynokResult} from './ugynokresult';
import {environment} from '../../environments/environment';
import {UgynokDto} from './ugynokdto';
import {UgynokParameter} from './ugynokparameter';
import {ProjektDto} from '../projekt/projekt/projektdto';
import {ProjektParameter} from '../projekt/projekt/projektparameter';
import {UgynokContainerMode} from './ugynokcontainermode';
import {UgynokEgyMode} from './ugynokegymode';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class UgynokService {
  private readonly _controller = 'api/ugynok/';

  cim = 'Ügynök';
  szempont = 0;
  minta = '';
  fp = new UgynokParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: UgynokDto[] = new Array<UgynokDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new UgynokDto();

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto: ProjektDto[] = new Array<ProjektDto>();

  ContainerMode = UgynokContainerMode.List;
  EgyMode = UgynokEgyMode.Reszletek;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: UgynokDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<UgynokResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgynokResult>(url, body, options).toPromise();
  }

  public Delete(dto: UgynokDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<UgynokResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgynokResult>(url, body, options).toPromise();
  }

  public Select(fp: UgynokParameter): Promise<UgynokResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = fp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgynokResult>(url, body, options).toPromise();
  }

  public Update(dto: UgynokDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
