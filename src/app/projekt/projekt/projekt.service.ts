import { Injectable } from '@angular/core';
import {LogonService} from '../../services/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProjektDto} from '../../dtos/projekt/projektdto';
import {ProjektParameter} from '../../dtos/projekt/projektparameter';
import {environment} from '../../../environments/environment';
import {ProjektResult} from '../../dtos/projekt/projektresult';
import {IratmintaResult} from '../../dtos/projekt/iratmintaresult';
import {NumberResult} from '../../dtos/numberresult';
import {ProjektContainerMode} from "./projektcontainermode";
import {ProjektSzerkesztesMode} from "./projektszerkesztesmode";
import {ProjektEgyMode} from "./projektegymode";

@Injectable({
  providedIn: 'root'
})
export class ProjektService {
  private readonly _controller = 'api/projekt/';

  cim = 'Projekt';
  statuszszempont = 0;
  teendoszempont = 0;
  szempont = 0;
  minta = '';
  pp = new ProjektParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;
  Dto: ProjektDto[] = new Array<ProjektDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new ProjektDto();

  ContainerMode = ProjektContainerMode.List;
  EgyMode = ProjektEgyMode.Reszletek;
  SzerkesztesMode = ProjektSzerkesztesMode.Blank;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: ProjektDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<ProjektResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<ProjektResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektResult>(url, body, options).toPromise();
  }

  public Select(pp: ProjektParameter): Promise<ProjektResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = pp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektResult>(url, body, options).toPromise();
  }

  public Update(dto: ProjektDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }


  public Szerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'szerzodes';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Szallitasiszerzodes(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'szallitasiszerzodes';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Munkalap(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'munkalap';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public Elegedettseg(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'elegedettseg';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public KeszrejelentesDemasz(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'keszrejelentesdemasz';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public KeszrejelentesElmuEmasz(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'keszrejelenteselmuemasz';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
  public KeszrejelentesEon(projektkod: number): Promise<IratmintaResult> {
    const url = environment.BaseHref + this._controller + 'keszrejelenteseon';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<IratmintaResult>(url, body, options).toPromise();
  }
}
