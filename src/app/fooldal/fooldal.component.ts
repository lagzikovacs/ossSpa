import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {Subscription} from 'rxjs/index';
import {SessionService} from '../session/session.service';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html'
})
export class FooldalComponent implements OnInit, OnDestroy {
  szerepkorkivalasztva = false;
  felhasznalokod = -1;
  private _subscription: Subscription;

  constructor(private _logonservice: LogonService,
              private _sessionservice: SessionService) { }

  ngOnInit() {
    // arra az esetre kell, amikor a főoldal van megjelenítve bejelentkezett állapotban és kattintunk a kijelentkezésre
    // ilyenkor a router nem irányít 'még egyszer' a főoldalra, nem frissül
    this._subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);
      this.felhasznalo();
    });

    this.szerepkorkivalasztva = this._logonservice.SzerepkorKivalasztva;
    this.felhasznalo();
  }

  felhasznalo() {
    if (this.szerepkorkivalasztva) {
      this.felhasznalokod = this._sessionservice.sessiondto.Felhasznalokod;
    } else {
      this.felhasznalokod = -1;
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
