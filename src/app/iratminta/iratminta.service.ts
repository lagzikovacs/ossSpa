import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {IratmintaResult} from '../projekt/iratmintaresult';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IratmintaService {
  private readonly _controller = environment.CoreRef + 'api/iratminta/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Szerzodes(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'szerzodes', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Szallitasiszerzodes(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'szallitasiszerzodes', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Feltetelesszerzodes(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'feltetelesszerzodes', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Munkalap(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'munkalap', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Elegedettseg(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'elegedettseg', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public KeszrejelentesNkm(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'keszrejelentesnkm', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public KeszrejelentesElmuEmasz(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'keszrejelenteselmuemasz', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public KeszrejelentesEon(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'keszrejelenteseon', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }
}
