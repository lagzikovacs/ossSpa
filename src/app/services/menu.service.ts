import { Injectable } from '@angular/core';
import {AngularmenuDto} from '../dtos/menu/angularmenudto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from './logon.service';
import {AngularmenuResult} from '../dtos/menu/angularmenuresult';
import {Router} from '@angular/router';
import {IrattipusService} from './irattipus.service';
import {IrattipusDto} from '../dtos/primitiv/irattipus/irattipusdto';
import {HelysegService} from './helyseg.service';
import {HelysegDto} from '../dtos/primitiv/helyseg/helysegdto';
import {UgyfelService} from './ugyfel.service';
import {UgyfelDto} from '../dtos/ugyfel/ugyfeldto';
import {FelhasznaloDto} from '../dtos/primitiv/felhasznalo/felhasznalodto';
import {FelhasznaloService} from './felhasznalo.service';
import {CsoportService} from './csoport.service';
import {VolumeService} from './volume.service';
import {VolumeDto} from '../dtos/volume/volumedto';
import {CsoportDto} from '../dtos/csoport/csoportdto';
import {ProjektService} from './projekt.service';
import {IratService} from './irat.service';
import {FeliratkozasService} from './feliratkozas.service';
import {IratDto} from '../dtos/irat/iratdto';
import {ProjektDto} from '../dtos/projekt/projektdto';
import {FeliratkozasDto} from '../dtos/feliratkozas/feliratkozasdto';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _controller = 'api/menu/';

  constructor(private _router: Router,
              private _httpClient: HttpClient,
              private _logonservice: LogonService,
              private _irattipusservice: IrattipusService,
              private _helysegservice: HelysegService,
              private _ugyfelservice: UgyfelService,
              private _projektservice: ProjektService,
              private _iratservice: IratService,
              private _feliratkozasservice: FeliratkozasService,
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
      case '/helyseg':
        this._helysegservice.zoom = false;
        this._helysegservice.Dto = new Array<HelysegDto>();
        break;
      case '/ugyfel':
        this._ugyfelservice.zoom = false;
        this._ugyfelservice.Dto = new Array<UgyfelDto>();
      break;
      case '/projekt':
        this._projektservice.Dto = new Array<ProjektDto>();
      break;
      case '/irat':
        this._iratservice.Dto = new Array<IratDto>();
      break;
      case '/feliratkozas':
        this._feliratkozasservice.Dto = new Array<FeliratkozasDto>();
      break;
      case '/volume':
        this._volumeservice.zoom = false;
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
