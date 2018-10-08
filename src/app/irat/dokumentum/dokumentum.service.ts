import { Injectable } from '@angular/core';
import {LogonService} from '../../logon/logon.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DokumentumResult} from './dokumentumresult';
import {DokumentumDto} from './dokumentumdto';
import {EmptyResult} from '../../dtos/emptyresult';
import {DokumentumContainerMode} from './dokumentumcontainermode';
import {DokumentumEgyMode} from './dokumentumegymode';
import {LetoltesResult} from './letoltesresult';
import {LetoltesParam} from './letoltesparam';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../tools/b64toBlob';
import {NumberResult} from '../../dtos/numberresult';
import {FajlBuf} from './fajlbuf';
import {LetoltesPDFResult} from "./letoltespdfresult";

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

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Select(iratkod: number): Promise<DokumentumResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = JSON.stringify(iratkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumResult>(url, body, options).toPromise();
  }

  public Get(dokumentumkod: number): Promise<DokumentumResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = JSON.stringify(dokumentumkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<DokumentumResult>(url, body, options).toPromise();
  }

  public Delete(dto: DokumentumDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Ellenorzes(dokumentumkod: number): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'ellenorzes';
    const body = JSON.stringify(dokumentumkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Letoltes(lp: LetoltesParam): Promise<LetoltesResult> {
    const url = environment.BaseHref + this._controller + 'letoltes';
    const body = lp;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<LetoltesResult>(url, body, options).toPromise();
  }
  public LetoltesPDF(dokumentumkod: number): Promise<LetoltesPDFResult> {
    const url = environment.BaseHref + this._controller + 'letoltespdf';
    const body = dokumentumkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<LetoltesPDFResult>(url, body, options).toPromise();
  }

  public Kimentes(): Promise<EmptyResult> {
    return this.Letoltes(new LetoltesParam(
      this.Dto[this.DtoSelectedIndex].DOKUMENTUMKOD,
      this.Dto[this.DtoSelectedIndex].MERET))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result.b);
        FileSaver.saveAs(blob, this.Dto[this.DtoSelectedIndex].DOKUMENTUMKOD + this.Dto[this.DtoSelectedIndex].EXT);

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }
  public KimentesPDF(): Promise<EmptyResult> {
    return this.LetoltesPDF(this.Dto[this.DtoSelectedIndex].DOKUMENTUMKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, this.Dto[this.DtoSelectedIndex].DOKUMENTUMKOD + '.pdf');

        return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
      });
  }

  public FeltoltesAngular(fb: FajlBuf): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'feltoltesangular';
    const body = fb;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
