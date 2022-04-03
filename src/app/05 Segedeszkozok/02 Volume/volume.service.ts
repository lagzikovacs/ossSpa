import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {VolumeResult} from './volumeresult';
import {DokumentumkodByVolumeResult} from './dokumentumbyvolumeresult';
import {lastValueFrom} from 'rxjs';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';
import {LogonService} from '../../logon/logon.service';
import {ColumnSettingsResult} from '../../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private readonly _controller = environment.CoreRef + 'api/volume/';
  cim = 'Volume';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Read(): Promise<VolumeResult> {
    const url = this._controller + 'read';

    return await lastValueFrom(
      this._httpClient.post<VolumeResult>(url, JSON.stringify(''), this._logonservice.httpoptions())
    );
  }

  public async DokumentumkodByVolume(volumekod: number): Promise<DokumentumkodByVolumeResult> {
    const url = this._controller + 'dokumentumkodbyvolume';

    return await lastValueFrom(
      this._httpClient.post<DokumentumkodByVolumeResult>(url, JSON.stringify(volumekod), this._logonservice.httpoptions())
    );
  }

  public async GetGridSettings(): Promise<ColumnSettingsResult> {
    const url = this._controller + 'getgridsettings';

    return await lastValueFrom(
      this._httpClient.post<ColumnSettingsResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async GetReszletekSettings(): Promise<ColumnSettingsResult> {
    const url = this._controller + 'getreszleteksettings';

    return await lastValueFrom(
      this._httpClient.post<ColumnSettingsResult>(url, '', this._logonservice.httpoptions())
    );
  }
}
