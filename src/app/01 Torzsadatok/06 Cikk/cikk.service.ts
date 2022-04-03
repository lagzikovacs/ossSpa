import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CikkParameter} from './cikkparameter';
import {CikkResult} from './cikkresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {CikkMozgasResult} from './cikkmozgasresult';
import {CikkMozgasParam} from './cikkmozgasparam';
import {lastValueFrom} from 'rxjs';
import {CikkZoomParam} from './cikkzoomparam';
import {CikkDto} from './cikkdto';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';
import {LogonService} from '../../logon/logon.service';

@Injectable({
  providedIn: 'root'
})
export class CikkService {
  private readonly _controller = environment.CoreRef + 'api/cikk/';
  cim = 'Cikk';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();
  BeszerzesKivetGridSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: CikkDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<CikkResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<CikkResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: CikkDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<CikkResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<CikkResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(up: CikkParameter): Promise<CikkResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<CikkResult>(url, up, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: CikkDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Mozgas(par: CikkMozgasParam): Promise<CikkMozgasResult> {
    const url = this._controller + 'mozgas';

    return await lastValueFrom(
      this._httpClient.post<CikkMozgasResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: CikkZoomParam): Promise<EmptyResult> {
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
