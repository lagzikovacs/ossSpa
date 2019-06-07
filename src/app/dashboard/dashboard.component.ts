import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {LogonService} from '../logon/logon.service';
import {SessionService} from '../session/session.service';
import {PlatformLocation} from '@angular/common';
import {environment} from '../../environments/environment';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  eppFrissit = false;

  private _subscription: Subscription;
  szerepkorkivalasztva: boolean;
  sessionservice: SessionService;

  connected = false;
  utolsouzenet = '';

  private _hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl(environment.CoreRef + 'osshub').build();

  constructor(private _logonservice: LogonService,
              private _platformLocation: PlatformLocation,
              sessionservice: SessionService) {
    this.sessionservice = sessionservice;

    // console.log((_platformLocation as any).location);
    // console.log((_platformLocation as any).location.href);
    // console.log((_platformLocation as any).location.origin);
  }

  ngOnInit() {
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
    this._hubConnection.on('Uzenet', (message) => {
        // TODO lehet listába tenni, stb.
        this.utolsouzenet = message;
        this.beep();
    });
    this._hubConnection.start()
      .then(() => {
        this.utolsouzenet = 'OssHub OK';
        this.connected = true;
      })
      .catch((error: any) => {
        this.utolsouzenet = error;
      });
  }
  stopconnection() {
    this._hubConnection.stop();

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
