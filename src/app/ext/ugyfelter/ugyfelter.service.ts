import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {StringResult} from '../../common/dtos/stringresult';
import {environment} from '../../../environments/environment';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {UgyfelterResult} from './ugyfelterresult';
import {EmptyResult} from '../../common/dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class UgyfelterService {
  private readonly _controller = environment.CoreRef + 'api/ugyfelter/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNewLink(dto: UgyfelDto): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'createnewlink', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public GetLink(dto: UgyfelDto): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'getlink', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ClearLink(dto: UgyfelDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'clearlink', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public UgyfelterCheck(linkparam: string): Promise<UgyfelterResult> {
    return this._httpClient.post<UgyfelterResult>(
      this._controller + 'ugyfeltercheck', JSON.stringify(linkparam), this._logonservice.httpoptions())
      .toPromise();
  }
}
