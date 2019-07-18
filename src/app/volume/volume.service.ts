import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {VolumeResult} from './volumeresult';
import {DokumentumkodByVolumeResult} from './dokumentumbyvolumeresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private readonly _controller = environment.CoreRef + 'api/volume/';
  cim = 'Volume';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Read(): Promise<VolumeResult> {
    return this._httpClient.post<VolumeResult>(
      this._controller + 'read', JSON.stringify(''), this._logonservice.httpoptions())
      .toPromise();
  }

  public DokumentumkodByVolume(volumekod: number): Promise<DokumentumkodByVolumeResult> {
    return this._httpClient.post<DokumentumkodByVolumeResult>(
      this._controller + 'dokumentumkodbyvolume', JSON.stringify(volumekod), this._logonservice.httpoptions())
      .toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getgridsettings', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getreszleteksettings', '', this._logonservice.httpoptions())
      .toPromise();
  }
}
