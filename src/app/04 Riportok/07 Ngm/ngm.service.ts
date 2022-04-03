import { Injectable } from '@angular/core';
import {StringResult} from '../../common/dtos/stringresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NGMParam} from './ngmparam';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgmService {
  private readonly _controller = environment.CoreRef + 'api/ngm/';
  cim = 'Adóhatósági ellenőrzési adatszolgáltatás';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Adatszolgaltatas(np: NGMParam): Promise<StringResult> {
    const url = this._controller + 'adatszolgaltatas';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, np, this._logonservice.httpoptions())
    );
  }
}
