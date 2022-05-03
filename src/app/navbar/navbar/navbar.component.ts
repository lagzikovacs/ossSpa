import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {MenuService} from '../menu/menu.service';
import {VerzioService} from '../menu/verzio.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {AngularmenuDto} from '../menu/angularmenudto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  szerepkorkivalasztva = false;
  verzioesbuild = 'OSS';
  angularmenudto: AngularmenuDto[] = new Array<AngularmenuDto>();

  sidebar: any;
  selected: any;

  constructor(private _router: Router,
              private _logonservice: LogonService,
              private _menuservice: MenuService,
              private _verzioservice: VerzioService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.sidebar = document.getElementById('sidebar');

    this._logonservice.SzerepkorKivalasztvaObservable().pipe(untilComponentDestroyed(this)).subscribe(uzenet => {
      this.szerepkorkivalasztva = (uzenet.szerepkorkivalasztva as boolean);

      if (this.szerepkorkivalasztva) {
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
            this._cdr.markForCheck();
            this._cdr.detectChanges();
          })
          .catch(err => {
            this._errorservice.Error = err;
          });
      } else {
        this.verzioesbuild = 'OSS';
        this._cdr.markForCheck();
        this._cdr.detectChanges();
      }
    });
  }

  opensidebar() {
    if (this.szerepkorkivalasztva) {
      this.sidebar.style.display = 'block';
    }
  }
  setselected(i) {
    this.selected = i;
  }
  menuclick(rtl) {
    this.sidebar.style.display = 'none';
    this._menuservice.menuclick(rtl);
  }

  closesidebar() {
    this.sidebar.style.display = 'none';
  }



  // toggleItem() {
  //   console.log('nah');
  //   const menu = document.querySelector('.menu');
  //
  //   if (menu.classList.contains('submenu-active')) {
  //     menu.classList.remove('submenu-active');
  //   } else if (menu.querySelector('.submenu-active')) {
  //     menu.querySelector('.submenu-active').classList.remove('submenu-active');
  //     menu.classList.add('submenu-active');
  //   } else {
  //     menu.classList.add('submenu-active');
  //   }
  // }

  // closeSubmenu(e) {
  //   const menu = document.querySelector('.menu');
  //   const isClickInside = menu.contains(e.target);
  //
  //   if (!isClickInside && menu.querySelector('.submenu-active')) {
  //     menu.querySelector('.submenu-active').classList.remove('submenu-active');
  //   }
  // }

  // toggleMenu() {
  //   const menu = document.querySelector('.menu');
  //   const toggle = document.querySelector('.toggle');
  //
  //   if (menu.classList.contains('active')) {
  //     menu.classList.remove('active');
  //     toggle.querySelector('a').innerHTML = '<i class="fas fa-bars"></i>';
  //   } else {
  //     menu.classList.add('active');
  //     toggle.querySelector('a').innerHTML = '<i class="fas fa-times"></i>';
  //   }
  // }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
