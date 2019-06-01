import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {EsemenynaploResult} from './esemenynaploresult';
import {environment} from '../../environments/environment';
import {EsemenynaploParameter} from './esemenynaploparameter';
import {EsemenynaploDto} from './esemenynaplodto';

@Injectable({
  providedIn: 'root'
})
export class EsemenynaploService {
  private readonly _controller = 'api/esemenynaplo/';

  cim = 'Korábbi tevékenység';

  ep = new EsemenynaploParameter(0, environment.lapmeret);
  OsszesRekord = 0;

  Dto: EsemenynaploDto[] = new Array<EsemenynaploDto>();

  private _felhasznalokod = -1;
  get Felhasznalokod(): number {
    return this._felhasznalokod;
  }
  set Felhasznalokod(value: number) {
    this._felhasznalokod = value;

    this.Dto  = new Array<EsemenynaploDto>();
    this.OsszesRekord = 0;
  }

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(ep: EsemenynaploParameter): Promise<EsemenynaploResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = ep;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EsemenynaploResult>(url, body, options).toPromise();
  }
}
