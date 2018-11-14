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

  constructor(private _logonservice: LogonService,
              sessionservice: SessionService) {
    this.sessionservice = sessionservice;
  }

  ngOnInit() {
    this.connection.stateChanged(function (change) {
      console.log(change);
    });

    this._subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);

      if (this.szerepkorkivalasztva) {
        this.connection.start();
      } else {
        this.connection.stop();
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
