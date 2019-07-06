import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {VolumeResult} from './volumeresult';
import {DokumentumkodByVolumeResult} from './dokumentumbyvolumeresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private readonly _controller = 'api/volume/';
  cim = 'Volume';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Read(): Promise<VolumeResult> {
    const url = environment.CoreRef + this._controller + 'read';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<VolumeResult>(url, JSON.stringify(body), options).toPromise();
  }

  public DokumentumkodByVolume(volumekod: number): Promise<DokumentumkodByVolumeResult> {
    const url = environment.CoreRef + this._controller + 'dokumentumkodbyvolume';
    const body = volumekod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumkodByVolumeResult>(url, JSON.stringify(body), options).toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    const url = environment.CoreRef + this._controller + 'getgridsettings';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ColumnSettingsResult>(url, body, options).toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    const url = environment.CoreRef + this._controller + 'getreszleteksettings';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ColumnSettingsResult>(url, body, options).toPromise();
  }
}
