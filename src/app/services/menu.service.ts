import { Injectable } from '@angular/core';
import {AngularmenuDto} from '../dtos/menu/angularmenudto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from './logon.service';
import {AngularmenuResult} from '../dtos/menu/angularmenuresult';
import {Router} from '@angular/router';
import {IrattipusService} from '../irattipus/irattipus.service';
import {IrattipusDto} from '../dtos/primitiv/irattipus/irattipusdto';
import {HelysegService} from '../helyseg/helyseg.service';
import {HelysegDto} from '../dtos/primitiv/helyseg/helysegdto';
import {UgyfelService} from '../ugyfel/ugyfel.service';
import {UgyfelDto} from '../dtos/torzs/ugyfel/ugyfeldto';
import {FelhasznaloDto} from '../dtos/primitiv/felhasznalo/felhasznalodto';
import {FelhasznaloService} from '../felhasznalo/felhasznalo.service';
import {CsoportService} from '../csoport/csoport.service';
import {VolumeService} from '../volume/volume.service';
import {VolumeDto} from '../dtos/volume/volumedto';
import {CsoportDto} from '../dtos/csoport/csoportdto';
import {ProjektService} from './eszkoz/projekt/projekt.service';
import {IratService} from './eszkoz/irat/irat.service';
import {FeliratkozasService} from './eszkoz/feliratkozas.service';
import {IratDto} from '../dtos/irat/iratdto';
import {ProjektDto} from '../dtos/projekt/projektdto';
import {FeliratkozasDto} from '../dtos/feliratkozas/feliratkozasdto';
import {TeendoService} from '../teendo/teendo.service';
import {TeendoDto} from '../dtos/primitiv/teendo/teendodto';
import {FizetesimodService} from '../fizetesimod/fizetesimod.service';
import {PenznemService} from '../penznem/penznem.service';
import {FizetesimodDto} from '../dtos/primitiv/fizetesimod/fizetesimoddto';
import {PenznemDto} from '../dtos/primitiv/penznem/penznemdto';
import {MeService} from '../me/me.service';
import {AfakulcsService} from '../afakulcs/afakulcs.service';
import {TermekdijService} from '../termekdij/termekdij.service';
import {CikkService} from '../cikk/cikk.service';
import {MeDto} from '../dtos/primitiv/me/medto';
import {AfakulcsDto} from '../dtos/primitiv/afakulcs/afakulcsdto';
import {TermekdijDto} from '../dtos/primitiv/termekdij/termekdijdto';
import {CikkDto} from '../dtos/torzs/cikk/cikkdto';
import {PenztarDto} from '../dtos/penztar/penztardto';
import {PenztarService} from './eszkoz/penztar/penztar.service';
import {ProjektkapcsolatService} from './eszkoz/projekt/projektkapcsolat.service';
import {ProjektKapcsolatDto} from '../dtos/projekt/projektkapcsolatdto';
import {SzamlazasirendService} from './eszkoz/projekt/szamlazasirend.service';
import {ProjektteendoService} from './eszkoz/projekt/projektteendo.service';
import {SzamlazasirendDto} from '../dtos/projekt/szamlazasirenddto';
import {ProjektteendoDto} from '../dtos/projekt/projektteendodto';
import {VolumeContainerMode} from '../volume/volumecontainermode';
import {ParticioService} from '../particio/particio.service';
import {ParticioEgyMode} from '../particio/particioegymode';
import {HelysegContainerMode} from '../helyseg/helysegcontainermode';
import {UgyfelContainerMode} from "../ugyfel/ugyfelcontainermode";
import {MeContainerMode} from "../me/mecontainermode";
import {AfakulcsContainerMode} from "../afakulcs/afakulcscontainermode";
import {TermekdijContainerMode} from "../termekdij/termekdijcontainermode";
import {CikkContainerMode} from "../cikk/cikkcontainermode";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _controller = 'api/menu/';

  constructor(private _router: Router,
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
              private _penztarservice: PenztarService,
              private _feliratkozasservice: FeliratkozasService,
              private _particioservice: ParticioService,
              private _volumeservice: VolumeService,
              private _felhasznaloservice: FelhasznaloService,
              private _csoportservice: CsoportService) {
  }

  public AngularMenu(): Promise<AngularmenuResult> {
    const url = environment.BaseHref + this._controller + 'angularmenu';
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
      case '/teendo':
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
        this._meservice.ContainerMode = MeContainerMode.List;
        this._meservice.zoom = false;
        this._meservice.Dto = new Array<MeDto>();
        break;
      case '/afakulcs':
        this._afakulcsservice.ContainerMode = AfakulcsContainerMode.List;
        this._afakulcsservice.zoom = false;
        this._afakulcsservice.Dto = new Array<AfakulcsDto>();
        break;
      case '/termekdij':
        this._termekdijservice.ContainerMode = TermekdijContainerMode.List;
        this._termekdijservice.zoom = false;
        this._termekdijservice.Dto = new Array<TermekdijDto>();
        break;
      case '/cikk':
        this._cikkservice.ContainerMode = CikkContainerMode.List;
        this._cikkservice.zoom = false;
        this._cikkservice.Dto = new Array<CikkDto>();
        break;
      case '/helyseg':
        this._helysegservice.ContainerMode = HelysegContainerMode.List;
        this._helysegservice.zoom = false;
        this._helysegservice.Dto = new Array<HelysegDto>();
        break;
      case '/ugyfel':
        this._ugyfelservice.ContainerMode = UgyfelContainerMode.List;
        this._ugyfelservice.zoom = false;
        this._ugyfelservice.Dto = new Array<UgyfelDto>();
      break;

      case '/projekt':
        this._projektservice.Dto = new Array<ProjektDto>();
        this._projektkapcsolatservice.Dto = new Array<ProjektKapcsolatDto>();
        this._szamlazasirendservice.Dto = new Array<SzamlazasirendDto>();
        this._projektteendoservice.Dto = new Array<ProjektteendoDto>();
      break;
      case '/irat':
        this._iratservice.Dto = new Array<IratDto>();
      break;
      case '/penztar':
        this._penztarservice.ekDto.minta = '';
        this._penztarservice.Dto = new Array<PenztarDto>();
        break;
      case '/feliratkozas':
        this._feliratkozasservice.Dto = new Array<FeliratkozasDto>();
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
        this._csoportservice.zoom = false;
        this._csoportservice.Dto = new Array<CsoportDto>();
        break;
      default:
        // TODO
        break;
    }

    this._router.navigate([utvonal]);
  }
}
