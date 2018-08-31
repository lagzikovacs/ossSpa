import { Injectable } from '@angular/core';
import {NumberResult} from "../../dtos/numberresult";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProjektteendoDto} from "../../dtos/projekt/projektteendodto";
import {LogonService} from "../../services/logon.service";
import {ProjektteendoResult} from "../../dtos/projekt/projektteendoresult";
import {EmptyResult} from "../../dtos/emptyresult";

@Injectable({
  providedIn: 'root'
})
export class ProjektteendoService {
  private readonly _controller = 'api/projektteendo/';

  cim = 'Projekt teendő';
  Dto: ProjektteendoDto[] = new Array<ProjektteendoDto>();
  DtoSelectedIndex = -1;
  uj = false;
  DtoEdited = new ProjektteendoDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: ProjektteendoDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<ProjektteendoResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektteendoResult>(url, body, options).toPromise();
  }

  public Delete(dto: ProjektteendoDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<ProjektteendoResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektteendoResult>(url, body, options).toPromise();
  }

  public Select(projektkod: number): Promise<ProjektteendoResult> {
    const url = environment.BaseHref + this._controller + 'select';
    const body = projektkod;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<ProjektteendoResult>(url, body, options).toPromise();
  }

  public Update(dto: ProjektteendoDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
