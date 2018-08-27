import { Injectable } from '@angular/core';
import {LogonService} from '../../segedeszkosz/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProjektKapcsolatResult} from '../../../dtos/projekt/projektkapcsolatresult';
import {environment} from '../../../../environments/environment';
import {ProjektKapcsolatDto} from '../../../dtos/projekt/projektkapcsolatdto';
import {IratDto} from '../../../dtos/irat/iratdto';
import {NumberResult} from '../../../dtos/numberresult';
import {ProjektKapcsolatParameter} from '../../../dtos/projekt/projektkapcsolatparameter';

@Injectable({
  providedIn: 'root'
})
export class ProjektkapcsolatService {
  private readonly _controller = 'api/projektkapcsolat/';
  cim = 'Bizonylat és irat';
  Dto: ProjektKapcsolatDto[] = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  UjIratDto = new IratDto();

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

  public Select(projektkod: number): Promise<ProjektKapcsolatResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektKapcsolatResult>(url, body, options).toPromise();
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
}
