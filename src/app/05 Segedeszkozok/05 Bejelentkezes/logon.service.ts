import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SzerepkorokResult} from './szerepkorokresult';
import {SzerepkorvalasztasParam} from './szerepkorvalasztasparam';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {StringResult} from '../../common/dtos/stringresult';
import {CsoportDto} from '../04 Csoport/csoportdto';
import {lastValueFrom} from 'rxjs';
import {Md5} from 'ts-md5';
import {LogonParam} from './logonparam';

@Injectable({
  providedIn: 'root'
})
export class LogonService {
  private readonly _controller = environment.CoreRef + 'api/logon/';

  lehetsegesszerepkorokDto: CsoportDto[] = new Array<CsoportDto>();
  Sid = '';
  Jogaim: any[] = new Array<any>();
  private _subjectSzerepkorKivalasztva = new Subject<any>();

  constructor(private _httpClient: HttpClient) {}

  private _SzerepkorKivalasztva = false;
  get SzerepkorKivalasztva(): boolean {
    return this._SzerepkorKivalasztva;
  }
  set SzerepkorKivalasztva(value: boolean) {
    this._SzerepkorKivalasztva = value;
    this._subjectSzerepkorKivalasztva.next({szerepkorkivalasztva: this._SzerepkorKivalasztva});
  }

  SzerepkorKivalasztvaObservable(): Observable<any> {
    return this._subjectSzerepkorKivalasztva.asObservable();
  }

  private options() {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this.Sid)
    };
  }
  public httpoptions() {
    return this.options();
  }

  public async Bejelentkezes(Azonosito: string, Jelszo: string): Promise<StringResult> {
    this.Sid = '';
    this.SzerepkorKivalasztva = false;

    const url = this._controller + 'bejelentkezes';
    const body = new LogonParam(Azonosito, Md5.hashStr(Jelszo).toString());
    const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

    return await lastValueFrom(this._httpClient.post<StringResult>(url, body, options));
  }

  public async Szerepkorok(): Promise<SzerepkorokResult> {
    const url = this._controller + 'szerepkorok';
    const body = null;

    return await lastValueFrom(
      this._httpClient.post<SzerepkorokResult>(url, body, this.options())
    );
  }

  public async SzerepkorValasztas(particiokod: number, csoportkod: number): Promise<EmptyResult> {
    const url = this._controller + 'szerepkorvalasztas';
    const body = new SzerepkorvalasztasParam(particiokod, csoportkod);

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, body, this.options())
    );
  }

  public async Kijelentkezes(): Promise<EmptyResult> {
    this.SzerepkorKivalasztva = false;
    const body = null;

    const url = this._controller + 'kijelentkezes';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, body, this.options())
    );
  }

  public isBejelentkezve(): boolean {
    return this.Sid !== '';
  }
}
