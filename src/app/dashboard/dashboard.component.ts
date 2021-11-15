import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {LogonService} from '../logon/logon.service';
import {SessionService} from '../session/session.service';
import {environment} from '../../environments/environment';
import * as signalR from '@aspnet/signalr';
import {DashboardDto} from './dashboarddto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  private _hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl(environment.CoreRef + 'osshub').build();

  szerepkorkivalasztva: boolean;
  sessionservice: SessionService;
  serverurl: any;

  connected = false;
  mode = 0;
  Dto = new Array<DashboardDto>();

  constructor(private _logonservice: LogonService,
              sessionservice: SessionService) {
    this.sessionservice = sessionservice;
    this.serverurl = environment.CoreRef;
  }

  ngOnInit() {
    this._subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);

      this.mode = 0;
      this.Dto = [];

      if (this.szerepkorkivalasztva) {
        this.startconnection();
      } else {
        this.stopconnection();
      }
    });
  }

  startconnection() {
    this._hubConnection.on('Uzenet', (message) => {
        this.Dto.unshift({Idopont: Date.now(), Uzenet: message});
    });
    this._hubConnection.start()
      .then(() => {
        this.Dto.unshift({Idopont: Date.now(), Uzenet: 'OssHub start'});
        this.connected = true;
      })
      .catch((error: any) => {
        this.Dto.unshift({Idopont: Date.now(), Uzenet: error});
      });
  }
  stopconnection() {
    this._hubConnection.stop();
    this.Dto.unshift({Idopont: Date.now(), Uzenet: 'OssHub stop'});
    this.connected = false;
  }

  beep() {
    const audio = new Audio();
    audio.src = 'assets/ossspa/doorbell.mp3';
    audio.load();
    audio.play();
  }

  alap() {
    this.mode = 0;
  }
  reszletes() {
    this.mode = 1;
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
