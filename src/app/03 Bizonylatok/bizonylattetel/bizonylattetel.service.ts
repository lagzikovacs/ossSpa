import { Injectable } from '@angular/core';
import {BizonylatTetelResult} from './bizonylattetelresult';
import {BruttobolParam} from './bruttobolparam';
import {BizonylatTetelDto} from './bizonylatteteldto';
import {environment} from '../../../environments/environment';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {BizonylatTipus} from '../bizonylat/bizonylattipus';

@Injectable({
  providedIn: 'root'
})
export class BizonylattetelService {
  private readonly _controller = environment.CoreRef + 'api/bizonylat/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async CreateNewTetel(bt: BizonylatTipus): Promise<BizonylatTetelResult> {
    const url = this._controller + 'createnewtetel';

    return await lastValueFrom(
      this._httpClient.post<BizonylatTetelResult>(url, bt, this._logonservice.httpoptions())
    );
  }

  public async BizonylattetelCalc(dto: BizonylatTetelDto): Promise<BizonylatTetelResult> {
    const url = this._controller + 'bizonylattetelcalc';

    return await lastValueFrom(
      this._httpClient.post<BizonylatTetelResult>(url, this._logonservice.httpoptions())
    );
  }

  public async Bruttobol(par: BruttobolParam): Promise<BizonylatTetelResult> {
    const url = this._controller + 'bruttobol';

    return await lastValueFrom(
      this._httpClient.post<BizonylatTetelResult>(url, par, this._logonservice.httpoptions())
    );
  }
}
