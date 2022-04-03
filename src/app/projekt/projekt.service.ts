import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {ProjektDto} from './projektdto';
import {ProjektParameter} from './projektparameter';
import {environment} from '../../environments/environment';
import {ProjektResult} from './projektresult';
import {NumberResult} from '../common/dtos/numberresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjektService {
  private readonly _controller = environment.CoreRef + 'api/projekt/';
  cim = 'Projekt';

  statuszszurok = [
    '(0) Mind', '(1) Ajánlat', '(2) Fut', '(3) Kész', '(4) Pályázatra vár', '(5) Mástól megrendelte',
    '(6) Döglött', '(7) Csak érdeklődött', '(8) Helyszíni felmérést kér', '(9) Kommunikál, van remény',
    '(10) Még papírozni kell', '(11) Elhalasztva', '(12) Passzív', '(13) Felmérés után', '(14) Roadshow-ra jelentkezett',
    '(15) Link', '(16) Csodapályázat', '(17) Ampert bővít', '(18) 1. ütem/I.', '(19) 1. ütem/II.', '(20) 1. ütem/III.', '(21) 1. ütem/IV' +
    '.'
  ];

  napeleminverterstatuszok = ['', 'Nincs megrendelve', 'Megrendelve', 'Raktárban', 'Kiszállítva/telepítve', 'Harmadik fél biztosítja'];
  muszakiallapotok = ['', 'Nincs elkezdve a kivitelezése', 'Elkezdve a kivitelezése', 'Beüzemelve, hiányos', 'Beüzemelve, átadva'];

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: ProjektDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'add', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNew(): Promise<ProjektResult> {
    return this._httpClient.post<ProjektResult>(
      this._controller + 'createnew', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: ProjektDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(key: number): Promise<ProjektResult> {
    return this._httpClient.post<ProjektResult>(
      this._controller + 'get', key, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(pp: ProjektParameter): Promise<ProjektResult> {
    return this._httpClient.post<ProjektResult>(
      this._controller + 'select', pp, this._logonservice.httpoptions())
      .toPromise();
  }

  public Update(dto: ProjektDto): Promise<NumberResult> {
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
