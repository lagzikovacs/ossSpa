import { Injectable } from '@angular/core';
import {EmptyResult} from '../dtos/emptyresult';
import {LogonService} from '../logon/logon.service';
import {CsoportService} from '../csoport/csoport.service';
import {SessionService} from '../session/session.service';
import {ProjektService} from '../projekt/projekt.service';
import {IratService} from '../irat/irat.service';
import {AfakulcsService} from '../primitiv/afakulcs/afakulcs.service';
import {FelhasznaloService} from '../primitiv/felhasznalo/felhasznalo.service';
import {FizetesimodService} from '../primitiv/fizetesimod/fizetesimod.service';
import {HelysegService} from '../primitiv/helyseg/helyseg.service';
import {IrattipusService} from '../primitiv/irattipus/irattipus.service';
import {MeService} from '../primitiv/me/me.service';
import {PenznemService} from '../primitiv/penznem/penznem.service';
import {TermekdijService} from '../primitiv/termekdij/termekdij.service';
import {CikkService} from '../cikk/cikk.service';
import {UgyfelService} from '../ugyfel/ugyfel.service';
import {ProjektjegyzetService} from '../projektjegyzet/projektjegyzet.service';
import {StartupResult} from './startupresult';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SzamlazasirendService} from '../szamlazasirend/szamlazasirend.service';
import {AjanlatkeresService} from '../ajanlatkeres/ajanlatkeres.service';
import {PenztarService} from '../penztar/penztar.service';
import {PenztartetelService} from '../penztartetel/penztartetel.service';
import {VolumeService} from '../volume/volume.service';
import {KifizetesService} from '../kifizetes/kifizetes.service';
import {DokumentumService} from '../dokumentum/dokumentum.service';
import {UgyfelterlogService} from '../ugyfelterlog/ugyfelterlog.service';
import {TevekenysegService} from '../primitiv/tevekenyseg/tevekenyseg.service';
import {UgyfelkapcsolatService} from '../ugyfelkapcsolat/ugyfelkapcsolat.service';

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
              private _ugyfelkapcsolatservice: UgyfelkapcsolatService,
              private _projektservice: ProjektService,
              private _projektjegyzetservice: ProjektjegyzetService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _iratservice: IratService,
              private _ajanlatkeresservice: AjanlatkeresService,
              private _penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService,
              private _kifizetesservice: KifizetesService,
              private _dokumentumservice: DokumentumService,
              private _volumeservice: VolumeService,
              private _ugyfelterlogservice: UgyfelterlogService) { }

  public Get(): Promise<StartupResult> {
    return this._httpClient.post<StartupResult>(
      this._controller + 'get', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public SzerepkorValasztas(particiokod: number, csoportkod: number): Promise<EmptyResult> {
    return this._logonservice.SzerepkorValasztas(particiokod, csoportkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._csoportservice.Jogaim();
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this._logonservice.Jogaim = res1.Result;

        return this._sessionservice.Get();
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this._sessionservice.sessiondto = res2.Result[0];

        return this.Get();
      })
      .then(res3 => {
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
        this._ugyfelkapcsolatservice.GridSettings = res3.Ugyfelkapcsolat_Grid;
        this._ugyfelkapcsolatservice.ReszletekSettings = res3.Ugyfelkapcsolat_Reszletek;

        this._projektservice.GridSettings = res3.Projekt_Grid;
        this._projektservice.ReszletekSettings = res3.Projekt_Reszletek;
        this._projektjegyzetservice.GridSettings = res3.Projektjegyzet_Grid;
        this._projektjegyzetservice.ReszletekSettings = res3.Projektjegyzet_Reszletek;
        this._szamlazasirendservice.GridSettings = res3.Szamlazasirend_Grid;
        this._szamlazasirendservice.ReszletekSettings = res3.Szamlazasirend_Reszletek;

        this._iratservice.GridSettings = res3.Irat_Grid;
        this._iratservice.ReszletekSettings = res3.Irat_Reszletek;

        this._csoportservice.GridSettings = res3.Csoport_Grid;
        this._csoportservice.ReszletekSettings = res3.Csoport_Reszletek;

        this._ajanlatkeresservice.GridSettings = res3.Ajanlatkeres_Grid;
        this._ajanlatkeresservice.ReszletekSettings = res3.Ajanlatkeres_Reszletek;

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

        this._logonservice.SzerepkorKivalasztva = true;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }
}
