import { Injectable } from '@angular/core';
import {NumberResult} from '../dtos/numberresult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EgyszeruKeresesDto} from '../dtos/egyszerukeresesdto';
import {ZoomSources} from '../enums/zoomsources';
import {CsoportDto} from './csoportdto';
import {LogonService} from '../logon/logon.service';
import {CsoportResult} from './csoportresult';
import {EmptyResult} from '../dtos/emptyresult';
import {FelhasznaloResult} from '../primitiv/felhasznalo/felhasznaloresult';
import {LehetsegesJogResult} from './lehetsegesjogresult';
import {FelhasznaloDto} from '../primitiv/felhasznalo/felhasznalodto';
import {LehetsegesJogDto} from './lehetsegesjogdto';
import {CsoportFelhasznaloParameter} from './csoportfelhasznaloparameter';
import {CsoportJogParameter} from './csoportjogparameter';
import {JogaimResult} from './jogaimresult';
import {CsoportContainerMode} from './csoportcontainermode';
import {CsoportEgyMode} from './csoportegymode';

@Injectable({
  providedIn: 'root'
})
export class CsoportService {
  private readonly _controller = 'api/csoport/';

  cim = 'Csoport';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);

  Dto: CsoportDto[] = new Array<CsoportDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new CsoportDto();

  DtoCsoportFelhasznalo: FelhasznaloDto[] = new Array<FelhasznaloDto>();
  DtoCsoportLehetsegesJog: LehetsegesJogDto[] = new Array<LehetsegesJogDto>();

  ContainerMode = CsoportContainerMode.List;
  EgyMode = CsoportEgyMode.Reszletek;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: CsoportDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<CsoportResult> {
    const url = environment.CoreRef + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CsoportResult>(url, body, options).toPromise();
  }

  public Delete(dto: CsoportDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<CsoportResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CsoportResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<CsoportResult> {
    const url = environment.CoreRef + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<CsoportResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: CsoportDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }


  public SelectCsoportFelhasznalo(csoportkod: number): Promise<FelhasznaloResult> {
    const url = environment.CoreRef + this._controller + 'selectcsoportfelhasznalo';
    const body = csoportkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FelhasznaloResult>(url, JSON.stringify(body), options).toPromise();
  }
  public SelectCsoportJog(csoportkod: number): Promise<LehetsegesJogResult> {
    const url = environment.CoreRef + this._controller + 'selectcsoportjog';
    const body = csoportkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<LehetsegesJogResult>(url, JSON.stringify(body), options).toPromise();
  }

  public CsoportFelhasznaloBeKi(par: CsoportFelhasznaloParameter): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'csoportfelhasznalobeki';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }
  public CsoportJogBeKi(par: CsoportJogParameter): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'csoportjogbeki';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Jogaim(): Promise<JogaimResult> {
    const url = environment.CoreRef + this._controller + 'jogaim';
    const body = null;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<JogaimResult>(url, body, options).toPromise();
  }
}
