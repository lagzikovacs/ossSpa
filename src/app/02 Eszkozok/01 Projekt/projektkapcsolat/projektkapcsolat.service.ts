import { Injectable } from '@angular/core';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {ProjektKapcsolatResult} from './projektkapcsolatresult';
import {environment} from '../../../../environments/environment';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ProjektKapcsolatParam} from './projektkapcsolatparam';
import {EmptyResult} from '../../../common/dtos/emptyresult';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjektkapcsolatService {
  private readonly _controller = environment.CoreRef + 'api/projektkapcsolat/';
  cim = 'Bizonylat és irat';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Get(projektkapcsolatkod: number): Promise<ProjektKapcsolatResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<ProjektKapcsolatResult>(url, projektkapcsolatkod, this._logonservice.httpoptions())
    );
  }

  public async Delete(projektkapcsolatkod: number): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, projektkapcsolatkod, this._logonservice.httpoptions())
    );
  }

  public async Select(projektkod: number): Promise<ProjektKapcsolatResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<ProjektKapcsolatResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async SelectForUgyfelter(projektkod: number): Promise<ProjektKapcsolatResult> {
    const url = this._controller + 'selectforugyfelter';

    return await lastValueFrom(
      this._httpClient.post<ProjektKapcsolatResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async SelectByBizonylat(bizonylatkod: number): Promise<ProjektKapcsolatResult> {
    const url = this._controller + 'selectbybizonylat';

    return await lastValueFrom(
      this._httpClient.post<ProjektKapcsolatResult>(url, bizonylatkod, this._logonservice.httpoptions())
    );
  }

  public async SelectByIrat(iratkod: number): Promise<ProjektKapcsolatResult> {
    const url = this._controller + 'selectbyirat';

    return await lastValueFrom(
      this._httpClient.post<ProjektKapcsolatResult>(url, iratkod, this._logonservice.httpoptions())
    );
  }

  public async AddBizonylatToProjekt(pkp: ProjektKapcsolatParam): Promise<NumberResult> {
    const url = this._controller + 'addbizonylattoprojekt';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, pkp, this._logonservice.httpoptions())
    );
  }

  public async AddIratToProjekt(pkp: ProjektKapcsolatParam): Promise<NumberResult> {
    const url = this._controller + 'addirattoprojekt';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, pkp, this._logonservice.httpoptions())
    );
  }

  public async UjBizonylatToProjekt(pkp: ProjektKapcsolatParam): Promise<NumberResult> {
    const url = this._controller + 'ujbizonylattoprojekt';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, pkp, this._logonservice.httpoptions())
    );
  }
}
