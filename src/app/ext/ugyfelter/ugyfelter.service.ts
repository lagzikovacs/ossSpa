import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {StringResult} from '../../common/dtos/stringresult';
import {environment} from '../../../environments/environment';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {UgyfelterResult} from './ugyfelterresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UgyfelterService {
  private readonly _controller = environment.CoreRef + 'api/ugyfelter/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async CreateNewLink(dto: UgyfelDto): Promise<StringResult> {
    const url = this._controller + 'createnewlink';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async GetLink(dto: UgyfelDto): Promise<StringResult> {
    const url = this._controller + 'getlink';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ClearLink(dto: UgyfelDto): Promise<EmptyResult> {
    const url = this._controller + 'clearlink';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async UgyfelterCheck(linkparam: string): Promise<UgyfelterResult> {
    const url = this._controller + 'ugyfeltercheck';

    return await lastValueFrom(
      this._httpClient.post<UgyfelterResult>(url, JSON.stringify(linkparam), this._logonservice.httpoptions())
    );
  }
}
