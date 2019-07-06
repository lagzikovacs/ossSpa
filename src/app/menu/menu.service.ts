import { Injectable } from '@angular/core';
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
import {ParticioService} from '../particio/particio.service';
import {ParticioEgyMode} from '../particio/particioegymode';
import {PlatformLocation} from '@angular/common';
import {DokumentumService} from '../dokumentum/dokumentum.service';
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
              private _cikkservice: CikkService,
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
        break;
      case '/projektteendo':
        break;
      case '/fizetesimod':
        break;
      case '/penznem':
        break;
      case '/me':
        break;
      case '/afakulcs':
        break;
      case '/termekdij':
        break;
      case '/cikk':
        this._cikkservice.Dto = new Array<CikkDto>();
        break;
      case '/helyseg':
        break;
      case '/ugyfel':
        this._ugyfelservice.Dto = new Array<UgyfelDto>();
      break;

      case '/projekt':
        this._projektservice.statuszszempont = 0;
        this._projektservice.teendoszempont = 0;
        this._projektservice.szempont = 0;
        this._projektservice.minta = '';

        this._projektservice.Dto = new Array<ProjektDto>();
        this._projektkapcsolatservice.Dto = new Array<ProjektKapcsolatDto>();
        this._szamlazasirendservice.Dto = new Array<SzamlazasirendDto>();
        this._projektteendoservice.Dto = new Array<ProjektteendoDto>();
      break;
      case '/irat':
        this._iratservice.Dto = new Array<IratDto>();
        this._dokumentumservice.Dto = new Array<DokumentumDto>();
      break;
      case '/penztar':
        this._penztarservice.Dto = new Array<PenztarDto>();
        break;
      case '/ajanlatkeres':
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
        break;
      case '/felhasznalo':
        break;
      case '/csoport':
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
