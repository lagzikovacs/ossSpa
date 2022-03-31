import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {LogonService} from '../../logon/logon.service';
import {EmptyResult} from '../../dtos/emptyresult';
import {NumberResult} from '../../dtos/numberresult';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';
import {HttpClient} from '@angular/common/http';
import {TevekenysegDto} from './tevekenysegdto';
import {TevekenysegResult} from './tevekenysegresult';
import {TevekenysegZoomParameter} from './tevekenysegzoomparameter';

@Injectable({
  providedIn: 'root'
})
export class TevekenysegService {
  private readonly _controller = environment.CoreRef + 'api/tevekenyseg/';
  cim = 'Tevékenység';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: TevekenysegDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<TevekenysegResult> {
    return this._httpClient.post<TevekenysegResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: TevekenysegDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<TevekenysegResult> {
    return this._httpClient.post<TevekenysegResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<TevekenysegResult> {
    return this._httpClient.post<TevekenysegResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: TevekenysegDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: TevekenysegZoomParameter): Promise<EmptyResult> {
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
