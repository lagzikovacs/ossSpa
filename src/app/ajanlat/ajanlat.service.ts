import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AjanlatParamResult} from './ajanlatparamresult';
import {AjanlatParam} from './ajanlatparam';
import {NumberResult} from '../dtos/numberresult';
import {environment} from '../../environments/environment';
import {AjanlatSzerkesztesMode} from './ajanlatszerkesztesmode';
import {AjanlatContainerMode} from './ajanlatcontainermode';

@Injectable({
  providedIn: 'root'
})
export class AjanlatService {
  private readonly _controller = 'api/ajanlat/';

  AjanlatParam = new AjanlatParam();
  AjanlatErvenyes: any;
  AjanlattetelIndex = 0;

  AjanlatContainerMode = AjanlatContainerMode.List;
  AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNew(): Promise<AjanlatParamResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = null;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AjanlatParamResult>(url, body, options).toPromise();
  }

  public AjanlatKeszites(ap: AjanlatParam): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'ajanlatkeszites';
    const body = ap;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public AjanlatCalc(ap: AjanlatParam): Promise<AjanlatParamResult> {
    const url = environment.CoreRef + this._controller + 'ajanlatcalc';
    const body = ap;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AjanlatParamResult>(url, body, options).toPromise();
  }
}
