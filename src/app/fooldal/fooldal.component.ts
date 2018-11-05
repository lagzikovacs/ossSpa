import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LogonService} from '../logon/logon.service';
import {Subscription} from 'rxjs/index';
import {SessionService} from '../session/session.service';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {SessionDto} from '../session/sessiondto';
import {EsemenynaploService} from '../esemenynaplo/esemenynaplo.service';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.css']
})
export class FooldalComponent implements OnInit, OnDestroy {
  szerepkorkivalasztva: boolean;
  private _subscription: Subscription;

  constructor(private _logonservice: LogonService) { }

  ngOnInit() {
    // arra az esetre kell, amikor a főoldal van megjelenítve bejelentkezett állapotban és kattintunk a kijelentkezésre
    // ilyenkor a router nem irányít 'még egyszer' a főoldalra, nem frissül
    this._subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);
    });

    this.szerepkorkivalasztva = this._logonservice.SzerepkorKivalasztva;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
