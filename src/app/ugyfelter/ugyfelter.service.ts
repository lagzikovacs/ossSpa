import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {StringResult} from '../dtos/stringresult';
import {environment} from '../../environments/environment';
import {UgyfelDto} from '../ugyfel/ugyfeldto';
import {UgyfelterResult} from "./ugyfelterresult";

@Injectable({
  providedIn: 'root'
})
export class UgyfelterService {
  private readonly _controller = 'api/ugyfelter/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNewLink(dto: UgyfelDto): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'createnewlink';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }
  public GetLink(dto: UgyfelDto): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'getlink';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public UgyfelterCheck(linkparam: string): Promise<UgyfelterResult> {
    const url = environment.CoreRef + this._controller + 'ugyfeltercheck';
    const body = JSON.stringify(linkparam);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<UgyfelterResult>(url, body, options).toPromise();
  }
}
