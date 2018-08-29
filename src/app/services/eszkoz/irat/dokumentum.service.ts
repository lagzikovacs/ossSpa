import { Injectable } from '@angular/core';
import {LogonService} from '../../logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {DokumentumResult} from '../../../dtos/dokumentum/dokumentumresult';
import {DokumentumDto} from '../../../dtos/dokumentum/dokumentumdto';
import {EmptyResult} from '../../../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class DokumentumService {
  private readonly _controller = 'api/dokumentum/';

  cim = 'Dokumentum';

  Dto: DokumentumDto[] = new Array<DokumentumDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new DokumentumDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(iratkod: number): Promise<DokumentumResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = JSON.stringify(iratkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumResult>(url, body, options).toPromise();
  }

  public Ellenorzes(dokumentumkod: number): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'ellenorzes';
    const body = JSON.stringify(dokumentumkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
