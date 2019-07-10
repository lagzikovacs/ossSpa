import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from '../logon/logon.service';
import {AngularmenuResult} from './angularmenuresult';
import {Router} from '@angular/router';
import {ProjektService} from '../projekt/projekt.service';
import {ProjektDto} from '../projekt/projektdto';
import {ProjektteendoService} from '../projektteendo/projektteendo.service';
import {ProjektteendoDto} from '../projektteendo/projektteendodto';
import {PlatformLocation} from '@angular/common';
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
              private _projektservice: ProjektService,
              private _projektteendoservice: ProjektteendoService,
              private _bizonylatservice: BizonylatService,
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
        break;
      case '/helyseg':
        break;
      case '/ugyfel':
      break;

      case '/projekt':
        this._projektservice.statuszszempont = 0;
        this._projektservice.teendoszempont = 0;
        this._projektservice.szempont = 0;
        this._projektservice.minta = '';

        this._projektservice.Dto = new Array<ProjektDto>();
        this._projektteendoservice.Dto = new Array<ProjektteendoDto>();
      break;
      case '/irat':
      break;
      case '/penztar':
        break;
      case '/ajanlatkeres':
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
