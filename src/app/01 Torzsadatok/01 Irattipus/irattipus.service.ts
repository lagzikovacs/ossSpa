import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IrattipusDto} from './irattipusdto';
import {IrattipusResult} from './irattipusresult';
import {ColumnSettings} from '../../common/reszletek/columnsettings';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {NumberResult} from '../../common/dtos/numberresult';
import {lastValueFrom} from 'rxjs';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../../common/reszletek/columnsettingsresult';
import {IrattipusZoomParam} from './irattipuszoomparam';

@Injectable({
  providedIn: 'root'
})
export class IrattipusService {
  private readonly _controller = environment.CoreRef + 'api/irattipus/';
  cim = 'Irattipus';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: IrattipusDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<IrattipusResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<IrattipusResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: IrattipusDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<IrattipusResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<IrattipusResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<IrattipusResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<IrattipusResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: IrattipusDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: IrattipusZoomParam): Promise<EmptyResult> {
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
