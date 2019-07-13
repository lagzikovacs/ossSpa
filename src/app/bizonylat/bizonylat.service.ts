import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BizonylatComplexResult} from './bizonylatcomplexresult';
import {BizonylatTipus} from './bizonylattipus';
import {BizonylatDto} from './bizonylatdto';
import {BizonylatTipusLeiroResult} from './bizonylattipusleiroresult';
import {EmptyResult} from '../dtos/emptyresult';
import {BizonylatParameter} from './bizonylatparameter';
import {BizonylatResult} from './bizonylatresult';
import {BizonylatTetelDto} from './bizonylatteteldto';
import {NumberResult} from '../dtos/numberresult';
import {BizonylatMintaAlapjanParam} from './bizonylatmintaalapjan';
import {StringResult} from '../dtos/stringresult';
import {BizonylatKibocsatasParam} from './bizonylatkibocsatasparam';
import {BizonylatComplexDto} from './bizonylatcomplexdto';
import {BizonylatSzerkesztesMode} from './bizonylatszerkesztesmode';
import {BizonylattetelSzerkesztesMode} from './bizonylattetelszerkesztesmode';
import {BizonylatTetelResult} from './bizonylattetelresult';
import {BruttobolParam} from './bruttobolparam';

@Injectable({
  providedIn: 'root'
})
export class BizonylatService {
  private readonly _controller = 'api/bizonylat/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public BizonylatLeiro(bt: BizonylatTipus): Promise<BizonylatTipusLeiroResult> {
    const url = environment.CoreRef + this._controller + 'bizonylatleiro';
    const body = bt;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatTipusLeiroResult>(url, body, options).toPromise();
  }

  public CreateNewComplex(): Promise<BizonylatComplexResult> {
    const url = environment.CoreRef + this._controller + 'createnewcomplex';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatComplexResult>(url, body, options).toPromise();
  }

  public Delete(dto: BizonylatDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(bizonylatkod: number): Promise<BizonylatResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = bizonylatkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatResult>(url, body, options).toPromise();
  }

  public GetComplex(bizonylatkod: number): Promise<BizonylatComplexResult> {
    const url = environment.CoreRef + this._controller + 'getcomplex';
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
    const url = environment.CoreRef + this._controller + 'select';
    const body = bp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatResult>(url, body, options).toPromise();
  }

  public UjBizonylatMintaAlapjan(par: BizonylatMintaAlapjanParam): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'ujbizonylatmintaalapjan';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public SzamlaFormaiEllenorzese(bizonylatKod: number): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'szamlaformaiellenorzese';
    const body = bizonylatKod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public LetoltesOnlineszamlaFormatumban(bizonylatKod: number): Promise<StringResult> {
    const url = environment.CoreRef + this._controller + 'letoltesonlineszamlaformatumban';
    const body = bizonylatKod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<StringResult>(url, body, options).toPromise();
  }

  public KifizetesRendben(dto: BizonylatDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'kifizetesrendben';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Kiszallitva(dto: BizonylatDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'kiszallitva';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Storno(dto: BizonylatDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'storno';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public Kibocsatas(par: BizonylatKibocsatasParam): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'kibocsatas';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public BizonylattetelCalc(dto: BizonylatTetelDto): Promise<BizonylatTetelResult> {
    const url = environment.CoreRef + this._controller + 'bizonylattetelcalc';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatTetelResult>(url, body, options).toPromise();
  }

  public Bruttobol(par: BruttobolParam): Promise<BizonylatTetelResult> {
    const url = environment.CoreRef + this._controller + 'bruttobol';
    const body = par;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatTetelResult>(url, body, options).toPromise();
  }

  public CreateNewTetel(bt: BizonylatTipus): Promise<BizonylatTetelResult> {
    const url = environment.CoreRef + this._controller + 'createnewtetel';
    const body = bt;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatTetelResult>(url, body, options).toPromise();
  }

  public SumEsAfaEsTermekdij(dto: BizonylatComplexDto): Promise<BizonylatComplexResult> {
    const url = environment.CoreRef + this._controller + 'sumesafaestermekdij';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<BizonylatComplexResult>(url, body, options).toPromise();
  }

  public Save(dto: BizonylatComplexDto): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'save';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
