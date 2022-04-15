import { Injectable } from '@angular/core';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {IratParam} from './iratparam';
import {environment} from '../../../../environments/environment';
import {IratDto} from './iratdto';
import {IratResult} from './iratresult';
import {NumberResult} from '../../../common/dtos/numberresult';
import {EmptyResult} from '../../../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../../../common/reszletek/columnsettingsresult';
import {ColumnSettings} from '../../../common/reszletek/columnsettings';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IratService {
  private readonly _controller = environment.CoreRef + 'api/irat/';
  cim = 'Irat';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: IratDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<IratResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<IratResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: IratDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(iratkod: number): Promise<IratResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<IratResult>(url, iratkod, this._logonservice.httpoptions())
    );
  }

  public async Select(ip: IratParam): Promise<IratResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<IratResult>(url, ip, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: IratDto): Promise<NumberResult> {
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
