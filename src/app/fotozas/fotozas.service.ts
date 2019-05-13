import { Injectable } from '@angular/core';
import {StringResult} from '../dtos/stringresult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IratDto} from '../irat/irat/iratdto';
import {LogonService} from '../logon/logon.service';
import {FotozasResult} from './fotozasresult';

@Injectable({
  providedIn: 'root'
})
export class FotozasService {
  private readonly _controller = 'api/fotozas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNewLink(dto: IratDto): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'createnewlink';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public GetLink(dto: IratDto): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'getlink';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public Check(linkparam: string): Promise<FotozasResult> {
    const url = environment.CoreRef + this._controller + 'check';
    const body = JSON.stringify(linkparam);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FotozasResult>(url, body, options).toPromise();
  }
}
