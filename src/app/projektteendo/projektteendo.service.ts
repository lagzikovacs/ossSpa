import { Injectable } from '@angular/core';
import {NumberResult} from '../dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjektteendoDto} from './projektteendodto';
import {LogonService} from '../logon/logon.service';
import {ProjektteendoResult} from './projektteendoresult';
import {EmptyResult} from '../dtos/emptyresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class ProjektteendoService {
  private readonly _controller = environment.CoreRef + 'api/projektteendo/';
  cim = 'Jegyzet';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: ProjektteendoDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<ProjektteendoResult> {
    return this._httpClient.post<ProjektteendoResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: ProjektteendoDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<ProjektteendoResult> {
    return this._httpClient.post<ProjektteendoResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(projektkod: number): Promise<ProjektteendoResult> {
    return this._httpClient.post<ProjektteendoResult>(
      this._controller + 'select', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: ProjektteendoDto): Promise<NumberResult> {
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
