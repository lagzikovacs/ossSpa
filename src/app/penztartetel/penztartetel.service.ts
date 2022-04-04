import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {PenztartetelDto} from './penztarteteldto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {NumberResult} from '../common/dtos/numberresult';
import {PenztartetelResult} from './penztartetelresult';
import {PenztartetelParameter} from './penztartetelparameter';
import {ColumnSettingsResult} from '../common/reszletek/columnsettingsresult';
import {ColumnSettings} from '../common/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class PenztartetelService {
  private readonly _controller = environment.CoreRef + 'api/penztartetel/';
  cim = 'Pénztártételek';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: PenztartetelDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<PenztartetelResult> {
    return this._httpClient.post<PenztartetelResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<PenztartetelResult> {
    return this._httpClient.post<PenztartetelResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(par: PenztartetelParameter): Promise<PenztartetelResult> {
    return this._httpClient.post<PenztartetelResult>(
      this._controller + 'select', par, this._logonservice.httpoptions())
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
