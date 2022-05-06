import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {IratmintaResult} from '../iratmintaresult';
import {environment} from '../../../../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IratmintaService {
  private readonly _controller = environment.CoreRef + 'api/iratminta/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Szerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'szerzodes';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async Szallitasiszerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'szallitasiszerzodes';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async Feltetelesszerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'feltetelesszerzodes';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async OFTszerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'oftszerzodes';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async HMKEtulajdonoshozzajarulas(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'hmketulajdonoshozzajarulas';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async Munkalap(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'munkalap';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async Elegedettseg(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'elegedettseg';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async KeszrejelentesMvm(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'keszrejelentesmvm';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async KeszrejelentesElmuEmasz(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'keszrejelenteselmuemasz';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async KeszrejelentesEon(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'keszrejelenteseon';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }


  public async KeszrejelentesEonelmu(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'keszrejelenteseonelmu';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }

  public async KeszrejelentesMvmemasz(projektkod: number): Promise<IratmintaResult> {
    const url = this._controller + 'keszrejelentesmvmemasz';

    return await lastValueFrom(
      this._httpClient.post<IratmintaResult>(url, projektkod, this._logonservice.httpoptions())
    );
  }
}
