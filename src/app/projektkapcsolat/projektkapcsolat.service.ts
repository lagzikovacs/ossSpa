import { Injectable } from '@angular/core';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {ProjektKapcsolatResult} from './projektkapcsolatresult';
import {environment} from '../../environments/environment';
import {NumberResult} from '../common/dtos/numberresult';
import {ProjektKapcsolatParameter} from './projektkapcsolatparameter';
import {EmptyResult} from '../common/dtos/emptyresult';
import {IratResult} from '../irat/iratresult';

@Injectable({
  providedIn: 'root'
})
export class ProjektkapcsolatService {
  private readonly _controller = environment.CoreRef + 'api/projektkapcsolat/';
  cim = 'Bizonylat és irat';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Get(projektkapcsolatkod: number): Promise<ProjektKapcsolatResult> {
    return this._httpClient.post<ProjektKapcsolatResult>(
      this._controller + 'get', projektkapcsolatkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(projektkapcsolatkod: number): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', projektkapcsolatkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(projektkod: number): Promise<ProjektKapcsolatResult> {
    return this._httpClient.post<ProjektKapcsolatResult>(
      this._controller + 'select', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public SelectForUgyfelter(projektkod: number): Promise<ProjektKapcsolatResult> {
    return this._httpClient.post<ProjektKapcsolatResult>(
      this._controller + 'selectforugyfelter', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public SelectByBizonylat(bizonylatkod: number): Promise<ProjektKapcsolatResult> {
    return this._httpClient.post<ProjektKapcsolatResult>(
      this._controller + 'selectbybizonylat', bizonylatkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public SelectByIrat(iratkod: number): Promise<ProjektKapcsolatResult> {
    return this._httpClient.post<ProjektKapcsolatResult>(
      this._controller + 'selectbyirat', iratkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public AddBizonylatToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'addbizonylattoprojekt', pkp, this._logonservice.httpoptions())
      .toPromise();
  }

  public AddIratToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'addirattoprojekt', pkp, this._logonservice.httpoptions())
      .toPromise();
  }

  public UjBizonylatToProjekt(pkp: ProjektKapcsolatParameter): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'ujbizonylattoprojekt', pkp, this._logonservice.httpoptions())
      .toPromise();
  }
}
