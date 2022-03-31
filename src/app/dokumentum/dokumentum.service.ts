import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DokumentumResult} from './dokumentumresult';
import {DokumentumDto} from './dokumentumdto';
import {EmptyResult} from '../dtos/emptyresult';
import {LetoltesResult} from './letoltesresult';
import {LetoltesParam} from './letoltesparam';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../tools/b64toBlob';
import {NumberResult} from '../dtos/numberresult';
import {FajlBuf} from './fajlbuf';
import {LetoltesPDFResult} from './letoltespdfresult';
import {ColumnSettings} from '../tools/reszletek/columnsettings';
import {ColumnSettingsResult} from '../tools/reszletek/columnsettingsresult';

@Injectable({
  providedIn: 'root'
})
export class DokumentumService {
  private readonly _controller = environment.CoreRef + 'api/dokumentum/';
  cim = 'Dokumentum';

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(iratkod: number): Promise<DokumentumResult> {
    return this._httpClient.post<DokumentumResult>(
      this._controller + 'select', JSON.stringify(iratkod), this._logonservice.httpoptions())
      .toPromise();
  }

  public Get(dokumentumkod: number): Promise<DokumentumResult> {
    return this._httpClient.post<DokumentumResult>(
      this._controller + 'get', JSON.stringify(dokumentumkod), this._logonservice.httpoptions())
      .toPromise();
  }

  public Delete(dto: DokumentumDto): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'delete', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Ellenorzes(dokumentumkod: number): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'ellenorzes', JSON.stringify(dokumentumkod), this._logonservice.httpoptions())
      .toPromise();
  }

  public Letoltes(lp: LetoltesParam): Promise<LetoltesResult> {
    return this._httpClient.post<LetoltesResult>(
      this._controller + 'letoltes', lp, this._logonservice.httpoptions())
      .toPromise();
  }
  public LetoltesPDF(dokumentumkod: number): Promise<LetoltesPDFResult> {
    return this._httpClient.post<LetoltesPDFResult>(
      this._controller + 'letoltespdf', dokumentumkod, this._logonservice.httpoptions())
      .toPromise();
  }

  public Kimentes(Dto: DokumentumDto): Promise<EmptyResult> {
    return this.Letoltes(new LetoltesParam(Dto.Dokumentumkod, Dto.Meret))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result.b);
        FileSaver.saveAs(blob, Dto.Megjegyzes + Dto.Ext);

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }
  public KimentesPDF(Dto: DokumentumDto): Promise<EmptyResult> {
    return this.LetoltesPDF(Dto.Dokumentumkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, Dto.Megjegyzes + '.pdf');

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public FeltoltesAngular(fb: FajlBuf): Promise<NumberResult> {
    return this._httpClient.post<NumberResult>(
      this._controller + 'feltoltesangular', fb, this._logonservice.httpoptions())
      .toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getgridsettings', '', this._logonservice.httpoptions())
      .toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    return this._httpClient.post<ColumnSettingsResult>(
      this._controller + 'getreszleteksettings', '', this._logonservice.httpoptions())
      .toPromise();
  }
}
