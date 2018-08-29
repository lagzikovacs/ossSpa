import { Injectable } from '@angular/core';
import {LogonService} from '../logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FeliratkozasResult} from '../../dtos/feliratkozas/feliratkozasresult';
import {environment} from '../../../environments/environment';
import {FeliratkozasDto} from '../../dtos/feliratkozas/feliratkozasdto';
import {FeliratkozasParameter} from '../../dtos/feliratkozas/feliratkozasparameter';
import {ProjektDto} from "../../dtos/projekt/projektdto";
import {ProjektParameter} from "../../dtos/projekt/projektparameter";

@Injectable({
  providedIn: 'root'
})
export class FeliratkozasService {
  private readonly _controller = 'api/feliratkozas/';

  cim = 'Feliratkozás';
  szempont = 0;
  minta = '';
  fp = new FeliratkozasParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: FeliratkozasDto[] = new Array<FeliratkozasDto>();
  DtoSelectedIndex = -1;

  pp = new ProjektParameter(0, environment.lapmeret);
  ProjektDto: ProjektDto[] = new Array<ProjektDto>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(fp: FeliratkozasParameter): Promise<FeliratkozasResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = fp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FeliratkozasResult>(url, body, options).toPromise();
  }
}
