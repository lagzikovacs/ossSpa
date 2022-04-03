import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {AjanlatParamResult} from './ajanlatparamresult';
import {AjanlatParam} from './ajanlatparam';
import {NumberResult} from '../common/dtos/numberresult';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AjanlatService {
  private readonly _controller = environment.CoreRef + 'api/ajanlat/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNew(): Promise<AjanlatParamResult> {
    return this._httpClient.post<AjanlatParamResult>(
      this._controller + 'createnew', null, this._logonservice.httpoptions())
      .toPromise();
  }

  public AjanlatKeszites(ap: AjanlatParam): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'ajanlatkeszites', ap, this._logonservice.httpoptions())
      .toPromise();
  }

  public AjanlatCalc(ap: AjanlatParam): Promise<AjanlatParamResult> {
    return this._httpClient.post<AjanlatParamResult>(
      this._controller + 'ajanlatcalc', ap, this._logonservice.httpoptions())
      .toPromise();
  }
}
