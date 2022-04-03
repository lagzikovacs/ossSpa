import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FelhasznaloDto} from './felhasznalodto';
import {FelhasznaloResult} from './felhasznaloresult';
import {Md5} from 'ts-md5';
import {environment} from '../../../environments/environment';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {JelszocsereParam} from './jelszocsereparam';
import {lastValueFrom} from 'rxjs';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {LogonService} from '../../logon/logon.service';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {
  private readonly _controller = environment.CoreRef + 'api/felhasznalo/';
  cim = 'Felhasználó';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: FelhasznaloDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<FelhasznaloResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<FelhasznaloResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: FelhasznaloDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<FelhasznaloResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<FelhasznaloResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<FelhasznaloResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<FelhasznaloResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: FelhasznaloDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async JelszoBeallitas(FelhasznaloKod: number, Jelszo: string, UtolsoModositas: any): Promise<EmptyResult> {
    const url = this._controller + 'jelszobeallitas';
    const body = new JelszocsereParam(FelhasznaloKod, '', Md5.hashStr(Jelszo).toString(), UtolsoModositas);

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, body, this._logonservice.httpoptions())
    );
  }

  public async JelszoCsere(RegiJelszo: string, UjJelszo: string): Promise<EmptyResult> {
    const url = this._controller + 'jelszocsere';
    const body = new JelszocsereParam(0, Md5.hashStr(RegiJelszo).toString(), Md5.hashStr(UjJelszo).toString(), new Date());

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, body, this._logonservice.httpoptions())
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
