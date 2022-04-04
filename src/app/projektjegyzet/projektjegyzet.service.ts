import { Injectable } from '@angular/core';
import {NumberResult} from '../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjektjegyzetDto} from './projektjegyzetdto';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ProjektjegyzetResult} from './projektjegyzetresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {ColumnSettings} from '../common/reszletek/columnsettings';
import {ColumnSettingsResult} from '../common/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class ProjektjegyzetService {
  private readonly _controller = environment.CoreRef + 'api/projektjegyzet/';
  cim = 'Jegyzet';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: ProjektjegyzetDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<ProjektjegyzetResult> {
    return this._httpClient.post<ProjektjegyzetResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: ProjektjegyzetDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<ProjektjegyzetResult> {
    return this._httpClient.post<ProjektjegyzetResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(projektkod: number): Promise<ProjektjegyzetResult> {
    return this._httpClient.post<ProjektjegyzetResult>(
      this._controller + 'select', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: ProjektjegyzetDto): Promise<NumberResult> {
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
