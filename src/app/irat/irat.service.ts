import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {IratParameter} from './iratparameter';
import {environment} from '../../environments/environment';
import {IratDto} from './iratdto';
import {IratResult} from './iratresult';
import {NumberResult} from '../common/dtos/numberresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class IratService {
  private readonly _controller = environment.CoreRef + 'api/irat/';
  cim = 'Irat';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: IratDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<IratResult> {
    return this._httpClient.post<IratResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: IratDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(iratkod: number): Promise<IratResult> {
    return this._httpClient.post<IratResult>(
      this._controller + 'get', iratkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(ip: IratParameter): Promise<IratResult> {
    return this._httpClient.post<IratResult>(
      this._controller + 'select', ip, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: IratDto): Promise<NumberResult> {
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
