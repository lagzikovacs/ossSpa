import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {LogonService} from '../logon/logon.service';
import {SessionService} from '../session/session.service';
import {PlatformLocation} from '@angular/common';

declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  eppFrissit = false;

  private _subscription: Subscription;
  szerepkorkivalasztva: boolean;
  sessionservice: SessionService;

  connection = $.hubConnection('https://docport.hu/ossrest/api/osshub', {useDefaultPath: false});
  hubproxy = this.connection.createHubProxy('OssHub');
  connected = false;
  utolsouzenet = '';

  constructor(private _logonservice: LogonService,
              private _platformLocation: PlatformLocation,
              sessionservice: SessionService) {
    this.sessionservice = sessionservice;

    console.log((_platformLocation as any).location);
    console.log((_platformLocation as any).location.href);
    console.log((_platformLocation as any).location.origin);
  }

  ngOnInit() {
    // this.connection.stateChanged(function (change) {
    //   console.log(change);
    // });
    // this.connection.received(x => {
    //   // itt részletes adatok jönnek
    //   console.log(x);
    // });

    this._subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);

      if (this.szerepkorkivalasztva) {
        this.startconnection();
      } else {
        this.stopconnection();
      }
    });
  }

  startconnection() {
    this.hubproxy.on('Uzenet', (message) => {
      // TODO lehet listába tenni, stb.
      this.utolsouzenet = message;
      this.beep();
    });

    this.connection.start()
      .done((data: any) => {
        this.utolsouzenet = 'OssHub OK';
        this.connected = true;
      })
      .fail((error: any) => {
        this.utolsouzenet = error;
      });
  }
  stopconnection() {
    this.connection.stop();
    this.hubproxy.off('Uzenet');
    this.utolsouzenet = '';
    this.connected = false;
  }

  beep() {
    const audio = new Audio();
    audio.src = 'assets/doorbell.mp3';
    audio.load();
    audio.play();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();

    if (this.connected) {
      this.stopconnection();
    }

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
