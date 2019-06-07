import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BizonylatKapcsolatResult} from './bizonylatkapcsolatresult';
import {environment} from '../../environments/environment';
import {BizonylatKapcsolatDto} from './bizonylatkapcsolatdto';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatKapcsolatParam} from './bizonylatkapcsolatparam';
import {BizonylatKapcsolatContainerMode} from './bizonylatkapcsolatcontainermode';
import {IratDto} from '../irat/iratdto';
import {BizonylatKapcsolatSzerkesztesMode} from './bizonylatkapcsolatszerkesztesmode';

@Injectable({
  providedIn: 'root'
})
export class BizonylatkapcsolatService {
  private readonly _controller = 'api/bizonylatkapcsolat/';

  cim = 'Irat';
  Dto = new Array<BizonylatKapcsolatDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new BizonylatKapcsolatDto();

  UjIratDto = new IratDto();

  ContainerMode = BizonylatKapcsolatContainerMode.List;
  SzerkesztesMode = BizonylatKapcsolatSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public AddIratToBizonylat(par: BizonylatKapcsolatParam): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'addirattobizonylat';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Delete(dto: BizonylatKapcsolatDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(bizonylatkapcsolatkod: number): Promise<BizonylatKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = bizonylatkapcsolatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatKapcsolatResult>(url, body, options).toPromise();
  }

  public Select(bizonylatkod: number): Promise<BizonylatKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatKapcsolatResult>(url, body, options).toPromise();
  }
}
