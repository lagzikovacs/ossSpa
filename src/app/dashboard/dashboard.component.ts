import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {LogonService} from "../logon/logon.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  eppFrissit = false;

  private subscription: Subscription;
  public szerepkorkivalasztva: boolean;

  constructor(private _logonservice: LogonService) { }

  ngOnInit() {
    this.subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);
      console.log(this.szerepkorkivalasztva);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
