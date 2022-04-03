import { Injectable } from '@angular/core';
import {NumberResult} from '../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CsoportDto} from './csoportdto';
import {LogonService} from '../logon/logon.service';
import {CsoportResult} from './csoportresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {FelhasznaloResult} from '../primitiv/felhasznalo/felhasznaloresult';
import {LehetsegesJogResult} from './lehetsegesjogresult';
import {CsoportFelhasznaloParameter} from './csoportfelhasznaloparameter';
import {CsoportJogParameter} from './csoportjogparameter';
import {JogaimResult} from './jogaimresult';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class CsoportService {
  private readonly _controller = environment.CoreRef + 'api/csoport/';
  cim = 'Csoport';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: CsoportDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<CsoportResult> {
    return this._httpClient.post<CsoportResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: CsoportDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<CsoportResult> {
    return this._httpClient.post<CsoportResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Read(maszk: string): Promise<CsoportResult> {
    return this._httpClient.post<CsoportResult>(
      this._controller + 'read', JSON.stringify(maszk), this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: CsoportDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'update', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public SelectCsoportFelhasznalo(csoportkod: number): Promise<FelhasznaloResult> {
    return this._httpClient.post<FelhasznaloResult>(
      this._controller + 'selectcsoportfelhasznalo', JSON.stringify(csoportkod), this._logonservice.httpoptions())
      .toPromise();
  }

  public SelectCsoportJog(csoportkod: number): Promise<LehetsegesJogResult> {
    return this._httpClient.post<LehetsegesJogResult>(
      this._controller + 'selectcsoportjog', JSON.stringify(csoportkod), this._logonservice.httpoptions())
      .toPromise();
  }

  public CsoportFelhasznaloBeKi(par: CsoportFelhasznaloParameter): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'csoportfelhasznalobeki', par, this._logonservice.httpoptions())
      .toPromise();
  }
  public CsoportJogBeKi(par: CsoportJogParameter): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'csoportjogbeki', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public Jogaim(): Promise<JogaimResult> {
    return this._httpClient.post<JogaimResult>(
      this._controller + 'jogaim', null, this._logonservice.httpoptions())
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
