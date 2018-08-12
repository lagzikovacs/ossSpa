import { Injectable } from '@angular/core';
import {LogonService} from '../segedeszkosz/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProjektDto} from '../../dtos/projekt/projektdto';
import {ProjektParameter} from '../../dtos/projekt/projektparameter';
import {environment} from '../../../environments/environment';
import {ProjektResult} from '../../dtos/projekt/projektresult';

@Injectable({
  providedIn: 'root'
})
export class ProjektService {
  private readonly _controller = 'api/projekt/';

  cim = 'Projekt';
  statuszszempont = 0;
  teendoszempont = 0;
  szempont = 0;
  minta = '';
  pp = new ProjektParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto = ProjektDto[0];
  DtoSelected = new ProjektDto();
  uj = false;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNew(): Promise<ProjektResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektResult>(url, body, options).toPromise();
  }

  public Select(pp: ProjektParameter): Promise<ProjektResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = pp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektResult>(url, body, options).toPromise();
  }
}
