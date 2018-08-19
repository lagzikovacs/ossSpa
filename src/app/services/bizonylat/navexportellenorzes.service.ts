import { Injectable } from '@angular/core';
import {LogonService} from '../segedeszkosz/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NavfeltoltesDto} from '../../dtos/bizonylat/navfeltoltesdto';
import {ZoomSources} from '../../enums/zoomsources';
import {environment} from '../../../environments/environment';
import {NavfeltoltesParameter} from '../../dtos/bizonylat/navfeltoltesparameter';
import {NavfeltoltesResult} from '../../dtos/bizonylat/navfeltoltesresult';

@Injectable({
  providedIn: 'root'
})
export class NavexportellenorzesService {
  private readonly _controller = 'api/navexportellenorzes/';

  cim = 'NAV export ellenőrzése';
  szempont = 0;
  minta = '';
  up = new NavfeltoltesParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: NavfeltoltesDto[] = new Array<NavfeltoltesDto>();
  DtoSelectedIndex = -1;
  DtoEdited = new NavfeltoltesDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(np: NavfeltoltesParameter): Promise<NavfeltoltesResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = np;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NavfeltoltesResult>(url, body, options).toPromise();
  }
}
