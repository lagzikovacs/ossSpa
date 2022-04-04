import { Injectable } from '@angular/core';
import {NumberResult} from '../../common/dtos/numberresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CsoportDto} from './csoportdto';
import {CsoportResult} from './csoportresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {LehetsegesJogResult} from './lehetsegesjogresult';
import {JogaimResult} from './jogaimresult';
import {CsoportJogParam} from "./csoportjogparam";
import {CsoportFelhasznaloParam} from "./csoportfelhasznaloparam";
import {lastValueFrom} from "rxjs";
import {FelhasznaloResult} from "../03 Felhasznalo/felhasznaloresult";
import {ColumnSettings} from "../../common/reszletek/columnsettings";
import {LogonService} from "../05 Bejelentkezes/logon.service";
import {ColumnSettingsResult} from "../../common/reszletek/columnsettingsresult";

@Injectable({
  providedIn: 'root'
})
export class CsoportService {
  private readonly _controller = environment.CoreRef + 'api/csoport/';
  cim = 'Csoport';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: CsoportDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<CsoportResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<CsoportResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: CsoportDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<CsoportResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<CsoportResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Read(maszk: string): Promise<CsoportResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<CsoportResult>(url, JSON.stringify(maszk), this._logonservice.httpoptions())
    );
  }

  public async Update(dto: CsoportDto): Promise<NumberResult> {
    const url = this._controller + 'update';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async SelectCsoportFelhasznalo(csoportkod: number): Promise<FelhasznaloResult> {
    const url = this._controller + 'selectcsoportfelhasznalo';

    return await lastValueFrom(
      this._httpClient.post<FelhasznaloResult>(url, JSON.stringify(csoportkod), this._logonservice.httpoptions())
    );
  }

  public async SelectCsoportJog(csoportkod: number): Promise<LehetsegesJogResult> {
    const url = this._controller + 'selectcsoportjog';

    return await lastValueFrom(
      this._httpClient.post<LehetsegesJogResult>(url, JSON.stringify(csoportkod), this._logonservice.httpoptions())
    );
  }

  public async CsoportFelhasznaloBeKi(par: CsoportFelhasznaloParam): Promise<EmptyResult> {
    const url = this._controller + 'csoportfelhasznalobeki';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async CsoportJogBeKi(par: CsoportJogParam): Promise<EmptyResult> {
    const url = this._controller + 'csoportjogbeki';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async Jogaim(): Promise<JogaimResult> {
    const url = this._controller + 'jogaim';

    return await lastValueFrom(
      this._httpClient.post<JogaimResult>(url, null, this._logonservice.httpoptions())
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
