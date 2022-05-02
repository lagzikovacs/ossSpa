import { Injectable } from '@angular/core';
import {NumberResult} from '../../../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ProjektjegyzetDto} from './projektjegyzetdto';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ProjektjegyzetResult} from './projektjegyzetresult';
import {EmptyResult} from '../../../common/dtos/emptyresult';
import {ColumnSettings} from '../../../common/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../../common/reszletek/columnsettingsresult';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjektjegyzetService {
  private readonly _controller = environment.CoreRef + 'api/projektjegyzet/';
  cim = 'Jegyzet';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: ProjektjegyzetDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<ProjektjegyzetResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<ProjektjegyzetResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: ProjektjegyzetDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<ProjektjegyzetResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<ProjektjegyzetResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(projektkod: number): Promise<ProjektjegyzetResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<ProjektjegyzetResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: ProjektjegyzetDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
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
