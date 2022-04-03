import { Injectable } from '@angular/core';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {RiportResult} from './riportresult';
import {environment} from '../../environments/environment';
import {EmptyResult} from '../common/dtos/emptyresult';
import {StringResult} from '../common/dtos/stringresult';
import {SzMT} from '../common/dtos/szmt';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiportService {
  private readonly _controller = environment.CoreRef + 'api/riport/';
  cim = 'Riport';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async TaskCheck(taskToken: string): Promise<RiportResult> {
    const url = this._controller + 'taskcheck';

    return await lastValueFrom(
      this._httpClient.post<RiportResult>(url, JSON.stringify(taskToken), this._logonservice.httpoptions())
    );
  }
  public async TaskCancel(taskToken: string): Promise<EmptyResult> {
    const url = this._controller + 'taskcancel';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, JSON.stringify(taskToken), this._logonservice.httpoptions())
    );
  }


  public async KimenoSzamlaTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'kimenoszamlataskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }
  public async BejovoSzamlaTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'bejovoszamlataskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }


  public async KovetelesekTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'kovetelesektaskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }
  public async TartozasokTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'tartozasoktaskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }


  public async BeszerzesTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'beszerzestaskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }
  public async KeszletTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'keszlettaskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, fi, this._logonservice.httpoptions())
    );
  }


  public async PenztarTetelTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'penztarteteltaskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(
        url, fi, this._logonservice.httpoptions())
    );
  }
  public async ProjektTaskStart(fi: SzMT[]): Promise<StringResult> {
    const url = this._controller + 'projekttaskstart';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(
        url, fi, this._logonservice.httpoptions())
    );
  }
}
