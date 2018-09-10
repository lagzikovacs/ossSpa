import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BizonylatComplexResult} from './bizonylatcomplexresult';
import {BizonylatTipus} from './bizonylattipus';
import {BizonylatDto} from './bizonylatdto';
import {BizonylatContainerMode} from './bizonylatcontainermode';
import {BizonylatTipusLeiroResult} from './bizonylattipusleiroresult';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatTipusLeiro} from './bizonylattipusleiro';
import {BizonylatParameter} from "./bizonylatparameter";
import {BizonylatResult} from "./bizonylatresult";

@Injectable({
  providedIn: 'root'
})
export class BizonylatService {
  private readonly _controller = 'api/bizonylat/';

  bizonylatTipus = BizonylatTipus.Szamla;
  bizonylatLeiro = new BizonylatTipusLeiro();
  Dto = new Array<BizonylatDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new BizonylatDto();
  szempont = 0;
  minta = '';
  bp = new BizonylatParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;

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

  public GetBizonylatLeiro(): Promise<EmptyResult> {
    this.bizonylatLeiro = new BizonylatTipusLeiro();

    return this.BizonylatLeiro(this.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatLeiro = res.Result;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public Select(bp: BizonylatParameter): Promise<BizonylatResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = bp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatResult>(url, body, options).toPromise();
  }
}
