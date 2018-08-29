import { Injectable } from '@angular/core';
import {LogonService} from './logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RiportResult} from '../dtos/riport/riportresult';
import {environment} from '../../environments/environment';
import {EmptyResult} from '../dtos/emptyresult';
import {StringResult} from '../dtos/stringresult';
import {SzMT} from '../dtos/szmt';

@Injectable({
  providedIn: 'root'
})
export class RiportService {
  private readonly _controller = 'api/riport/';

  cim = 'Riport';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public TaskCheck(taskToken: string): Promise<RiportResult> {
    const url = environment.BaseHref + this._controller + 'taskcheck';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<RiportResult>(url, JSON.stringify(body), options).toPromise();
  }
  public TaskCancel(taskToken: string): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'taskcancel';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, JSON.stringify(body), options).toPromise();
  }


  public KimenoSzamlaLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'kimenoszamlalsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public BejovoSzamlaLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'bejovoszamlalsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }


  public KovetelesekLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'koveteleseklsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public TartozasokLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'tartozasoklsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }


  public BeszerzesLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'beszerzeslsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public KeszletLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'keszletlsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }


  public PenztarTetelLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'penztartetellsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public ProjektLstTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'projektlsttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
}
