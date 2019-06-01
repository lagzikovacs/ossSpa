import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {EgyszeruKeresesDto} from '../dtos/egyszerukeresesdto';
import {VolumeDto} from './volumedto';
import {ZoomSources} from '../enums/zoomsources';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LogonService} from '../logon/logon.service';
import {VolumeResult} from './volumeresult';
import {DokumentumkodByVolumeResult} from './dokumentumbyvolumeresult';
import {VolumeContainerMode} from './volumecontainermode';
import {VolumeEgyMode} from './volumeegymode';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private readonly _controller = 'api/volume/';

  cim = 'Volume';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);

  Dto: VolumeDto[] = new Array<VolumeDto>();
  DtoSelectedIndex = -1;
  DtoEdited = new VolumeDto();

  dbv: number[] = new Array<number>();
  eppTesztel = false;

  ContainerMode = VolumeContainerMode.List;
  EgyMode = VolumeEgyMode.Reszletek;

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
}
