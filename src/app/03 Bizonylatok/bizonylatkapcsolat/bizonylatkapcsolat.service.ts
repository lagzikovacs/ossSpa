import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {BizonylatKapcsolatResult} from './bizonylatkapcsolatresult';
import {environment} from '../../../environments/environment';
import {BizonylatKapcsolatDto} from './bizonylatkapcsolatdto';
import {NumberResult} from '../../common/dtos/numberresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {BizonylatKapcsolatParam} from './bizonylatkapcsolatparam';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BizonylatkapcsolatService {
  private readonly _controller = environment.CoreRef + 'api/bizonylatkapcsolat/';
  cim = 'Irat';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async AddIratToBizonylat(par: BizonylatKapcsolatParam): Promise<NumberResult> {
    const url = this._controller + 'addirattobizonylat';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: BizonylatKapcsolatDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(bizonylatkapcsolatkod: number): Promise<BizonylatKapcsolatResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<BizonylatKapcsolatResult>(url, bizonylatkapcsolatkod, this._logonservice.httpoptions())
    );
  }

  public async Select(bizonylatkod: number): Promise<BizonylatKapcsolatResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<BizonylatKapcsolatResult>(url, bizonylatkod, this._logonservice.httpoptions())
    );
  }
}
