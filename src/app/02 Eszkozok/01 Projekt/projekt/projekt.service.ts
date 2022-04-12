import { Injectable } from '@angular/core';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ProjektDto} from './projektdto';
import {ProjektParam} from './projektparam';
import {environment} from '../../../../environments/environment';
import {ProjektResult} from './projektresult';
import {NumberResult} from '../../../common/dtos/numberresult';
import {EmptyResult} from '../../../common/dtos/emptyresult';
import {ColumnSettings} from '../../../common/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../../common/reszletek/columnsettingsresult';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from "rxjs";

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

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Add(dto: ProjektDto): Promise<NumberResult> {
    const url = this._controller + 'add';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async CreateNew(): Promise<ProjektResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<ProjektResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: ProjektDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(key: number): Promise<ProjektResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<ProjektResult>(url, key, this._logonservice.httpoptions())
    );
  }

  public async Select(pp: ProjektParam): Promise<ProjektResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<ProjektResult>(url, pp, this._logonservice.httpoptions())
    );
  }

  public async Update(dto: ProjektDto): Promise<NumberResult> {
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
