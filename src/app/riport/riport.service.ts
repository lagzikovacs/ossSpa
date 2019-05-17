import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RiportResult} from './riportresult';
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
    const url = environment.CoreRef + this._controller + 'taskcheck';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<RiportResult>(url, JSON.stringify(body), options).toPromise();
  }
  public TaskCancel(taskToken: string): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'taskcancel';
    const body = taskToken;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, JSON.stringify(body), options).toPromise();
  }


  public KimenoSzamlaTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'kimenoszamlataskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public BejovoSzamlaTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'bejovoszamlataskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }


  public KovetelesekTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'kovetelesektaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public TartozasokTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'tartozasoktaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }


  public BeszerzesTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'beszerzestaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public KeszletTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'keszlettaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }


  public PenztarTetelTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'penztarteteltaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public ProjektTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'projekttaskstart';
    const body = fi;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
}
