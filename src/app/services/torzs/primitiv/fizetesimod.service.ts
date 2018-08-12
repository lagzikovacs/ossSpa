import { Injectable } from '@angular/core';
import {EgyszeruKeresesDto} from "../../../dtos/egyszerukeresesdto";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LogonService} from "../../segedeszkosz/logon.service";
import {FizetesimodDto} from "../../../dtos/primitiv/fizetesimod/fizetesimoddto";
import {ZoomSources} from "../../../enums/zoomsources";
import {FizetesimodResult} from "../../../dtos/primitiv/fizetesimod/fizetesimodresult";
import {NumberResult} from "../../../dtos/numberresult";
import {EmptyResult} from "../../../dtos/emptyresult";

@Injectable({
  providedIn: 'root'
})
export class FizetesimodService {
  private readonly _controller = 'api/fizetesimod/';

  cim = 'Fizetési mód';
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  Dto: FizetesimodDto[] = new Array<FizetesimodDto>();
  DtoSelectedIndex = -1;
  uj = false;
  zoom = false;
  zoomsource: ZoomSources;
  DtoEdited = new FizetesimodDto();

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public Add(dto: FizetesimodDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'add';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }

  public CreateNew(): Promise<FizetesimodResult> {
    const url = environment.BaseHref + this._controller + 'createnew';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FizetesimodResult>(url, body, options).toPromise();
  }

  public Delete(dto: FizetesimodDto): Promise<EmptyResult> {
    const url = environment.BaseHref + this._controller + 'delete';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Get(key: number): Promise<FizetesimodResult> {
    const url = environment.BaseHref + this._controller + 'get';
    const body = key;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FizetesimodResult>(url, body, options).toPromise();
  }

  public Read(maszk: string): Promise<FizetesimodResult> {
    const url = environment.BaseHref + this._controller + 'read';
    const body = maszk;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<FizetesimodResult>(url, JSON.stringify(body), options).toPromise();
  }

  public Update(dto: FizetesimodDto): Promise<NumberResult> {
    const url = environment.BaseHref + this._controller + 'update';
    const body = dto;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this._logonservice.Sid)
    };

    return this._httpClient.post<NumberResult>(url, body, options).toPromise();
  }
}
