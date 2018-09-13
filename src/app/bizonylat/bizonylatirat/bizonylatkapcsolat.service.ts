import { Injectable } from '@angular/core';
import {LogonService} from '../../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BizonylatKapcsolatResult} from './bizonylatkapcsolatresult';
import {environment} from '../../../environments/environment';
import {BizonylatKapcsolatDto} from './bizonylatkapcsolatdto';

@Injectable({
  providedIn: 'root'
})
export class BizonylatkapcsolatService {
  private readonly _controller = 'api/bizonylatkapcsolat/';

  Dto = new Array<BizonylatKapcsolatDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new BizonylatKapcsolatDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(bizonylatkod: number): Promise<BizonylatKapcsolatResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatKapcsolatResult>(url, body, options).toPromise();
  }
}
