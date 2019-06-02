import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {IratmintaResult} from '../projekt/iratmintaresult';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IratmintaService {
  private readonly _controller = 'api/iratminta/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Szerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'szerzodes';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Szallitasiszerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'szallitasiszerzodes';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Feltetelesszerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'feltetelesszerzodes';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Munkalap(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'munkalap';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Elegedettseg(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'elegedettseg';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public KeszrejelentesNkm(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'keszrejelentesnkm';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public KeszrejelentesElmuEmasz(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'keszrejelenteselmuemasz';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public KeszrejelentesEon(projektkod: number): Promise<IratmintaResult> {
    const url = environment.CoreRef + this._controller + 'keszrejelenteseon';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
}
