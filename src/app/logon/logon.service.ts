import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonParameter} from './logonparameter';
import {LogonResult} from './logonresult';
import {Md5} from 'ts-md5';
import {SzerepkorokResult} from './szerepkorokresult';
import {CsoportDto} from '../05 Segedeszkozok/04 Csoport/csoportdto';
import {SzerepkorvalasztasParameter} from './szerepkorvalasztasparameter';
import {EmptyResult} from '../common/dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class LogonService {
  private readonly _controller = environment.CoreRef + 'api/logon/';

  lehetsegesszerepkorokDto: CsoportDto[];
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

  public Bejelentkezes(Azonosito: string, Jelszo: string): Promise<LogonResult> {
    const url = this._controller + 'bejelentkezes';
    const body = new LogonParameter(Azonosito, Md5.hashStr(Jelszo).toString());
    const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

    this.Sid = '';
    this.SzerepkorKivalasztva = false;

    return this._httpClient.post<LogonResult>(url, body, options).toPromise();
  }

  public Szerepkorok(): Promise<SzerepkorokResult> {
    return this._httpClient.post<SzerepkorokResult>(
      this._controller + 'szerepkorok', '', this.options())
      .toPromise();
  }

  public SzerepkorValasztas(particiokod: number, csoportkod: number): Promise<EmptyResult> {
    return this._httpClient.post<EmptyResult>(
      this._controller + 'szerepkorvalasztas', new SzerepkorvalasztasParameter(particiokod, csoportkod), this.options())
      .toPromise();
  }

  public Kijelentkezes(): Promise<EmptyResult> {
    this.SzerepkorKivalasztva = false;

    return this._httpClient.post<EmptyResult>(
      this._controller + 'kijelentkezes', null, this.options())
      .toPromise();
  }

  public isBejelentkezve(): boolean {
    return this.Sid !== '';
  }
}
