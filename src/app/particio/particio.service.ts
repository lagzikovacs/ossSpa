import { Injectable } from '@angular/core';
import {NumberResult} from '../dtos/numberresult';
import {environment} from '../../environments/environment';
import {ParticioDto} from './particiodto';
import {LogonService} from '../logon/logon.service';
import {ParticioResult} from './particioresult';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticioService {
  private readonly _controller = environment.CoreRef + 'api/particio/';
  cim = 'Partíció';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Get(): Promise<ParticioResult> {
    return this._httpClient.post<ParticioResult>(
      this._controller + 'get', null, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: ParticioDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }
}
