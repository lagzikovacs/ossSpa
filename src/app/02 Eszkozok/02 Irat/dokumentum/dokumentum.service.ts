import { Injectable } from '@angular/core';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {DokumentumResult} from './dokumentumresult';
import {DokumentumDto} from './dokumentumdto';
import {EmptyResult} from '../../../common/dtos/emptyresult';
import {LetoltesResult} from './letoltesresult';
import {LetoltesParam} from './letoltesparam';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../../common/b64toBlob';
import {NumberResult} from '../../../common/dtos/numberresult';
import {FajlBuf} from './fajlbuf';
import {LetoltesPDFResult} from './letoltespdfresult';
import {ColumnSettings} from '../../../common/reszletek/columnsettings';
import {ColumnSettingsResult} from '../../../common/reszletek/columnsettingsresult';
import {lastValueFrom} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DokumentumService {
  private readonly _controller = environment.CoreRef + 'api/dokumentum/';
  cim = 'Dokumentum';

  GridSettings: ColumnSettings[] = new Array<ColumnSettings>();
  ReszletekSettings: ColumnSettings[] = new Array<ColumnSettings>();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async Select(iratkod: number): Promise<DokumentumResult> {
    const url = this._controller + 'select';

    return await lastValueFrom(
      this._httpClient.post<DokumentumResult>(url, JSON.stringify(iratkod), this._logonservice.httpoptions())
    );
  }

  public async Get(dokumentumkod: number): Promise<DokumentumResult> {
    const url = this._controller + 'get';

    return await lastValueFrom(
      this._httpClient.post<DokumentumResult>(url, JSON.stringify(dokumentumkod), this._logonservice.httpoptions())
    );
  }

  public async Delete(dto: DokumentumDto): Promise<EmptyResult> {
    const url = this._controller + 'delete';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Ellenorzes(dokumentumkod: number): Promise<EmptyResult> {
    const url = this._controller + 'ellenorzes';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, JSON.stringify(dokumentumkod), this._logonservice.httpoptions())
    );
  }

  public async Letoltes(lp: LetoltesParam): Promise<LetoltesResult> {
    const url = this._controller + 'letoltes';

    return await lastValueFrom(
      this._httpClient.post<LetoltesResult>(url, lp, this._logonservice.httpoptions())
    );
  }
  public async LetoltesPDF(dokumentumkod: number): Promise<LetoltesPDFResult> {
    const url = this._controller + 'letoltespdf';

    return await lastValueFrom(
      this._httpClient.post<LetoltesPDFResult>(url, dokumentumkod, this._logonservice.httpoptions())
    );
  }

  public async Dummy(): Promise<EmptyResult> {
    const o = new Observable<EmptyResult>(subscriber => {
      subscriber.next(new EmptyResult());
      subscriber.complete();
    });

    return await lastValueFrom(o);
  }

  public async Kimentes(Dto: DokumentumDto) {
    const res = await this.Letoltes(new LetoltesParam(Dto.Dokumentumkod, Dto.Meret));
    if (res.Error != null) {
      throw res.Error;
    }

    const blob = b64toBlob(res.Result.b);
    FileSaver.saveAs(blob, Dto.Megjegyzes + Dto.Ext);
  }

  public async KimentesPDF(Dto: DokumentumDto) {
    const res = await this.LetoltesPDF(Dto.Dokumentumkod);
    if (res.Error != null) {
      throw res.Error;
    }

    const blob = b64toBlob(res.Result);
    FileSaver.saveAs(blob, Dto.Megjegyzes + '.pdf');
  }

  public async FeltoltesAngular(fb: FajlBuf): Promise<NumberResult> {
    const url = this._controller + 'feltoltesangular';

    return await lastValueFrom(
      this._httpClient.post<NumberResult>(url, fb, this._logonservice.httpoptions())
    );
  }

  public async GetGridSettings(): Promise<ColumnSettingsResult> {
    const url = this._controller + 'getgridsettings';

    return await lastValueFrom(
      this._httpClient.post<ColumnSettingsResult>(url, '', this._logonservice.httpoptions())
    );
  }

  public async GetReszletekSettings(): Promise<ColumnSettingsResult> {
    const url = this._controller + 'getreszleteksettings';

    return await lastValueFrom(
      this._httpClient.post<ColumnSettingsResult>(url, '', this._logonservice.httpoptions())
    );
  }
}
