import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NumberResult} from '../dtos/numberresult';
import {FelhasznaloDto} from './felhasznalodto';
import {environment} from '../../environments/environment';
import {LogonService} from '../logon/logon.service';
import {FelhasznaloResult} from './felhasznaloresult';
import {EmptyResult} from '../dtos/emptyresult';
import {EgyszeruKeresesDto} from '../dtos/egyszerukeresesdto';
import {ZoomSources} from '../enums/zoomsources';
import {Md5} from 'ts-md5';
import {JelszocsereParameter} from './jelszocsereparameter';
import {FelhasznaloEgyMode} from './felhasznaloegymode';
import {FelhasznaloContainerMode} from './felhasznalocontainermode';

@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {
  private readonly _controller = 'api/felhasznalo/';

  cim = 'Felhasználó';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);

  Dto: FelhasznaloDto[] = new Array<FelhasznaloDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new FelhasznaloDto();

  ContainerMode = FelhasznaloContainerMode.List;
  EgyMode = FelhasznaloEgyMode.Reszletek;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: FelhasznaloDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<FelhasznaloResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FelhasznaloResult>(url, body, options).toPromise();
  }

  public Delete(dto: FelhasznaloDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<FelhasznaloResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FelhasznaloResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<FelhasznaloResult> {
    const url = environment.CoreRef + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FelhasznaloResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: FelhasznaloDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public JelszoBeallitas(FelhasznaloKod: number, Jelszo: string, UtolsoModositas: any): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'jelszobeallitas';
    const body = new JelszocsereParameter(FelhasznaloKod, '', Md5.hashStr(Jelszo).toString(), UtolsoModositas);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public JelszoCsere(RegiJelszo: string, UjJelszo: string): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'jelszocsere';
    const body = new JelszocsereParameter(0, Md5.hashStr(RegiJelszo).toString(), Md5.hashStr(UjJelszo).toString(), null);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
}
