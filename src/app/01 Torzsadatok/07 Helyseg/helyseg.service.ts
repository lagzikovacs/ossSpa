import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelysegDto} from './helysegdto';
import {HelysegResult} from './helysegresult';
import {environment} from '../../../environments/environment';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {HelysegZoomParam} from './helysegzoomparam';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {lastValueFrom} from 'rxjs';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class HelysegService {
  private readonly _controller = environment.CoreRef + 'api/helyseg/';
  cim = 'Helység';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: HelysegDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<HelysegResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<HelysegResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: HelysegDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<HelysegResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<HelysegResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<HelysegResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<HelysegResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: HelysegDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: HelysegZoomParam): Promise<EmptyResult> {
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
