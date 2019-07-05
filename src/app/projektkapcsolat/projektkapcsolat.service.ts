import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProjektKapcsolatResult} from './projektkapcsolatresult';
import {environment} from '../../environments/environment';
import {ProjektKapcsolatDto} from './projektkapcsolatdto';
import {IratDto} from '../irat/iratdto';
import {NumberResult} from '../dtos/numberresult';
import {ProjektKapcsolatParameter} from './projektkapcsolatparameter';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatesIratContainerMode} from './bizonylatesiratcontainermode';
import {BizonylatesiratSzerkesztesMode} from './bizonylatesiratszerkesztesmode';

@Injectable({
  providedIn: 'root'
})
export class ProjektkapcsolatService {
  private readonly _controller = 'api/projektkapcsolat/';
  cim = 'Bizonylat és irat';

  ProjektKod = -1;
  UgyfelKod = -1;

  Dto: ProjektKapcsolatDto[] = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  UjIratDto = new IratDto();

  ContainerMode = BizonylatesIratContainerMode.List;
  SzerkesztesMode = BizonylatesiratSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Get(projektkapcsolatkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = projektkapcsolatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }

  public Delete(projektkapcsolatkod: number): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = projektkapcsolatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Select(projektkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }
  public SelectForUgyfelter(projektkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'selectforugyfelter';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }
  public SelectByBizonylat(bizonylatkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'selectbybizonylat';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
  }
  public SelectByIrat(iratkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.CoreRef + this._controller + 'selectbyirat';
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
  public KeresesForUgyfelter(): Promise<EmptyResult> {
    this.Dto = new Array<ProjektKapcsolatDto>();
    this.DtoSelectedIndex = -1;

    return this.SelectForUgyfelter(this.ProjektKod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Dto = res.Result;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public AddBizonylatToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'addbizonylattoprojekt';
    const body = pkp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
  public AddIratToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'addirattoprojekt';
    const body = pkp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public UjBizonylatToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'ujbizonylattoprojekt';
    const body = pkp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
