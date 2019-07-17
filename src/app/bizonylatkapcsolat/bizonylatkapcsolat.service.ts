import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {BizonylatKapcsolatResult} from './bizonylatkapcsolatresult';
import {environment} from '../../environments/environment';
import {BizonylatKapcsolatDto} from './bizonylatkapcsolatdto';
import {NumberResult} from '../dtos/numberresult';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatKapcsolatParam} from './bizonylatkapcsolatparam';

@Injectable({
  providedIn: 'root'
})
export class BizonylatkapcsolatService {
  private readonly _controller = environment.CoreRef + 'api/bizonylatkapcsolat/';
  cim = 'Irat';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public AddIratToBizonylat(par: BizonylatKapcsolatParam): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'addirattobizonylat', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: BizonylatKapcsolatDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(bizonylatkapcsolatkod: number): Promise<BizonylatKapcsolatResult> {
    return this._httpClient.post<BizonylatKapcsolatResult>(
      this._controller + 'get', bizonylatkapcsolatkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Select(bizonylatkod: number): Promise<BizonylatKapcsolatResult> {
    return this._httpClient.post<BizonylatKapcsolatResult>(
      this._controller + 'select', bizonylatkod, this._logonservice.httpoptions())
      .toPromise();
  }
}
