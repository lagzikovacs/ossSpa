import { Injectable } from '@angular/core';
import {StringResult} from '../../common/dtos/stringresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IratDto} from '../../02 Eszkozok/02 Irat/irat/iratdto';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {FotozasResult} from './fotozasresult';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FotozasService {
  private readonly _controller = environment.CoreRef + 'api/fotozas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public async CreateNewLink(dto: IratDto): Promise<StringResult> {
    const url = this._controller + 'createnewlink';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async ClearLink(dto: IratDto): Promise<EmptyResult> {
    const url = this._controller + 'clearlink';

    return await lastValueFrom(
      this._httpClient.post<EmptyResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async GetLink(dto: IratDto): Promise<StringResult> {
    const url = this._controller + 'getlink';

    return await lastValueFrom(
      this._httpClient.post<StringResult>(url, dto, this._logonservice.httpoptions())
    );
  }

  public async Check(linkparam: string): Promise<FotozasResult> {
    const url = this._controller + 'check';

    return await lastValueFrom(
      this._httpClient.post<FotozasResult>(url, JSON.stringify(linkparam), this._logonservice.httpoptions())
    );
  }
}
