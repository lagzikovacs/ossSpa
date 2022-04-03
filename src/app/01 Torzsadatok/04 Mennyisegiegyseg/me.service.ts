import { Injectable } from '@angular/core';
import {MeDto} from './medto';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NumberResult} from '../../common/dtos/numberresult';
import {MeResult} from './meresult';
import {lastValueFrom} from 'rxjs';
import {MeZoomParam} from './mezoomparam';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private readonly _controller = environment.CoreRef + 'api/mennyisegiegyseg/';
  cim = 'Mennyiségi egység';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: MeDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<MeResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<MeResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: MeDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<MeResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<MeResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<MeResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<MeResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: MeDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: MeZoomParam): Promise<EmptyResult> {
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
