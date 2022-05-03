import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {KifizetesDto} from './kifizetesdto';
import {KifizetesResult} from './kifizetesresult';
import {environment} from '../../../environments/environment';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../../common/reszletek/columnsettingsresult';
import {ColumnSettings} from '../../common/reszletek/columnsettings';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KifizetesService {
  private readonly _controller = environment.CoreRef + 'api/kifizetes/';
  cim = 'Kifizetés';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: KifizetesDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<KifizetesResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<KifizetesResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: KifizetesDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<KifizetesResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<KifizetesResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: KifizetesDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Select(bizonylatkod: number): Promise<KifizetesResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<KifizetesResult>(url, bizonylatkod, this._logonservice.httpoptions())
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
