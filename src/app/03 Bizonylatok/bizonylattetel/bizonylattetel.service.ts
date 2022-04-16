import { Injectable } from '@angular/core';
import {BizonylatTetelResult} from './bizonylattetelresult';
import {BruttobolParam} from './bruttobolparam';
import {BizonylatTetelDto} from './bizonylatteteldto';
import {environment} from '../../../environments/environment';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BizonylattetelService {
  private readonly _controller = environment.CoreRef + 'api/bizonylat/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public BizonylattetelCalc(dto: BizonylatTetelDto): Promise<BizonylatTetelResult> {
    return this._httpClient.post<BizonylatTetelResult>(
      this._controller + 'bizonylattetelcalc', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Bruttobol(par: BruttobolParam): Promise<BizonylatTetelResult> {
    return this._httpClient.post<BizonylatTetelResult>(
      this._controller + 'bruttobol', par, this._logonservice.httpoptions())
      .toPromise();
  }
}
