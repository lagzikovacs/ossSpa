import { Injectable } from '@angular/core';
import {LogonService} from '../../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProjektKapcsolatResult} from './projektkapcsolatresult';
import {environment} from '../../../environments/environment';
import {ProjektKapcsolatDto} from './projektkapcsolatdto';
import {IratDto} from '../../irat/irat/iratdto';
import {NumberResult} from '../../dtos/numberresult';
import {ProjektKapcsolatParameter} from './projektkapcsolatparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import {BizonylatesIratContainerMode} from './bizonylatesiratcontainermode';
import {BizonylatesiratSzerkesztesMode} from './bizonylatesiratszerkesztesmode';
import {AjanlatParam} from './ajanlatparam';
import {AjanlatParamResult} from './ajanlatparamresult';
import {UjajanlatContainerMode} from './ujajanlatcontainermode';
import {UjajanlatSzerkesztesMode} from './ujajanlatszerkesztesmode';

@Injectable({
  providedIn: 'root'
})
export class ProjektkapcsolatService {
  private readonly _controller = 'api/projektkapcsolat/';

  ProjektKod = -1;
  UgyfelKod = -1;

  cim = 'Bizonylat és irat';
  Dto: ProjektKapcsolatDto[] = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  UjIratDto = new IratDto();

  ContainerMode = BizonylatesIratContainerMode.List;
  SzerkesztesMode = BizonylatesiratSzerkesztesMode.Blank;

  AjanlatContainerMode = UjajanlatContainerMode.List;
  AjanlatParam: AjanlatParam;
  AjanlattetelIndex = 0;
  AjanlatSzerkesztesMode = UjajanlatSzerkesztesMode.Blank;
  AjanlatNetto = 0;
  AjanlatAfa = 0;
  AjanlatBrutto = 0;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Get(projektkapcsolatkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = projektkapcsolatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }

  public Delete(projektkapcsolatkod: number): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = projektkapcsolatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Select(projektkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }
  public SelectByBizonylat(bizonylatkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.BaseHref + this._controller + 'selectbybizonylat';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }
  public SelectByIrat(iratkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.BaseHref + this._controller + 'selectbyirat';
    const body = iratkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }

  public Kereses(): Promise<EmptyResult> {
    this.Dto = new Array<ProjektKapcsolatDto>();
    this.DtoSelectedIndex = -1;

    return this.Select(this.ProjektKod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Dto = res.Result;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public AddIratToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'addirattoprojekt';
    const body = pkp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public UjBizonylatToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'ujbizonylattoprojekt';
    const body = pkp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public AjanlatCreateNew(): Promise<AjanlatParamResult> {
    const url = environment.BaseHref + this._controller + 'ajanlatcreatenew';
    const body = null;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AjanlatParamResult>(url, body, options).toPromise();
  }

  public AjanlatKeszites(ap: AjanlatParam): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'ajanlatkeszites';
    const body = ap;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
