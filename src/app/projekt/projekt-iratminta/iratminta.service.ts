import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../../logon/logon.service';
import {IratmintaResult} from '../iratmintaresult';
import {environment} from '../../../environments/environment';

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

  public OFTszerzodes(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'oftszerzodes', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public HMKEtulajdonoshozzajarulas(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'hmketulajdonoshozzajarulas', projektkod, this._logonservice.httpoptions())
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

  public KeszrejelentesMvm(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'keszrejelentesmvm', projektkod, this._logonservice.httpoptions())
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


  public KeszrejelentesEonelmu(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'keszrejelenteseonelmu', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }
  public KeszrejelentesMvmemasz(projektkod: number): Promise<IratmintaResult> {
    return this._httpClient.post<IratmintaResult>(
      this._controller + 'keszrejelentesmvmemasz', projektkod, this._logonservice.httpoptions())
      .toPromise();
  }
}
