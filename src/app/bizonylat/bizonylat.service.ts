import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BizonylatComplexResult} from './bizonylatcomplexresult';
import {BizonylatTipus} from './bizonylattipus';
import {BizonylatDto} from './bizonylatdto';
import {BizonylatContainerMode} from './bizonylatcontainermode';
import {BizonylatTipusLeiroResult} from './bizonylattipusleiroresult';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatTipusLeiro} from './bizonylattipusleiro';
import {BizonylatParameter} from './bizonylatparameter';
import {BizonylatResult} from './bizonylatresult';
import {BizonylatTermekdijDto} from './bizonylattermekdijdto';
import {BizonylatAfaDto} from './bizonylatafadto';
import {BizonylatTetelDto} from './bizonylatteteldto';
import {BizonylatEgyMode} from './bizonylategymode';
import {NumberResult} from '../dtos/numberresult';
import {BizonylatMintaAlapjanParam} from './bizonylatmintaalapjan';
import {StringResult} from '../dtos/stringresult';
import {BizonylatKibocsatasParam} from './bizonylatkibocsatasparam';
import {PenztarDto} from '../penztar/penztardto';
import {BizonylatComplexDto} from './bizonylatcomplexdto';
import {BizonylatSzerkesztesMode} from "./bizonylatszerkesztesmode";

@Injectable({
  providedIn: 'root'
})
export class BizonylatService {
  private readonly _controller = 'api/bizonylat/';

  bizonylatTipus = BizonylatTipus.Szamla;
  bizonylatLeiro = new BizonylatTipusLeiro();

  Dto = new Array<BizonylatDto>();
  DtoSelectedIndex = -1;

  // ezek csak a részletek megjelenítéséhez kellenek
  TetelDto = new Array<BizonylatTetelDto>();
  AfaDto = new Array<BizonylatAfaDto>();
  TermekdijDto = new Array<BizonylatTermekdijDto>();

  ComplexDtoEdited = new BizonylatComplexDto();
  DtoTetelSelectedIndex = -1;

  uj = false;
  DtoEdited = new BizonylatDto();
  szempont = 0;
  minta = '';
  bp = new BizonylatParameter(0, environment.lapmeret);
  OsszesRekord = 0;
  elsokereses = true;

  ContainerMode = BizonylatContainerMode.List;
  EgyMode = BizonylatEgyMode.Reszletek;
  SzerkesztesMode = BizonylatSzerkesztesMode.List;

  BizonylatPenztarDto = new Array<PenztarDto>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public BizonylatLeiro(bt: BizonylatTipus): Promise<BizonylatTipusLeiroResult> {
    const url = environment.BaseHref + this._controller + 'bizonylatleiro';
    const body = bt;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatTipusLeiroResult>(url, body, options).toPromise();
  }

  public GetBizonylatLeiro(): Promise<EmptyResult> {
    this.bizonylatLeiro = new BizonylatTipusLeiro();

    return this.BizonylatLeiro(this.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatLeiro = res.Result;

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public CreateNewComplex(): Promise<BizonylatComplexResult> {
    const url = environment.BaseHref + this._controller + 'createnewcomplex';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatComplexResult>(url, body, options).toPromise();
  }

  public Delete(dto: BizonylatDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(bizonylatkod: number): Promise<BizonylatResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatResult>(url, body, options).toPromise();
  }

  public GetComplex(bizonylatkod: number): Promise<BizonylatComplexResult> {
    const url = environment.BaseHref + this._controller + 'getcomplex';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatComplexResult>(url, body, options).toPromise();
  }

  public GetGetComplex(bizonylatkod: number): Promise<EmptyResult> {
    return this.GetComplex(bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public Select(bp: BizonylatParameter): Promise<BizonylatResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = bp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatResult>(url, body, options).toPromise();
  }

  public UjBizonylatMintaAlapjan(par: BizonylatMintaAlapjanParam): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'ujbizonylatmintaalapjan';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public SzamlaTartalmiEllenorzese(bizonylatKod: number): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'szamlatartalmiellenorzese';
    const body = bizonylatKod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public LetoltesOsnxmlFormatumban(bizonylatKod: number): Promise<StringResult> {
    const url = environment.BaseHref + this._controller + 'letoltesosnxmlformatumban';
    const body = bizonylatKod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public KifizetesRendben(dto: BizonylatDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'kifizetesrendben';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Kiszallitva(dto: BizonylatDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'kiszallitva';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Storno(dto: BizonylatDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'storno';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Kibocsatas(par: BizonylatKibocsatasParam): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'kibocsatas';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
