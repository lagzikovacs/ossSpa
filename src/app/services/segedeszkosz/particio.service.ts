import { Injectable } from '@angular/core';
import {NumberResult} from '../../dtos/numberresult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ParticioDto} from '../../dtos/particio/particiodto';
import {LogonService} from './logon.service';
import {ParticioResult} from '../../dtos/particio/particioresult';

@Injectable({
  providedIn: 'root'
})
export class ParticioService {
  private readonly _controller = 'api/particio/';

  cim = 'Partíció';
  Dto = new ParticioDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Get(): Promise<ParticioResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = null;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ParticioResult>(url, body, options).toPromise();
  }

  public Update(dto: ParticioDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
