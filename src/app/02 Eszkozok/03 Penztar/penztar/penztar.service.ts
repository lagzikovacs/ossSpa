import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {PenztarDto} from './penztardto';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {PenztarResult} from './penztarresult';
import {EmptyResult} from '../../../common/dtos/emptyresult';
import {ColumnSettings} from '../../../common/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../../common/reszletek/columnsettingsresult';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PenztarService {
  private readonly _controller = environment.CoreRef + 'api/penztar/';
  cim = 'Pénztár';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: PenztarDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<PenztarResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<PenztarResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: PenztarDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<PenztarResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<PenztarResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<PenztarResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<PenztarResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }
  public async ReadById(key: number): Promise<PenztarResult> {
    const url = this._controller + 'readbyid';

    return await lastValueFrom(
      this._httpClient.post<PenztarResult>(url, JSON.stringify(key), this._logonservice.httpoptions())
    );
  }
  public async ReadByCurrencyOpened(penznemkod: number): Promise<PenztarResult> {
    const url = this._controller + 'readbycurrencyopened';

    return await lastValueFrom(
      this._httpClient.post<PenztarResult>(url, JSON.stringify(penznemkod), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: PenztarDto): Promise<NumberResult> {
    const url = this._controller + 'update';

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
