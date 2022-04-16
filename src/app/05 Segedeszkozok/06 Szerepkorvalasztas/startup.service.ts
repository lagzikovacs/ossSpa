import { Injectable } from '@angular/core';
import {StartupResult} from './startupresult';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {LogonService} from "../05 Bejelentkezes/logon.service";
import {SessionService} from "../../session/session.service";
import {AfakulcsService} from "../../01 Torzsadatok/05 Afakulcs/afakulcs.service";
import {FelhasznaloService} from "../03 Felhasznalo/felhasznalo.service";
import {FizetesimodService} from "../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service";
import {HelysegService} from "../../01 Torzsadatok/07 Helyseg/helyseg.service";
import {IrattipusService} from "../../01 Torzsadatok/01 Irattipus/irattipus.service";
import {MeService} from "../../01 Torzsadatok/04 Mennyisegiegyseg/me.service";
import {PenznemService} from "../../01 Torzsadatok/03 Penznem/penznem.service";
import {TermekdijService} from "../../01 Torzsadatok/051 Termekdij/termekdij.service";
import {TevekenysegService} from "../../01 Torzsadatok/08 Tevekenyseg/tevekenyseg.service";
import {CikkService} from "../../01 Torzsadatok/06 Cikk/cikk.service";
import {UgyfelService} from "../../01 Torzsadatok/09 Ugyfel/ugyfel.service";
import {ProjektService} from "../../02 Eszkozok/01 Projekt/projekt/projekt.service";
import {ProjektjegyzetService} from "../../projektjegyzet/projektjegyzet.service";
import {IratService} from "../../02 Eszkozok/02 Irat/irat/irat.service";
import {PenztarService} from "../../penztar/penztar.service";
import {PenztartetelService} from "../../penztartetel/penztartetel.service";
import {KifizetesService} from "../../kifizetes/kifizetes.service";
import {DokumentumService} from "../../dokumentum/dokumentum.service";
import {VolumeService} from "../02 Volume/volume.service";
import {UgyfelterlogService} from "../../ugyfelterlog/ugyfelterlog.service";
import {AjanlatkeresService} from "../../ajanlatkeres/ajanlatkeres.service";
import {FelmeresService} from "../../felmeres/felmeres.service";
import {HibabejelentesService} from "../../hibabejelentes/hibabejelentes.service";
import {lastValueFrom} from "rxjs";
import {EmptyResult} from "../../common/dtos/emptyresult";
import {Observable} from "rxjs";
import {CsoportService} from "../04 Csoport/csoport.service";

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private readonly _controller = environment.CoreRef + 'api/startup/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService,
              private _csoportservice: CsoportService,
              private _sessionservice: SessionService,
              private _afakulcsservice: AfakulcsService,
              private _felhasznaloservice: FelhasznaloService,
              private _fizetesimodservice: FizetesimodService,
              private _helysegservice: HelysegService,
              private _irattipusservice: IrattipusService,
              private _meservice: MeService,
              private _penznemservice: PenznemService,
              private _termekdijservice: TermekdijService,
              private _tevekenysegservice: TevekenysegService,
              private _cikkservice: CikkService,
              private _ugyfelservice: UgyfelService,
              private _projektservice: ProjektService,
              private _projektjegyzetservice: ProjektjegyzetService,
              private _iratservice: IratService,
              private _penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService,
              private _kifizetesservice: KifizetesService,
              private _dokumentumservice: DokumentumService,
              private _volumeservice: VolumeService,
              private _ugyfelterlogservice: UgyfelterlogService,

              private _ajanlatkeresservice: AjanlatkeresService,
              private _felmeresservice: FelmeresService,
              private _hibabejelentesservice: HibabejelentesService
  ) {}

  public async Get(): Promise<StartupResult> {
    const url = this._controller + 'get';
    const body = null;

    return await lastValueFrom(
      this._httpClient.post<StartupResult>(url, body, this._logonservice.httpoptions())
    );
  }

  public async Dummy(): Promise<EmptyResult> {
    const o = new Observable<EmptyResult>(subscriber => {
      subscriber.next(new EmptyResult());
      subscriber.complete();
    });

    return await lastValueFrom(o);
  }

  public async SzerepkorValasztas(particiokod: number, csoportkod: number): Promise<void> {
    try {
      const res = await this._logonservice.SzerepkorValasztas(particiokod, csoportkod);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._csoportservice.Jogaim();
      if (res1.Error != null) {
        throw res1.Error;
      }

      this._logonservice.Jogaim = res1.Result;

      const res2 = await this._sessionservice.Get();
      if (res2.Error != null) {
        throw res2.Error;
      }

      this._sessionservice.sessiondto = res2.Result[0];

      const res3 = await this.Get();
      if (res3.Error != null) {
        throw res3.Error;
      }

      this._afakulcsservice.GridSettings = res3.Afakulcs_Grid;
      this._afakulcsservice.ReszletekSettings = res3.Afakulcs_Reszletek;
      this._felhasznaloservice.GridSettings = res3.Felhasznalo_Grid;
      this._felhasznaloservice.ReszletekSettings = res3.Felhasznalo_Reszletek;
      this._fizetesimodservice.GridSettings = res3.Fizetesimod_Grid;
      this._fizetesimodservice.ReszletekSettings = res3.Fizetesimod_Reszletek;
      this._helysegservice.GridSettings = res3.Helyseg_Grid;
      this._helysegservice.ReszletekSettings = res3.Helyseg_Reszletek;
      this._irattipusservice.GridSettings = res3.Irattipus_Grid;
      this._irattipusservice.ReszletekSettings = res3.Irattipus_Reszletek;
      this._meservice.GridSettings = res3.Me_Grid;
      this._meservice.ReszletekSettings = res3.Me_Reszletek;
      this._penznemservice.GridSettings = res3.Penznem_Grid;
      this._penznemservice.ReszletekSettings = res3.Penznem_Reszletek;
      this._termekdijservice.GridSettings = res3.Termekdij_Grid;
      this._termekdijservice.ReszletekSettings = res3.Termekdij_Reszletek;
      this._tevekenysegservice.GridSettings = res3.Tevekenyseg_Grid;
      this._tevekenysegservice.ReszletekSettings = res3.Tevekenyseg_Reszletek;

      this._cikkservice.GridSettings = res3.Cikk_Grid;
      this._cikkservice.BeszerzesKivetGridSettings = res3.BeszerzesKivet_Grid;
      this._cikkservice.ReszletekSettings = res3.Cikk_Reszletek;
      this._ugyfelservice.GridSettings = res3.Ugyfel_Grid;
      this._ugyfelservice.ReszletekSettings = res3.Ugyfel_Reszletek;

      this._projektservice.GridSettings = res3.Projekt_Grid;
      this._projektservice.ReszletekSettings = res3.Projekt_Reszletek;
      this._projektjegyzetservice.GridSettings = res3.Projektjegyzet_Grid;
      this._projektjegyzetservice.ReszletekSettings = res3.Projektjegyzet_Reszletek;

      this._iratservice.GridSettings = res3.Irat_Grid;
      this._iratservice.ReszletekSettings = res3.Irat_Reszletek;

      this._csoportservice.GridSettings = res3.Csoport_Grid;
      this._csoportservice.ReszletekSettings = res3.Csoport_Reszletek;

      this._penztarservice.GridSettings = res3.Penztar_Grid;
      this._penztarservice.ReszletekSettings = res3.Penztar_Reszletek;
      this._penztartetelservice.GridSettings = res3.Penztartetel_Grid;
      this._penztartetelservice.ReszletekSettings = res3.Penztartetel_Reszletek;

      this._kifizetesservice.GridSettings = res3.Kifizetes_Grid;
      this._kifizetesservice.ReszletekSettings = res3.Kifizetes_Reszletek;
      this._dokumentumservice.GridSettings = res3.Dokumentum_Grid;
      this._dokumentumservice.ReszletekSettings = res3.Dokumentum_Reszletek;
      this._volumeservice.GridSettings = res3.Volume_Grid;
      this._volumeservice.ReszletekSettings = res3.Volume_Reszletek;
      this._ugyfelterlogservice.GridSettings = res3.Ugyfelterlog_Grid;
      this._ugyfelterlogservice.ReszletekSettings = res3.Ugyfelterlog_Reszletek;

      this._ajanlatkeresservice.GridSettings = res3.Ajanlatkeres_Grid;
      this._ajanlatkeresservice.ReszletekSettings = res3.Ajanlatkeres_Reszletek;
      this._felmeresservice.GridSettings = res3.Felmeres_Grid;
      this._felmeresservice.ReszletekSettings = res3.Felmeres_Reszletek;
      this._hibabejelentesservice.GridSettings = res3.Hibabejelentes_Grid;
      this._hibabejelentesservice.ReszletekSettings = res3.Hibabejelentes_Reszletek;

      this._logonservice.SzerepkorKivalasztva = true;
    } catch (err) {
      throw err;
    }
  }
}
