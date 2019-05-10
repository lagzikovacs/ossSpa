import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PenztartetelDto} from './penztarteteldto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../../logon/logon.service';
import {NumberResult} from '../../dtos/numberresult';
import {PenztartetelResult} from './penztartetelresult';
import {PenztartetelParameter} from './penztartetelparameter';
import {PenztartetelContainerMode} from './penztartetelcontainermode';

@Injectable({
  providedIn: 'root'
})
export class PenztartetelService {
  private readonly _controller = 'api/penztartetel/';

  cim = 'Pénztártétel';
  szempont = 0;
  minta = '';
  ptp = new PenztartetelParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: PenztartetelDto[] = new Array<PenztartetelDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new PenztartetelDto();

  ContainerMode = PenztartetelContainerMode.List;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: PenztartetelDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<PenztartetelResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztartetelResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<PenztartetelResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztartetelResult>(url, body, options).toPromise();
  }

  public Select(par: PenztartetelParameter): Promise<PenztartetelResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<PenztartetelResult>(url, body, options).toPromise();
  }
}
