import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {UgyfelterlogParameter} from './ugyfelterlogparameter';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {UgyfelterlogResult} from './ugyfelterlogresult';
import {ColumnSettings} from '../common/reszletek/columnsettings';

@Injectable({
  providedIn: 'root'
})
export class UgyfelterlogService {
  private readonly _controller = environment.CoreRef + 'api/ugyfelterlog/';
  cim = 'Ügyféltér log';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(ulp: UgyfelterlogParameter): Promise<UgyfelterlogResult> {
    return this._httpClient.post<UgyfelterlogResult>(
      this._controller + 'select', ulp, this._logonservice.httpoptions())
      .toPromise();
  }
}
