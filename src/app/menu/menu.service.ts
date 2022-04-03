import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {AngularmenuResult} from './angularmenuresult';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {VagolapService} from '../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapMode} from '../05 Segedeszkozok/08 Vagolap/vagolapmode';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _controller = environment.CoreRef + 'api/menu/';

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
    return this._httpClient.post<AngularmenuResult>(
      this._controller + 'angularmenu', '', this._logonservice.httpoptions())
      .toPromise();
  }

  menuclick(utvonal: string) {
    switch (utvonal) {
      case '/vagolap':
        this._vagolapservice.Mode = VagolapMode.List;
        break;
      default:
        break;
    }

    this._router.navigate([utvonal]);
  }
}
