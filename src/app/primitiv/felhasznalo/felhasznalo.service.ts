import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FelhasznaloDto} from './felhasznalodto';
import {FelhasznaloResult} from './felhasznaloresult';
import {Md5} from 'ts-md5';
import {JelszocsereParameter} from './jelszocsereparameter';
import {environment} from '../../../environments/environment';
import {LogonService} from '../../logon/logon.service';
import {NumberResult} from '../../dtos/numberresult';
import {EmptyResult} from '../../dtos/emptyresult';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {
  private readonly _controller = environment.CoreRef + 'api/felhasznalo/';
  cim = 'Felhasználó';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: FelhasznaloDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<FelhasznaloResult> {
    return this._httpClient.post<FelhasznaloResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: FelhasznaloDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<FelhasznaloResult> {
    return this._httpClient.post<FelhasznaloResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<FelhasznaloResult> {
    return this._httpClient.post<FelhasznaloResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: FelhasznaloDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public JelszoBeallitas(FelhasznaloKod: number, Jelszo: string, UtolsoModositas: any): Promise<EmptyResult> {
    const body = new JelszocsereParameter(FelhasznaloKod, '', Md5.hashStr(Jelszo).toString(), UtolsoModositas);

    return this._httpClient.post<EmptyResult>(
      this._controller + 'jelszobeallitas', body, this._logonservice.httpoptions())
      .toPromise();
  }

  public JelszoCsere(RegiJelszo: string, UjJelszo: string): Promise<EmptyResult> {
    const body = new JelszocsereParameter(0, Md5.hashStr(RegiJelszo).toString(), Md5.hashStr(UjJelszo).toString(), undefined);

    return this._httpClient.post<EmptyResult>(
      this._controller + 'jelszocsere', body, this._logonservice.httpoptions())
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
