import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {HibabejelentesResult} from './hibabejelentesresult';
import {environment} from '../../environments/environment';
import {NumberResult} from '../common/dtos/numberresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {HibabejelentesDto} from './hibabejelentesdto';
import {HibabejelentesParameter} from './hibabejelentesparameter';
import {IratResult} from '../irat/iratresult';

@Injectable({
  providedIn: 'root'
})
export class HibabejelentesService {
  private readonly _controller = environment.CoreRef + 'api/hibabejelentes/';
  cim = 'Hibabejelentés';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: HibabejelentesDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<HibabejelentesResult> {
    return this._httpClient.post<HibabejelentesResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: HibabejelentesDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<HibabejelentesResult> {
    return this._httpClient.post<HibabejelentesResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(fp: HibabejelentesParameter): Promise<HibabejelentesResult> {
    return this._httpClient.post<HibabejelentesResult>(
      this._controller + 'select', fp, this._logonservice.httpoptions())
      .toPromise();
  }

  public SelectTelepitesdokumentumai(projektkod: number): Promise<IratResult> {
    return this._httpClient.post<IratResult>(
      this._controller + 'selecttelepitesdokumentumai', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: HibabejelentesDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZarasNyitas(dto: HibabejelentesDto): Promise<NumberResult> {
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
