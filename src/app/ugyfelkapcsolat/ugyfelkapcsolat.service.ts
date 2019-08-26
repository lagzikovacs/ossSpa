import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {UgyfelkapcsolatDto} from './ugyfelkapcsolatdto';
import {UgyfelkapcsolatResult} from './ugyfelkapcsolatresult';
import {UgyfelkapcsolatGetParam} from './ugyfelkapcsolatgetparam';
import {UgyfelkapcsolatParam} from './ugyfelkapcsolatparam';

@Injectable({
  providedIn: 'root'
})
export class UgyfelkapcsolatService {
  private readonly _controller = environment.CoreRef + 'api/ugyfelkapcsolat/';
  cim = 'Ügyfélkapcsolat';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: UgyfelkapcsolatDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<UgyfelkapcsolatResult> {
    return this._httpClient.post<UgyfelkapcsolatResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: UgyfelkapcsolatDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(par: UgyfelkapcsolatGetParam): Promise<UgyfelkapcsolatResult> {
    return this._httpClient.post<UgyfelkapcsolatResult>(
      this._controller + 'get', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(up: UgyfelkapcsolatParam): Promise<UgyfelkapcsolatResult> {
    return this._httpClient.post<UgyfelkapcsolatResult>(
      this._controller + 'select', up, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: UgyfelkapcsolatDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
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
