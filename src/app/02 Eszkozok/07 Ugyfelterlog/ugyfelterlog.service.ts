import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ColumnSettings} from "../../common/reszletek/columnsettings";
import {HttpClient} from "@angular/common/http";
import {LogonService} from "../../05 Segedeszkozok/05 Bejelentkezes/logon.service";
import {UgyfelterlogParam} from "./ugyfelterlogparam";
import {UgyfelterlogResult} from "./ugyfelterlogresult";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UgyfelterlogService {
  private readonly _controller = environment.CoreRef + 'api/ugyfelterlog/';
  cim = 'Ügyféltér log';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Select(ulp: UgyfelterlogParam): Promise<UgyfelterlogResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<UgyfelterlogResult>(url, ulp, this._logonservice.httpoptions())
    );
  }
}
