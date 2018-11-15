import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {LogonService} from '../logon/logon.service';
import {SessionService} from '../session/session.service';

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
  utolsouzenet = '';

  constructor(private _logonservice: LogonService,
              sessionservice: SessionService) {
    this.sessionservice = sessionservice;
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
        this.hubproxy.on('Uzenet', (message) => {
          this.utolsouzenet = message;
          this.beep();
        });

        this.connection.start()
          .done((data: any) => {
            this.utolsouzenet = 'OssHub OK';
          })
          .fail((error: any) => {
            this.utolsouzenet = error;
          });
      } else {
        this.connection.stop();
        this.hubproxy.off('Uzenet');
        this.utolsouzenet = '';
      }
    });
  }

  beep() {
    const audio = new Audio();
    audio.src = '../assets/Door Bell.mp3';
    audio.load();
    audio.play();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
