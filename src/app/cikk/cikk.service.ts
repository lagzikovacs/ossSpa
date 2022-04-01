import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {CikkDto} from './cikkdto';
import {environment} from '../../environments/environment';
import {CikkParameter} from './cikkparameter';
import {CikkResult} from './cikkresult';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {CikkMozgasResult} from './cikkmozgasresult';
import {CikkMozgasParameter} from './cikkmozgasparameter';
import {CikkZoomParameter} from './cikkzoomparameter';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CikkService {
  private readonly _controller = environment.CoreRef + 'api/cikk/';
  cim = 'Cikk';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;
  BeszerzesKivetGridSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: CikkDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<CikkResult> {
    return this._httpClient.post<CikkResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: CikkDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<CikkResult> {
    return this._httpClient.post<CikkResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(up: CikkParameter): Promise<CikkResult> {
    return this._httpClient.post<CikkResult>(
      this._controller + 'select', up, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: CikkDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Mozgas(par: CikkMozgasParameter): Promise<CikkMozgasResult> {
    return this._httpClient.post<CikkMozgasResult>(
      this._controller + 'mozgas', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public async ZoomCheck(par: CikkZoomParameter): Promise<EmptyResult> {
    const url = this._controller + 'zoomcheck';

    // return this._httpClient.post<EmptyResult>(
    //   url, par, this._logonservice.httpoptions())
    //   .toPromise();

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, par, this._logonservice.httpoptions())
    );
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
