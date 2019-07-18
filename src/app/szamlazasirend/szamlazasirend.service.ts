import { Injectable } from '@angular/core';
import {SzamlazasirendDto} from './szamlazasirenddto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {NumberResult} from '../dtos/numberresult';
import {environment} from '../../environments/environment';
import {SzamlazasirendResult} from './szamlazasirendresult';
import {EmptyResult} from '../dtos/emptyresult';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class SzamlazasirendService {
  private readonly _controller = environment.CoreRef + 'api/szamlazasirend/';
  cim = 'Számlázási rend';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: SzamlazasirendDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<SzamlazasirendResult> {
    return this._httpClient.post<SzamlazasirendResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: SzamlazasirendDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<SzamlazasirendResult> {
    return this._httpClient.post<SzamlazasirendResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(projektkod: number): Promise<SzamlazasirendResult> {
    return this._httpClient.post<SzamlazasirendResult>(
      this._controller + 'select', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: SzamlazasirendDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
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
