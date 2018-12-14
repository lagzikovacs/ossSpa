import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AjanlatkeresResult} from './ajanlatkeresresult';
import {environment} from '../../environments/environment';
import {AjanlatkeresDto} from './ajanlatkeresdto';
import {AjanlatkeresParameter} from './ajanlatkeresparameter';
import {ProjektDto} from '../projekt/projekt/projektdto';
import {ProjektParameter} from '../projekt/projekt/projektparameter';
import {AjanlatkeresContainerMode} from './ajanlatkerescontainermode';
import {AjanlatkeresEgyMode} from './ajanlatkeresegymode';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class AjanlatkeresService {
  private readonly _controller = 'api/ajanlatkeres/';

  cim = 'Ajánlatkérés';
  szempont = 0;
  minta = '';
  fp = new AjanlatkeresParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: AjanlatkeresDto[] = new Array<AjanlatkeresDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new AjanlatkeresDto();

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto: ProjektDto[] = new Array<ProjektDto>();

  ContainerMode = AjanlatkeresContainerMode.List;
  EgyMode = AjanlatkeresEgyMode.Reszletek;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: AjanlatkeresDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<AjanlatkeresResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AjanlatkeresResult>(url, body, options).toPromise();
  }

  public Delete(dto: AjanlatkeresDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<AjanlatkeresResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AjanlatkeresResult>(url, body, options).toPromise();
  }

  public Select(fp: AjanlatkeresParameter): Promise<AjanlatkeresResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = fp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AjanlatkeresResult>(url, body, options).toPromise();
  }

  public Update(dto: AjanlatkeresDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}