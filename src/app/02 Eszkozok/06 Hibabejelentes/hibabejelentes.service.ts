import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {HibabejelentesResult} from './hibabejelentesresult';
import {environment} from '../../../environments/environment';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {ColumnSettingsResult} from '../../common/reszletek/columnsettingsresult';
import {ColumnSettings} from '../../common/reszletek/columnsettings';
import {HibabejelentesDto} from './hibabejelentesdto';
import {HibabejelentesParam} from './hibabejelentesparam';
import {IratResult} from '../02 Irat/irat/iratresult';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HibabejelentesService {
  private readonly _controller = environment.CoreRef + 'api/hibabejelentes/';
  cim = 'Hibabejelentés';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: HibabejelentesDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<HibabejelentesResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<HibabejelentesResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: HibabejelentesDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<HibabejelentesResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<HibabejelentesResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(fp: HibabejelentesParam): Promise<HibabejelentesResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<HibabejelentesResult>(url, fp, this._logonservice.httpoptions())
    );
  }

  public async SelectTelepitesdokumentumai(projektkod: number): Promise<IratResult> {
    const url = this._controller + 'selecttelepitesdokumentumai';

    return await lastValueFrom(
      this._httpClient.post<IratResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: HibabejelentesDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZarasNyitas(dto: HibabejelentesDto): Promise<NumberResult> {
    const url = this._controller + 'zarasnyitas';

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
