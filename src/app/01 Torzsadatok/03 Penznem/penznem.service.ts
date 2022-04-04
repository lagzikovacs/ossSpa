import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {PenznemDto} from './penznemdto';
import {HttpClient} from '@angular/common/http';
import {PenznemResult} from './penznemresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {PenznemZoomParam} from './penznemzoomparam';
import {ColumnSettings} from '../../common/reszletek/columnsettings';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {lastValueFrom} from 'rxjs';
import {ColumnSettingsResult} from "../../common/reszletek/columnsettingsresult";

@Injectable({
  providedIn: 'root'
})
export class PenznemService {
  private readonly _controller = environment.CoreRef + 'api/penznem/';
  cim = 'Pénznem';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: PenznemDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<PenznemResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<PenznemResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: PenznemDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<PenznemResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<PenznemResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<PenznemResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<PenznemResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: PenznemDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: PenznemZoomParam): Promise<EmptyResult> {
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
