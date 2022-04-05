import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../../05 Bejelentkezes/logon.service';
import {EsemenynaploResult} from './esemenynaploresult';
import {environment} from '../../../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {EsemenynaploParam} from './esemenynaploparam';

@Injectable({
  providedIn: 'root'
})
export class EsemenynaploService {
  private readonly _controller = environment.CoreRef + 'api/esemenynaplo/';
  cim = 'Korábbi tevékenység';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Select(ep: EsemenynaploParam): Promise<EsemenynaploResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<EsemenynaploResult>(url, ep, this._logonservice.httpoptions())
    );
  }
}
