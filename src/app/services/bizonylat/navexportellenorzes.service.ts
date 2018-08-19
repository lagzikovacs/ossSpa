import { Injectable } from '@angular/core';
import {LogonService} from '../segedeszkosz/logon.service';
import {HttpClient} from '@angular/common/http';
import {NavfeltoltesDto} from '../../dtos/bizonylat/navfeltoltesdto';
import {ZoomSources} from '../../enums/zoomsources';
import {environment} from '../../../environments/environment';
import {NavfeltoltesParameter} from '../../dtos/bizonylat/navfeltoltesparameter';

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
}
