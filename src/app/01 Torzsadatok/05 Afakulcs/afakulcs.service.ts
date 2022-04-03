import { Injectable } from '@angular/core';
import {NumberResult} from '../../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AfakulcsDto} from './afakulcsdto';
import {AfakulcsResult} from './afakulcsresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {lastValueFrom} from 'rxjs';
import {AfakulcsZoomParam} from './afakulcszoomparam';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {LogonService} from '../../logon/logon.service';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class AfakulcsService {
  private readonly _controller = environment.CoreRef + 'api/afakulcs/';
  cim = 'ÁFA kulcs';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: AfakulcsDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<AfakulcsResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<AfakulcsResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: AfakulcsDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<AfakulcsResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<AfakulcsResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<AfakulcsResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<AfakulcsResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: AfakulcsDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: AfakulcsZoomParam): Promise<EmptyResult> {
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
