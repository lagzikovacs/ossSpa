import { Injectable } from '@angular/core';
import {NumberResult} from '../../common/dtos/numberresult';
import {environment} from '../../../environments/environment';
import {ParticioDto} from './particiodto';
import {ParticioResult} from './particioresult';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {LogonService} from '../05 Bejelentkezes/logon.service';

@Injectable({
  providedIn: 'root'
})
export class ParticioService {
  private readonly _controller = environment.CoreRef + 'api/particio/';
  cim = 'Partíció';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Get(): Promise<ParticioResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<ParticioResult>(url, null, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: ParticioDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }
}
