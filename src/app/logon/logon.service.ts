import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LogonParameter} from './logonparameter';
import {LogonResult} from './logonresult';
import {Md5} from 'ts-md5';
import {SzerepkorokResult} from './szerepkorokresult';
import {CsoportDto} from '../csoport/csoportdto';
import {SzerepkorvalasztasParameter} from './szerepkorvalasztasparameter';
import {EmptyResult} from '../dtos/emptyresult';

@Injectable({
  providedIn: 'root'
})
export class LogonService {
  lehetsegesszerepkorokDto: CsoportDto[];
  Sid = '';
  Jogaim: any[] = new Array<any>();
  private readonly _controller = 'api/logon/';
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

  public Bejelentkezes(Azonosito: string, Jelszo: string): Promise<LogonResult> {
    const url = environment.CoreRef + this._controller + 'bejelentkezes';
    const body = new LogonParameter(Azonosito, Md5.hashStr(Jelszo).toString());
    const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

    this.Sid = '';
    this.SzerepkorKivalasztva = false;

    return this._httpClient.post<LogonResult>(url, body, options).toPromise();
  }

  public Szerepkorok(): Promise<SzerepkorokResult> {
    const url = environment.CoreRef + this._controller + 'szerepkorok';
    const body = '';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this.Sid)
    };

    return this._httpClient.post<SzerepkorokResult>(url, body, options).toPromise();
  }

  public SzerepkorValasztas(particiokod: number, csoportkod: number): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'szerepkorvalasztas';
    const body = new SzerepkorvalasztasParameter(particiokod, csoportkod);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this.Sid)
    };

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  public Kijelentkezes(): Promise<EmptyResult> {
    const url = environment.CoreRef + this._controller + 'kijelentkezes';
    const body = null;
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('sid', this.Sid)
    };

    this.Sid = '';
    this.SzerepkorKivalasztva = false;

    return this._httpClient.post<EmptyResult>(url, body, options).toPromise();
  }

  SzerepkorKivalasztvaObservable(): Observable<any> {
    return this._subjectSzerepkorKivalasztva.asObservable();
  }

  public isBejelentkezve(): boolean {
    return this.Sid !== '';
  }
}
