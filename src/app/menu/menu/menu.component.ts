import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {AngularmenuDto} from '../angularmenudto';
import {Router} from '@angular/router';
import {LogonService} from '../../logon/logon.service';
import {MenuService} from '../menu.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {VerzioService} from '../verzio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  public bejelentkezve = false;
  public szerepkorkivalasztva = false;
  public verzioesbuild = 'OSS';
  public angularmenudto: AngularmenuDto[];
  private subscription: Subscription;

  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  constructor(private _router: Router,
              private _logonservice: LogonService,
              private _menuservice: MenuService,
              private _verzioservice: VerzioService) { }

  ngOnInit() {
    this.bejelentkezve = this._logonservice.isBejelentkezve();

    this.subscription = this._logonservice.SzerepkorKivalasztvaObservable().subscribe(uzenet => {
      const szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);

      if (szerepkorkivalasztva) {
        this._menuservice.AngularMenu()
          .then(res => {
            if (res.Error !== null) {
              throw res.Error;
            }
            this.angularmenudto = res.Result;

            return this._verzioservice.VerzioEsBuild();
          })
          .then(res1 => {
            if (res1.Error !== null) {
              throw res1.Error;
            }
            this.verzioesbuild = 'OSS ' + res1.Result;
          })
          .catch(err => {
            this.errormodal.show(err);
          });
      }

      // itt frissül a template
      this.szerepkorkivalasztva = szerepkorkivalasztva;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }

  public onBejelentkezes() {
    this._router.navigate(['/bejelentkezes']);
  }

  public onKijelentkezes() {
    this._logonservice.Kijelentkezes()
      .then(() => {
        this._router.navigate(['/fooldal']);
      })
      .catch(err => {
        this.errormodal.show(err);
      });
  }
}
