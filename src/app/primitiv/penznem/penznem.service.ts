import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PenznemDto} from './penznemdto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../../logon/logon.service';
import {PenznemResult} from './penznemresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {PenznemZoomParameter} from './penznemzoomparameter';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class PenznemService {
  private readonly _controller = environment.CoreRef + 'api/penznem/';
  cim = 'Pénznem';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: PenznemDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<PenznemResult> {
    return this._httpClient.post<PenznemResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: PenznemDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<PenznemResult> {
    return this._httpClient.post<PenznemResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<PenznemResult> {
    return this._httpClient.post<PenznemResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: PenznemDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: PenznemZoomParameter): Promise<EmptyResult> {
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
