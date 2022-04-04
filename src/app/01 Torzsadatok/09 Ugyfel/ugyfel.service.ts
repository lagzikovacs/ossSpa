import { Injectable } from '@angular/core';
import {UgyfelParam} from './ugyfelparam';
import {environment} from '../../../environments/environment';
import {UgyfelDto} from './ugyfeldto';
import {HttpClient} from '@angular/common/http';
import {UgyfelResult} from './ugyfelresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {UgyfelZoomParam} from './ugyfelzoomparam';
import {lastValueFrom} from "rxjs";
import {ColumnSettings} from "../../common/reszletek/columnsettings";
import {LogonService} from "../../05 Segedeszkozok/05 Bejelentkezes/logon.service";
import {ColumnSettingsResult} from "../../common/reszletek/columnsettingsresult";

@Injectable({
  providedIn: 'root'
})
export class UgyfelService {
  private readonly _controller = environment.CoreRef + 'api/ugyfel/';
  cim = 'Ügyfél';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: UgyfelDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<UgyfelResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<UgyfelResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: UgyfelDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<UgyfelResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<UgyfelResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(up: UgyfelParam): Promise<UgyfelResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<UgyfelResult>(url, up, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: UgyfelDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: UgyfelZoomParam): Promise<EmptyResult> {
    const url = this._controller + 'zoomcheck';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async GetGridSettings(): Promise<ColumnSettingsResult> {
    const url = this._controller + 'getgridsettings';

    return await lastValueFrom(
      this._httpClient.post<ColumnSettingsResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async GetReszletekSettings(): Promise<ColumnSettingsResult> {
    const url = this._controller + 'getreszleteksettings';

    return await lastValueFrom(
      this._httpClient.post<ColumnSettingsResult>(url, '', this._logonservice.httpoptions())
    );
  }
}
