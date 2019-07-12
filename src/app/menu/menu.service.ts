import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from '../logon/logon.service';
import {AngularmenuResult} from './angularmenuresult';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
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
      break;
      case '/irat':
      break;
      case '/penztar':
        break;
      case '/ajanlatkeres':
      break;


      case '/bizonylat/dijbekero':
        break;
      case '/bizonylat/elolegszamla':
        break;
      case '/bizonylat/szallito':
        break;
      case '/bizonylat/szamla':
        break;
      case '/bizonylat/megrendeles':
        break;
      case '/bizonylat/bejovoszamla':
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
