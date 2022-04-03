import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelysegDto} from './helysegdto';
import {HelysegResult} from './helysegresult';
import {HelysegZoomParameter} from './helysegzoomparameter';
import {environment} from '../../../environments/environment';
import {LogonService} from '../../logon/logon.service';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class HelysegService {
  private readonly _controller = environment.CoreRef + 'api/helyseg/';
  cim = 'Helység';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: HelysegDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<HelysegResult> {
    return this._httpClient.post<HelysegResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: HelysegDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<HelysegResult> {
    return this._httpClient.post<HelysegResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<HelysegResult> {
    return this._httpClient.post<HelysegResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: HelysegDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: HelysegZoomParameter): Promise<EmptyResult> {
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
