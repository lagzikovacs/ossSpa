import { Injectable } from '@angular/core';
import {AngularmenuDto} from './angularmenudto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from '../logon/logon.service';
import {AngularmenuResult} from './angularmenuresult';
import {Router} from '@angular/router';
import {IrattipusService} from '../primitiv/irattipus/irattipus.service';
import {IrattipusDto} from '../primitiv/irattipus/irattipusdto';
import {HelysegService} from '../primitiv/helyseg/helyseg.service';
import {HelysegDto} from '../primitiv/helyseg/helysegdto';
import {UgyfelService} from '../ugyfel/ugyfel.service';
import {UgyfelDto} from '../ugyfel/ugyfeldto';
import {FelhasznaloDto} from '../primitiv/felhasznalo/felhasznalodto';
import {FelhasznaloService} from '../primitiv/felhasznalo/felhasznalo.service';
import {CsoportService} from '../csoport/csoport.service';
import {VolumeService} from '../volume/volume.service';
import {VolumeDto} from '../volume/volumedto';
import {CsoportDto} from '../csoport/csoportdto';
import {ProjektService} from '../projekt/projekt.service';
import {IratService} from '../irat/irat.service';
import {AjanlatkeresService} from '../ajanlatkeres/ajanlatkeres.service';
import {IratDto} from '../irat/iratdto';
import {ProjektDto} from '../projekt/projektdto';
import {AjanlatkeresDto} from '../ajanlatkeres/ajanlatkeresdto';
import {TeendoService} from '../primitiv/teendo/teendo.service';
import {TeendoDto} from '../primitiv/teendo/teendodto';
import {FizetesimodService} from '../primitiv/fizetesimod/fizetesimod.service';
import {PenznemService} from '../primitiv/penznem/penznem.service';
import {FizetesimodDto} from '../primitiv/fizetesimod/fizetesimoddto';
import {PenznemDto} from '../primitiv/penznem/penznemdto';
import {MeService} from '../primitiv/me/me.service';
import {AfakulcsService} from '../primitiv/afakulcs/afakulcs.service';
import {TermekdijService} from '../primitiv/termekdij/termekdij.service';
import {CikkService} from '../cikk/cikk.service';
import {MeDto} from '../primitiv/me/medto';
import {AfakulcsDto} from '../primitiv/afakulcs/afakulcsdto';
import {TermekdijDto} from '../primitiv/termekdij/termekdijdto';
import {CikkDto} from '../cikk/cikkdto';
import {PenztarDto} from '../penztar/penztardto';
import {PenztarService} from '../penztar/penztar.service';
import {ProjektkapcsolatService} from '../projektkapcsolat/projektkapcsolat.service';
import {ProjektKapcsolatDto} from '../projektkapcsolat/projektkapcsolatdto';
import {SzamlazasirendService} from '../szamlazasirend/szamlazasirend.service';
import {ProjektteendoService} from '../projektteendo/projektteendo.service';
import {SzamlazasirendDto} from '../szamlazasirend/szamlazasirenddto';
import {ProjektteendoDto} from '../projektteendo/projektteendodto';
import {VolumeContainerMode} from '../volume/volumecontainermode';
import {ParticioService} from '../particio/particio.service';
import {ParticioEgyMode} from '../particio/particioegymode';
import {UgyfelContainerMode} from '../ugyfel/ugyfelcontainermode';
import {CsoportContainerMode} from '../csoport/csoportcontainermode';
import {AjanlatkeresContainerMode} from '../ajanlatkeres/ajanlatkerescontainermode';
import {PenztarContainerMode} from '../penztar/penztarcontainermode';
import {IratContainerMode} from '../irat/iratcontainermode';
import {ProjektContainerMode} from '../projekt/projektcontainermode';
import {PlatformLocation} from '@angular/common';
import {DokumentumService} from '../dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../dokumentum/dokumentumcontainermode';
import {DokumentumDto} from '../dokumentum/dokumentumdto';
import {BizonylatService} from '../bizonylat/bizonylat.service';
import {BizonylatTipus} from '../bizonylat/bizonylattipus';
import {BizonylatDto} from '../bizonylat/bizonylatdto';
import {BizonylatContainerMode} from '../bizonylat/bizonylatcontainermode';
import {VagolapService} from '../vagolap/vagolap.service';
import {VagolapMode} from '../vagolap/vagolapmode';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _controller = 'api/menu/';

  constructor(private _router: Router,
              private _location: PlatformLocation,
              private _httpClient: HttpClient,
              private _logonservice: LogonService,
              private _irattipusservice: IrattipusService,
              private _teendoservice: TeendoService,
              private _fizetesimodservice: FizetesimodService,
              private _penznemservice: PenznemService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _cikkservice: CikkService,
              private _helysegservice: HelysegService,
              private _ugyfelservice: UgyfelService,
              private _projektservice: ProjektService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _szamlazasirendservice: SzamlazasirendService,
              private _projektteendoservice: ProjektteendoService,
              private _iratservice: IratService,
              private _dokumentumservice: DokumentumService,
              private _penztarservice: PenztarService,
              private _ugynokservice: AjanlatkeresService,
              private _bizonylatservice: BizonylatService,
              private _particioservice: ParticioService,
              private _volumeservice: VolumeService,
              private _felhasznaloservice: FelhasznaloService,
              private _csoportservice: CsoportService,
              private _vagolapservice: VagolapService) {
    _location.onPopState(() => {
      _router.navigate(['bejelentkezes']);
      // TODO nem a várt dolog történik, de megfelel
    });
  }

  public AngularMenu(): Promise<AngularmenuResult> {
    const url = environment.CoreRef + this._controller + 'angularmenu';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<AngularmenuResult>(url, body, options).toPromise();
  }

  menuclick(utvonal: string) {
    switch (utvonal) {
      case '/irattipus':
        this._irattipusservice.zoom = false;
        this._irattipusservice.Dto = new Array<IrattipusDto>();
        break;
      case '/projektteendo':
        this._teendoservice.zoom = false;
        this._teendoservice.Dto = new Array<TeendoDto>();
        break;
      case '/fizetesimod':
        this._fizetesimodservice.zoom = false;
        this._fizetesimodservice.Dto = new Array<FizetesimodDto>();
        break;
      case '/penznem':
        this._penznemservice.zoom = false;
        this._penznemservice.Dto = new Array<PenznemDto>();
        break;
      case '/me':
        this._meservice.zoom = false;
        this._meservice.Dto = new Array<MeDto>();
        break;
      case '/afakulcs':
        this._afakulcsservice.zoom = false;
        this._afakulcsservice.Dto = new Array<AfakulcsDto>();
        break;
      case '/termekdij':
        this._termekdijservice.zoom = false;
        this._termekdijservice.Dto = new Array<TermekdijDto>();
        break;
      case '/cikk':
        this._cikkservice.zoom = false;
        this._cikkservice.Dto = new Array<CikkDto>();
        break;
      case '/helyseg':
        this._helysegservice.zoom = false;
        this._helysegservice.Dto = new Array<HelysegDto>();
        break;
      case '/ugyfel':
        this._ugyfelservice.ContainerMode = UgyfelContainerMode.List;
        this._ugyfelservice.zoom = false;
        this._ugyfelservice.Dto = new Array<UgyfelDto>();
      break;

      case '/projekt':
        this._projektservice.statuszszempont = 0;
        this._projektservice.teendoszempont = 0;
        this._projektservice.szempont = 0;
        this._projektservice.minta = '';

        this._projektservice.ContainerMode = ProjektContainerMode.List;
        this._projektservice.Dto = new Array<ProjektDto>();
        this._projektkapcsolatservice.Dto = new Array<ProjektKapcsolatDto>();
        this._szamlazasirendservice.Dto = new Array<SzamlazasirendDto>();
        this._projektteendoservice.Dto = new Array<ProjektteendoDto>();
      break;
      case '/irat':
        this._iratservice.szempont = 0;
        this._iratservice.szempont2 = 0;
        this._iratservice.minta = '';
        this._iratservice.minta2 = '';

        this._iratservice.ContainerMode = IratContainerMode.List;
        this._iratservice.Dto = new Array<IratDto>();
        this._dokumentumservice.ContainerMode = DokumentumContainerMode.List;
        this._dokumentumservice.Dto = new Array<DokumentumDto>();
      break;
      case '/penztar':
        this._penztarservice.ContainerMode = PenztarContainerMode.List;
        this._penztarservice.ekDto.minta = '';
        this._penztarservice.Dto = new Array<PenztarDto>();
        break;
      case '/ajanlatkeres':
        this._ugynokservice.ContainerMode = AjanlatkeresContainerMode.List;
        this._ugynokservice.Dto = new Array<AjanlatkeresDto>();
      break;


      case '/bizonylat/dijbekero':
        this._bizonylatservice.bizonylatTipus = BizonylatTipus.DijBekero;
        this._bizonylatservice.ContainerMode = BizonylatContainerMode.List;
        this._bizonylatservice.Dto = new Array<BizonylatDto>();
        break;
      case '/bizonylat/elolegszamla':
        this._bizonylatservice.bizonylatTipus = BizonylatTipus.ElolegSzamla;
        this._bizonylatservice.ContainerMode = BizonylatContainerMode.List;
        this._bizonylatservice.Dto = new Array<BizonylatDto>();
        break;
      case '/bizonylat/szallito':
        this._bizonylatservice.bizonylatTipus = BizonylatTipus.Szallito;
        this._bizonylatservice.ContainerMode = BizonylatContainerMode.List;
        this._bizonylatservice.Dto = new Array<BizonylatDto>();
        break;
      case '/bizonylat/szamla':
        this._bizonylatservice.bizonylatTipus = BizonylatTipus.Szamla;
        this._bizonylatservice.ContainerMode = BizonylatContainerMode.List;
        this._bizonylatservice.Dto = new Array<BizonylatDto>();
        break;
      case '/bizonylat/megrendeles':
        this._bizonylatservice.bizonylatTipus = BizonylatTipus.Megrendeles;
        this._bizonylatservice.ContainerMode = BizonylatContainerMode.List;
        this._bizonylatservice.Dto = new Array<BizonylatDto>();
        break;
      case '/bizonylat/bejovoszamla':
        this._bizonylatservice.bizonylatTipus = BizonylatTipus.BejovoSzamla;
        this._bizonylatservice.ContainerMode = BizonylatContainerMode.List;
        this._bizonylatservice.Dto = new Array<BizonylatDto>();
        break;


      case '/particio':
        this._particioservice.EgyMode = ParticioEgyMode.Szallito;
        break;
      case '/volume':
        this._volumeservice.ContainerMode = VolumeContainerMode.List;
        this._volumeservice.Dto = new Array<VolumeDto>();
        break;
      case '/felhasznalo':
        this._felhasznaloservice.zoom = false;
        this._felhasznaloservice.Dto = new Array<FelhasznaloDto>();
        break;
      case '/csoport':
        this._csoportservice.ContainerMode = CsoportContainerMode.List;
        this._csoportservice.Dto = new Array<CsoportDto>();
        break;
      case '/vagolap':
        this._vagolapservice.Mode = VagolapMode.List;
        break;
      default:
        // TODO
        break;
    }

    this._router.navigate([utvonal]);
  }
}
