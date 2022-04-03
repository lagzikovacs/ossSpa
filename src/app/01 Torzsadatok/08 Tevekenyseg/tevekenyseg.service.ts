import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {TevekenysegDto} from './tevekenysegdto';
import {TevekenysegResult} from './tevekenysegresult';
import {lastValueFrom} from 'rxjs';
import {TevekenysegZoomParam} from './tevekenysegzoomparam';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {LogonService} from '../../logon/logon.service';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class TevekenysegService {
  private readonly _controller = environment.CoreRef + 'api/tevekenyseg/';
  cim = 'Tevékenység';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: TevekenysegDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<TevekenysegResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<TevekenysegResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: TevekenysegDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<TevekenysegResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<TevekenysegResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<TevekenysegResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<TevekenysegResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: TevekenysegDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: TevekenysegZoomParam): Promise<EmptyResult> {
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
