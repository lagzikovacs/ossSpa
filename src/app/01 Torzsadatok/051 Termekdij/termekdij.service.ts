import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {TermekdijDto} from './termekdijdto';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {TermekdijResult} from './termekdijresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {TermekdijZoomParam} from './termekdijzoomparam';
import {ColumnSettings} from '../../common/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../common/reszletek/columnsettingsresult';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermekdijService {
  private readonly _controller = environment.CoreRef + 'api/termekdij/';
  cim = 'Termékdíj';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: TermekdijDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<TermekdijResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<TermekdijResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: TermekdijDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<TermekdijResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<TermekdijResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<TermekdijResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<TermekdijResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: TermekdijDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: TermekdijZoomParam): Promise<EmptyResult> {
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
