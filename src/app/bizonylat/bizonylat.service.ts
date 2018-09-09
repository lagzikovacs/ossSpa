import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BizonylatComplexResult} from './bizonylatcomplexresult';
import {BizonylatTipus} from './bizonylattipus';
import {BizonylatDto} from './bizonylatdto';
import {BizonylatContainerMode} from './bizonylatcontainermode';
import {BizonylatTipusLeiroResult} from "./bizonylattipusleiroresult";

@Injectable({
  providedIn: 'root'
})
export class BizonylatService {
  private readonly _controller = 'api/bizonylat/';

  bizonylatTipus = BizonylatTipus.Szamla;
  Dto = new Array<BizonylatDto>();

  ContainerMode = BizonylatContainerMode.List;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNewComplex(): Promise<BizonylatComplexResult> {
    const url = environment.BaseHref + this._controller + 'createnewcomplex';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatComplexResult>(url, body, options).toPromise();
  }

  public BizonylatLeiro(bt: BizonylatTipus): Promise<BizonylatTipusLeiroResult> {
    const url = environment.BaseHref + this._controller + 'bizonylatleiro';
    const body = bt;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatTipusLeiroResult>(url, body, options).toPromise();
  }
}
