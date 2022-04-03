import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../../logon/logon.service';
import {FizetesimodDto} from './fizetesimoddto';
import {FizetesimodResult} from './fizetesimodresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {FizetesimodZoomParameter} from './fiztesimodzoomparameter';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class FizetesimodService {
  private readonly _controller = environment.CoreRef + 'api/fizetesimod/';
  cim = 'Fizetési mód';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: FizetesimodDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<FizetesimodResult> {
    return this._httpClient.post<FizetesimodResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: FizetesimodDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<FizetesimodResult> {
    return this._httpClient.post<FizetesimodResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<FizetesimodResult> {
    return this._httpClient.post<FizetesimodResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: FizetesimodDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: FizetesimodZoomParameter): Promise<EmptyResult> {
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
