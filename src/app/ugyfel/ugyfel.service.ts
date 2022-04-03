import { Injectable } from '@angular/core';
import {UgyfelParameter} from './ugyfelparameter';
import {environment} from '../../environments/environment';
import {UgyfelDto} from './ugyfeldto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {UgyfelResult} from './ugyfelresult';
import {NumberResult} from '../common/dtos/numberresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {UgyfelZoomParameter} from './ugyfelzoomparameter';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class UgyfelService {
  private readonly _controller = environment.CoreRef + 'api/ugyfel/';
  cim = 'Ügyfél';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: UgyfelDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<UgyfelResult> {
    return this._httpClient.post<UgyfelResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: UgyfelDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<UgyfelResult> {
    return this._httpClient.post<UgyfelResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(up: UgyfelParameter): Promise<UgyfelResult> {
    return this._httpClient.post<UgyfelResult>(
      this._controller + 'select', up, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: UgyfelDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: UgyfelZoomParameter): Promise<EmptyResult> {
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
