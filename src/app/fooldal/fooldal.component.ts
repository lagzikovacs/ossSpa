import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LogonService} from '../services/logon.service';
import {Subscription} from 'rxjs/index';
import {SessionService} from '../services/session.service';
import {ErrormodalComponent} from '../tools/errormodal/errormodal.component';
import {SessionDto} from '../dtos/session/sessiondto';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.css']
})
export class FooldalComponent implements OnInit, OnDestroy {
  public sessiondto = new SessionDto();
  public szerepkorkivalasztva: boolean;
  private subscription: Subscription;
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  constructor(private _logonservice: LogonService,
              private _sessionservice: SessionService) {
  }

  ngOnInit() {
    // arra az esetre kell, amikor a főoldal van megjelenítve bejelentkezett állapotban és kattintunk a kijelentkezésre
    // ilyenkor a router nem irányít 'még egyszer' a főoldalra, nem frissül
    this.subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);
      this.Frissites();
    });

    this.szerepkorkivalasztva = this._logonservice.SzerepkorKivalasztva;
    this.Frissites();
  }

  Frissites(): void {
    if (this.szerepkorkivalasztva) {
      this._sessionservice.Get()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }
          this.sessiondto = res.Result[0];
        })
        .catch(err => {
          this.errormodal.show(err);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
