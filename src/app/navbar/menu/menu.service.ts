import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularmenuResult} from './angularmenuresult';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _controller = environment.CoreRef + 'api/menu/';

  constructor(private _router: Router,
              private _httpClient: HttpClient,
              private _logonservice: LogonService) {
  }

  public async AngularMenu(): Promise<AngularmenuResult> {
    const url = this._controller + 'angularmenu';
    const body = null;

    return await lastValueFrom(
      this._httpClient.post<AngularmenuResult>(url, body, this._logonservice.httpoptions())
    );
  }

  menuclick(utvonal: string) {
    this._router.navigate([utvonal]);
  }
}
