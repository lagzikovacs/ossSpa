import { Injectable } from '@angular/core';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BizonylatComplexResult} from './bizonylatcomplexresult';
import {BizonylatTipus} from './bizonylattipus';
import {BizonylatDto} from './bizonylatdto';
import {BizonylatTipusLeiroResult} from './bizonylattipusleiroresult';
import {EmptyResult} from '../common/dtos/emptyresult';
import {BizonylatParameter} from './bizonylatparameter';
import {BizonylatResult} from './bizonylatresult';
import {NumberResult} from '../common/dtos/numberresult';
import {BizonylatMintaAlapjanParam} from './bizonylatmintaalapjan';
import {BizonylatKibocsatasParam} from './bizonylatkibocsatasparam';
import {BizonylatComplexDto} from './bizonylatcomplexdto';
import {BizonylatTetelResult} from '../03 Bizonylatok/bizonylattetel/bizonylattetelresult';
import {FuvardijParam} from './fuvardijparam';
import {BizonylatZoomParameter} from './bizonylatzoomparameter';

@Injectable({
  providedIn: 'root'
})
export class BizonylatService {
  private readonly _controller = environment.CoreRef + 'api/bizonylat/';

  tipusok = [
    ['Díjbekérő', BizonylatTipus.DijBekero, false, 'DIJBEKERO'],
    ['Előlegszámla', BizonylatTipus.ElolegSzamla, false, 'ELOLEGSZAMLA'],
    ['Megrendelés', BizonylatTipus.Megrendeles, false, 'MEGRENDELES'],
    ['Szállító', BizonylatTipus.Szallito, false, 'SZALLITO'],
    ['Számla', BizonylatTipus.Szamla, false, 'SZAMLA'],
    ['Bejövő számla', BizonylatTipus.BejovoSzamla, false, 'BEJOVOSZAMLA']
  ];

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public BizonylatLeiro(bt: BizonylatTipus): Promise<BizonylatTipusLeiroResult> {
    return this._httpClient.post<BizonylatTipusLeiroResult>(
      this._controller + 'bizonylatleiro', bt, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNewComplex(): Promise<BizonylatComplexResult> {
    return this._httpClient.post<BizonylatComplexResult>(
      this._controller + 'createnewcomplex', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: BizonylatDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(bizonylatkod: number): Promise<BizonylatResult> {
    return this._httpClient.post<BizonylatResult>(
      this._controller + 'get', bizonylatkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public GetComplex(bizonylatkod: number): Promise<BizonylatComplexResult> {
    return this._httpClient.post<BizonylatComplexResult>(
      this._controller + 'getcomplex', bizonylatkod, this._logonservice.httpoptions())
      .toPromise();
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
    return this._httpClient.post<BizonylatResult>(
      this._controller + 'select', bp, this._logonservice.httpoptions())
      .toPromise();
  }

  public UjBizonylatMintaAlapjan(par: BizonylatMintaAlapjanParam): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'ujbizonylatmintaalapjan', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public KifizetesRendben(dto: BizonylatDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'kifizetesrendben', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Kiszallitva(dto: BizonylatDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'kiszallitva', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Storno(dto: BizonylatDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'storno', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Kibocsatas(par: BizonylatKibocsatasParam): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'kibocsatas', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public CreateNewTetel(bt: BizonylatTipus): Promise<BizonylatTetelResult> {
    return this._httpClient.post<BizonylatTetelResult>(
      this._controller + 'createnewtetel', bt, this._logonservice.httpoptions())
      .toPromise();
  }

  public SumEsAfaEsTermekdij(dto: BizonylatComplexDto): Promise<BizonylatComplexResult> {
    return this._httpClient.post<BizonylatComplexResult>(
      this._controller + 'sumesafaestermekdij', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Save(dto: BizonylatComplexDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'save', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Fuvardij(par: FuvardijParam): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'fuvardij', par, this._logonservice.httpoptions())
      .toPromise();
  }

  public FuvardijTorles(dto: BizonylatDto): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'fuvardijtorles', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public ZoomCheck(par: BizonylatZoomParameter): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'zoomcheck', par, this._logonservice.httpoptions())
      .toPromise();
  }
}
