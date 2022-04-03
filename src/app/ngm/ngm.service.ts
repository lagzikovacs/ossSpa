import { Injectable } from '@angular/core';
import {StringResult} from '../common/dtos/stringresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NGMParam} from './ngmparam';
import {LogonService} from '../logon/logon.service';

@Injectable({
  providedIn: 'root'
})
export class NgmService {
  private readonly _controller = environment.CoreRef + 'api/ngm/';
  cim = 'Adóhatósági ellenőrzési adatszolgáltatás';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Adatszolgaltatas(np: NGMParam): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'adatszolgaltatas', np, this._logonservice.httpoptions())
      .toPromise();
  }
}
