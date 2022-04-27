import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PenztartetelDto} from './penztarteteldto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {PenztartetelResult} from './penztartetelresult';
import {PenztartetelParam} from './penztartetelparam';
import {ColumnSettingsResult} from '../../../common/reszletek/columnsettingsresult';
import {ColumnSettings} from '../../../common/reszletek/columnsettings';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PenztartetelService {
  private readonly _controller = environment.CoreRef + 'api/penztartetel/';
  cim = 'Pénztártételek';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: PenztartetelDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<PenztartetelResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<PenztartetelResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<PenztartetelResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<PenztartetelResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(par: PenztartetelParam): Promise<PenztartetelResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<PenztartetelResult>(url, par, this._logonservice.httpoptions())
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
