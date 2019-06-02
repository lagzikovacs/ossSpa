import { Injectable } from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DokumentumResult} from './dokumentumresult';
import {DokumentumDto} from './dokumentumdto';
import {EmptyResult} from '../dtos/emptyresult';
import {DokumentumContainerMode} from './dokumentumcontainermode';
import {DokumentumEgyMode} from './dokumentumegymode';
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
  private readonly _controller = 'api/dokumentum/';

  cim = 'Dokumentum';

  Dto: DokumentumDto[] = new Array<DokumentumDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new DokumentumDto();

  ContainerMode = DokumentumContainerMode.List;
  EgyMode = DokumentumEgyMode.Reszletek;

  GridSettings: ColumnSettings[] = undefined;
  ReszletekSettings: ColumnSettings[] = undefined;

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(iratkod: number): Promise<DokumentumResult> {
    const url = environment.CoreRef + this._controller + 'select';
    const body = JSON.stringify(iratkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumResult>(url, body, options).toPromise();
  }

  public Get(dokumentumkod: number): Promise<DokumentumResult> {
    const url = environment.CoreRef + this._controller + 'get';
    const body = JSON.stringify(dokumentumkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumResult>(url, body, options).toPromise();
  }

  public Delete(dto: DokumentumDto): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Ellenorzes(dokumentumkod: number): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'ellenorzes';
    const body = JSON.stringify(dokumentumkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Letoltes(lp: LetoltesParam): Promise<LetoltesResult> {
    const url = environment.CoreRef + this._controller + 'letoltes';
    const body = lp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<LetoltesResult>(url, body, options).toPromise();
  }
  public LetoltesPDF(dokumentumkod: number): Promise<LetoltesPDFResult> {
    const url = environment.CoreRef + this._controller + 'letoltespdf';
    const body = dokumentumkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<LetoltesPDFResult>(url, body, options).toPromise();
  }

  public Kimentes(): Promise<EmptyResult> {
    return this.Letoltes(new LetoltesParam(
      this.Dto[this.DtoSelectedIndex].Dokumentumkod,
      this.Dto[this.DtoSelectedIndex].Meret))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result.b);
        FileSaver.saveAs(blob, this.Dto[this.DtoSelectedIndex].Megjegyzes + this.Dto[this.DtoSelectedIndex].Ext);

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }
  public KimentesPDF(): Promise<EmptyResult> {
    return this.LetoltesPDF(this.Dto[this.DtoSelectedIndex].Dokumentumkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, this.Dto[this.DtoSelectedIndex].Megjegyzes + '.pdf');

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public FeltoltesAngular(fb: FajlBuf): Promise<NumberResult> {
    const url = environment.CoreRef + this._controller + 'feltoltesangular';
    const body = fb;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public GetGridSettings(): Promise<ColumnSettingsResult> {
    const url = environment.CoreRef + this._controller + 'getgridsettings';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ColumnSettingsResult>(url, body, options).toPromise();
  }

  public GetReszletekSettings(): Promise<ColumnSettingsResult> {
    const url = environment.CoreRef + this._controller + 'getreszleteksettings';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ColumnSettingsResult>(url, body, options).toPromise();
  }
}
