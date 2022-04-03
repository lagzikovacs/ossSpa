import { Injectable } from '@angular/core';
import {NumberResult} from '../../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AfakulcsDto} from './afakulcsdto';
import {LogonService} from '../../logon/logon.service';
import {AfakulcsResult} from './afakulcsresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {AfakulcsZoomParameter} from './afakulcszoomparameter';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class AfakulcsService {
  private readonly _controller = environment.CoreRef + 'api/afakulcs/';
  cim = 'ÁFA kulcs';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: AfakulcsDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<AfakulcsResult> {
    return this._httpClient.post<AfakulcsResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: AfakulcsDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<AfakulcsResult> {
    return this._httpClient.post<AfakulcsResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<AfakulcsResult> {
    return this._httpClient.post<AfakulcsResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: AfakulcsDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: AfakulcsZoomParameter): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'zoomcheck', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getgridsettings', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getreszleteksettings', '', this._logonservice.httpoptions())
      .toPromise();
  }
}
