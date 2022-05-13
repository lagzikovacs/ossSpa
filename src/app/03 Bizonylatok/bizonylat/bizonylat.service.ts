import { Injectable } from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BizonylatComplexResult} from './bizonylatcomplexresult';
import {BizonylatTipus} from './bizonylattipus';
import {BizonylatDto} from './bizonylatdto';
import {BizonylatTipusLeiroResult} from './bizonylattipusleiroresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {BizonylatParameter} from './bizonylatparameter';
import {BizonylatResult} from './bizonylatresult';
import {NumberResult} from '../../common/dtos/numberresult';
import {BizonylatMintaAlapjanParam} from './bizonylatmintaalapjan';
import {BizonylatKibocsatasParam} from './bizonylatkibocsatasparam';
import {BizonylatComplexDto} from './bizonylatcomplexdto';
import {BizonylatTetelResult} from '../bizonylattetel/bizonylattetelresult';
import {FuvardijParam} from './fuvardijparam';
import {BizonylatZoomParameter} from './bizonylatzoomparameter';
import {lastValueFrom} from 'rxjs';

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

  public async BizonylatLeiro(bt: BizonylatTipus): Promise<BizonylatTipusLeiroResult> {
    const url = this._controller + 'bizonylatleiro';

    return await lastValueFrom(
      this._httpClient.post<BizonylatTipusLeiroResult>(url, bt, this._logonservice.httpoptions())
    );
  }

  public async CreateNewComplex(): Promise<BizonylatComplexResult> {
    const url = this._controller + 'createnewcomplex';

    return await lastValueFrom(
      this._httpClient.post<BizonylatComplexResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: BizonylatDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Get(bizonylatkod: number): Promise<BizonylatResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<BizonylatResult>(url, bizonylatkod, this._logonservice.httpoptions())
    );
  }

  public async GetComplex(bizonylatkod: number): Promise<BizonylatComplexResult> {
    const url = this._controller + 'getcomplex';

    return await lastValueFrom(
      this._httpClient.post<BizonylatComplexResult>(url, bizonylatkod, this._logonservice.httpoptions())
    );
  }

  public async Select(bp: BizonylatParameter): Promise<BizonylatResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<BizonylatResult>(url, bp, this._logonservice.httpoptions())
    );
  }

  public async UjBizonylatMintaAlapjan(par: BizonylatMintaAlapjanParam): Promise<NumberResult> {
    const url = this._controller + 'ujbizonylatmintaalapjan';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async KifizetesRendben(dto: BizonylatDto): Promise<NumberResult> {
    const url = this._controller + 'kifizetesrendben';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Kiszallitva(dto: BizonylatDto): Promise<NumberResult> {
    const url = this._controller + 'kiszallitva';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Storno(dto: BizonylatDto): Promise<NumberResult> {
    const url = this._controller + 'storno';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Kibocsatas(par: BizonylatKibocsatasParam): Promise<NumberResult> {
    const url = this._controller + 'kibocsatas';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async CreateNewTetel(bt: BizonylatTipus): Promise<BizonylatTetelResult> {
    const url = this._controller + 'createnewtetel';

    return await lastValueFrom(
      this._httpClient.post<BizonylatTetelResult>(url, bt, this._logonservice.httpoptions())
    );
  }

  public async SumEsAfaEsTermekdij(dto: BizonylatComplexDto): Promise<BizonylatComplexResult> {
    const url = this._controller + 'sumesafaestermekdij';

    return await lastValueFrom(
      this._httpClient.post<BizonylatComplexResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Save(dto: BizonylatComplexDto): Promise<NumberResult> {
    const url = this._controller + 'save';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Fuvardij(par: FuvardijParam): Promise<NumberResult> {
    const url = this._controller + 'fuvardij';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, par, this._logonservice.httpoptions())
    );
  }

  public async FuvardijTorles(dto: BizonylatDto): Promise<NumberResult> {
    const url = this._controller + 'fuvardijtorles';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ZoomCheck(par: BizonylatZoomParameter): Promise<EmptyResult> {
    const url = this._controller + 'zoomcheck';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, par, this._logonservice.httpoptions())
    );
  }
}
