import { Injectable } from '@angular/core';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {AjanlatParamResult} from './ajanlatparamresult';
import {AjanlatParam} from './ajanlatparam';
import {NumberResult} from '../../../common/dtos/numberresult';
import {environment} from '../../../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjanlatService {
  private readonly _controller = environment.CoreRef + 'api/ajanlat/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async CreateNew(): Promise<AjanlatParamResult> {
    const url = this._controller + 'createnew';

    return await lastValueFrom(
      this._httpClient.post<AjanlatParamResult>(url, null, this._logonservice.httpoptions())
    );
  }

  public async AjanlatKeszites(ap: AjanlatParam): Promise<NumberResult> {
    const url = this._controller + 'ajanlatkeszites';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, ap, this._logonservice.httpoptions())
    );
  }

  public async AjanlatCalc(ap: AjanlatParam): Promise<AjanlatParamResult> {
    const url = this._controller + 'ajanlatcalc';

    return await lastValueFrom(
      this._httpClient.post<AjanlatParamResult>(url, ap, this._logonservice.httpoptions())
    );
  }
}
