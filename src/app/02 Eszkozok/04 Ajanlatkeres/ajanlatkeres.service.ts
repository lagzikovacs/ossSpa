import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {AjanlatkeresResult} from './ajanlatkeresresult';
import {environment} from '../../../environments/environment';
import {AjanlatkeresDto} from './ajanlatkeresdto';
import {AjanlatkeresParam} from './ajanlatkeresparam';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../../common/reszletek/columnsettingsresult';
import {ColumnSettings} from '../../common/reszletek/columnsettings';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AjanlatkeresService {
  private readonly _controller = environment.CoreRef + 'api/ajanlatkeres/';
  cim = 'Ajánlatkérés';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: AjanlatkeresDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<AjanlatkeresResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<AjanlatkeresResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: AjanlatkeresDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<AjanlatkeresResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<AjanlatkeresResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(fp: AjanlatkeresParam): Promise<AjanlatkeresResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<AjanlatkeresResult>(url, fp, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: AjanlatkeresDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZarasNyitas(dto: AjanlatkeresDto): Promise<NumberResult> {
    const url = this._controller + 'zarasnyitas';

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
