import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {AjanlatkeresResult} from './ajanlatkeresresult';
import {environment} from '../../environments/environment';
import {AjanlatkeresDto} from './ajanlatkeresdto';
import {AjanlatkeresParameter} from './ajanlatkeresparameter';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class AjanlatkeresService {
  private readonly _controller = environment.CoreRef + 'api/ajanlatkeres/';
  cim = 'Ajánlatkérés';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: AjanlatkeresDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<AjanlatkeresResult> {
    return this._httpClient.post<AjanlatkeresResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: AjanlatkeresDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<AjanlatkeresResult> {
    return this._httpClient.post<AjanlatkeresResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(fp: AjanlatkeresParameter): Promise<AjanlatkeresResult> {
    return this._httpClient.post<AjanlatkeresResult>(
      this._controller + 'select', fp, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: AjanlatkeresDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZarasNyitas(dto: AjanlatkeresDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'zarasnyitas', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getgridsettings', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getreszleteksettings', '', this._logonservice.httpoptions())
      .toPromise();
  }
}
