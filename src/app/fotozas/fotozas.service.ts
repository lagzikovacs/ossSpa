import { Injectable } from '@angular/core';
import {StringResult} from '../dtos/stringresult';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IratDto} from '../irat/iratdto';
import {LogonService} from '../logon/logon.service';
import {FotozasResult} from './fotozasresult';

@Injectable({
  providedIn: 'root'
})
export class FotozasService {
  private readonly _controller = environment.CoreRef + 'api/fotozas/';

  constructor(private _httpClient: HttpClient,
              private _logonservice: LogonService) { }

  public CreateNewLink(dto: IratDto): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'createnewlink', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public GetLink(dto: IratDto): Promise<StringResult> {
    return this._httpClient.post<StringResult>(
      this._controller + 'getlink', dto, this._logonservice.httpoptions())
      .toPromise();
  }

  public Check(linkparam: string): Promise<FotozasResult> {
    return this._httpClient.post<FotozasResult>(
      this._controller + 'check', JSON.stringify(linkparam), this._logonservice.httpoptions())
      .toPromise();
  }
}
