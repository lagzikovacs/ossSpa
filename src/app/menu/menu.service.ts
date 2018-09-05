import { Injectable } from '@angular/core';
import {AngularmenuDto} from './angularmenudto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from '../logon/logon.service';
import {AngularmenuResult} from './angularmenuresult';
import {Router} from '@angular/router';
import {IrattipusService} from '../irattipus/irattipus.service';
import {IrattipusDto} from '../irattipus/irattipusdto';
import {HelysegService} from '../helyseg/helyseg.service';
import {HelysegDto} from '../helyseg/helysegdto';
import {UgyfelService} from '../ugyfel/ugyfel.service';
import {UgyfelDto} from '../ugyfel/ugyfeldto';
import {FelhasznaloDto} from '../felhasznalo/felhasznalodto';
import {FelhasznaloService} from '../felhasznalo/felhasznalo.service';
import {CsoportService} from '../csoport/csoport.service';
import {VolumeService} from '../volume/volume.service';
import {VolumeDto} from '../volume/volumedto';
import {CsoportDto} from '../csoport/csoportdto';
import {ProjektService} from '../projekt/projekt/projekt.service';
import {IratService} from '../irat/irat/irat.service';
import {FeliratkozasService} from '../feliratkozas/feliratkozas.service';
import {IratDto} from '../irat/irat/iratdto';
import {ProjektDto} from '../projekt/projekt/projektdto';
import {FeliratkozasDto} from '../feliratkozas/feliratkozasdto';
import {TeendoService} from '../teendo/teendo.service';
import {TeendoDto} from '../teendo/teendodto';
import {FizetesimodService} from '../fizetesimod/fizetesimod.service';
import {PenznemService} from '../penznem/penznem.service';
import {FizetesimodDto} from '../fizetesimod/fizetesimoddto';
import {PenznemDto} from '../penznem/penznemdto';
import {MeService} from '../me/me.service';
import {AfakulcsService} from '../afakulcs/afakulcs.service';
import {TermekdijService} from '../termekdij/termekdij.service';
import {CikkService} from '../cikk/cikk.service';
import {MeDto} from '../me/medto';
import {AfakulcsDto} from '../afakulcs/afakulcsdto';
import {TermekdijDto} from '../termekdij/termekdijdto';
import {CikkDto} from '../cikk/cikkdto';
import {PenztarDto} from '../penztar/penztardto';
import {PenztarService} from '../penztar/penztar.service';
import {ProjektkapcsolatService} from '../projekt/bizonylatesirat/projektkapcsolat.service';
import {ProjektKapcsolatDto} from '../projekt/bizonylatesirat/projektkapcsolatdto';
import {SzamlazasirendService} from '../projekt/szamlazasirend/szamlazasirend.service';
import {ProjektteendoService} from '../projekt/teendo/projektteendo.service';
import {SzamlazasirendDto} from '../projekt/szamlazasirend/szamlazasirenddto';
import {ProjektteendoDto} from '../projekt/teendo/projektteendodto';
import {VolumeContainerMode} from '../volume/volumecontainermode';
import {ParticioService} from '../particio/particio.service';
import {ParticioEgyMode} from '../particio/particioegymode';
import {HelysegContainerMode} from '../helyseg/helysegcontainermode';
import {UgyfelContainerMode} from '../ugyfel/ugyfelcontainermode';
import {MeContainerMode} from '../me/mecontainermode';
import {AfakulcsContainerMode} from '../afakulcs/afakulcscontainermode';
import {TermekdijContainerMode} from '../termekdij/termekdijcontainermode';
import {CikkContainerMode} from '../cikk/cikkcontainermode';
import {IrattipusContainerMode} from '../irattipus/irattipuscontainermode';
import {TeendoContainerMode} from '../teendo/teendocontainermode';
import {FizetesimodContainerMode} from '../fizetesimod/fizetesimodcontainermode';
import {PenznemContainerMode} from '../penznem/penznemcontainermode';
import {FelhasznaloContainerMode} from '../felhasznalo/felhasznalocontainermode';
import {CsoportContainerMode} from '../csoport/csoportcontainermode';
import {FeliratkozasContainerMode} from '../feliratkozas/feliratkozascontainermode';
import {PenztarContainerMode} from '../penztar/penztarcontainermode';
import {IratContainerMode} from '../irat/irat/iratcontainermode';
import {ProjektContainerMode} from '../projekt/projekt/projektcontainermode';
import {PlatformLocation} from '@angular/common';
import {DokumentumService} from '../irat/dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../irat/dokumentum/dokumentumcontainermode';
import {DokumentumDto} from '../irat/dokumentum/dokumentumdto';

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
              private _feliratkozasservice: FeliratkozasService,
              private _particioservice: ParticioService,
              private _volumeservice: VolumeService,
              private _felhasznaloservice: FelhasznaloService,
              private _csoportservice: CsoportService) {
    _location.onPopState(() => {
      _router.navigate(['bejelentkezes']);
      // TODO nem a várt dolog történik, de megfelel
    });
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
        this._irattipusservice.ContainerMode = IrattipusContainerMode.List;
        this._irattipusservice.zoom = false;
        this._irattipusservice.Dto = new Array<IrattipusDto>();
        break;
      case '/teendo':
        this._teendoservice.ContainerMode = TeendoContainerMode.List;
        this._teendoservice.zoom = false;
        this._teendoservice.Dto = new Array<TeendoDto>();
        break;
      case '/fizetesimod':
        this._fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
        this._fizetesimodservice.zoom = false;
        this._fizetesimodservice.Dto = new Array<FizetesimodDto>();
        break;
      case '/penznem':
        this._penznemservice.ContainerMode = PenznemContainerMode.List;
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
      case '/feliratkozas':
        this._feliratkozasservice.ContainerMode = FeliratkozasContainerMode.List;
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
        this._felhasznaloservice.ContainerMode = FelhasznaloContainerMode.List;
        this._felhasznaloservice.zoom = false;
        this._felhasznaloservice.Dto = new Array<FelhasznaloDto>();
        break;
      case '/csoport':
        this._csoportservice.ContainerMode = CsoportContainerMode.List;
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
