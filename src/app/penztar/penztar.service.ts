import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {PenztarDto} from './penztardto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {NumberResult} from '../common/dtos/numberresult';
import {PenztarResult} from './penztarresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class PenztarService {
  private readonly _controller = environment.CoreRef + 'api/penztar/';
  cim = 'Pénztár';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: PenztarDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<PenztarResult> {
    return this._httpClient.post<PenztarResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: PenztarDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<PenztarResult> {
    return this._httpClient.post<PenztarResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<PenztarResult> {
    return this._httpClient.post<PenztarResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }
  public ReadById(key: number): Promise<PenztarResult> {
    return this._httpClient.post<PenztarResult>(
      this._controller + 'readbyid', JSON.stringify(key), this._logonservice.httpoptions())
      .toPromise();
  }
  public ReadByCurrencyOpened(penznemkod: number): Promise<PenztarResult> {
    return this._httpClient.post<PenztarResult>(
      this._controller + 'readbycurrencyopened', JSON.stringify(penznemkod), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: PenztarDto): Promise<NumberResult> {
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
