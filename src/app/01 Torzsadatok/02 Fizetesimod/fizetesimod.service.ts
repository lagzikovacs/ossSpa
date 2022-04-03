import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FizetesimodDto} from './fizetesimoddto';
import {FizetesimodResult} from './fizetesimodresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {lastValueFrom} from 'rxjs';
import {FizetesimodZoomParam} from './fiztesimodzoomparam';
import {LogonService} from '../../logon/logon.service';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class FizetesimodService {
  private readonly _controller = environment.CoreRef + 'api/fizetesimod/';
  cim = 'Fizetési mód';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: FizetesimodDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<FizetesimodResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<FizetesimodResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: FizetesimodDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<FizetesimodResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<FizetesimodResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<FizetesimodResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<FizetesimodResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: FizetesimodDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: FizetesimodZoomParam): Promise<EmptyResult> {
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
