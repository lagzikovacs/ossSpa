import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {EgyszeruKeresesDto} from '../dtos/egyszerukeresesdto';
import {VolumeDto} from '../dtos/volume/volumedto';
import {ZoomSources} from '../enums/zoomsources';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from './segedeszkosz/logon.service';
import {VolumeResult} from '../dtos/volume/volumeresult';
import {DokumentumkodByVolumeResult} from '../dtos/volume/dokumentumbyvolumeresult';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private readonly _controller = 'api/volume/';

  cim = 'Volume';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: VolumeDto[] = new Array<VolumeDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new VolumeDto();

  dbv: number[] = new Array<number>();
  eppTesztel = false;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Read(): Promise<VolumeResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<VolumeResult>(url, JSON.stringify(body), options).toPromise();
  }

  public DokumentumkodByVolume(volumekod: number): Promise<DokumentumkodByVolumeResult> {
    const url = environment.BaseHref + this._controller + 'dokumentumkodbyvolume';
    const body = volumekod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumkodByVolumeResult>(url, JSON.stringify(body), options).toPromise();
  }
}
