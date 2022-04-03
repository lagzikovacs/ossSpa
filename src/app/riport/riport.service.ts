import { Injectable } from '@angular/core';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {RiportResult} from './riportresult';
import {environment} from '../../environments/environment';
import {EmptyResult} from '../common/dtos/emptyresult';
import {StringResult} from '../common/dtos/stringresult';
import {SzMT} from '../common/dtos/szmt';

@Injectable({
  providedIn: 'root'
})
export class RiportService {
  private readonly _controller = environment.CoreRef + 'api/riport/';
  cim = 'Riport';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public TaskCheck(taskToken: string): Promise<RiportResult> {
    return this._httpClient.post<RiportResult>(
      this._controller + 'taskcheck', JSON.stringify(taskToken), this._logonservice.httpoptions())
      .toPromise();
  }
  public TaskCancel(taskToken: string): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'taskcancel', JSON.stringify(taskToken), this._logonservice.httpoptions())
      .toPromise();
  }


  public KimenoSzamlaTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'kimenoszamlataskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }
  public BejovoSzamlaTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'bejovoszamlataskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }


  public KovetelesekTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'kovetelesektaskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }
  public TartozasokTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'tartozasoktaskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }


  public BeszerzesTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'beszerzestaskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }
  public KeszletTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'keszlettaskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }


  public PenztarTetelTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'penztarteteltaskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }
  public ProjektTaskStart(fi: SzMT[]): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'projekttaskstart', fi, this._logonservice.httpoptions())
      .toPromise();
  }
}
