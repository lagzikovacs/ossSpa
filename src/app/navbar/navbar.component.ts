import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorService} from '../tools/errorbox/error.service';
import {VerzioService} from '../menu/verzio.service';
import {MenuService} from '../menu/menu.service';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {Router} from '@angular/router';
import {AngularmenuDto} from '../menu/angularmenudto';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  public bejelentkezve = false;
  public szerepkorkivalasztva = false;
  public verzioesbuild = 'OSS';
  public angularmenudto: AngularmenuDto[];

  sidebar: any;
  selected: any;

  constructor(private _router: Router,
              private _logonservice: LogonService,
              private _menuservice: MenuService,
              private _verzioservice: VerzioService,
              private _errorservice: ErrorService) {
    super();
  }

  ngOnInit(): void {
    this.sidebar = document.getElementById('sidebar');
    // document.addEventListener('click', this.closesidebar, false);

    this.bejelentkezve = this._logonservice.isBejelentkezve();

    this._logonservice.SzerepkorKivalasztvaObservable().pipe(untilComponentDestroyed(this)).subscribe(uzenet => {
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

            //
          })
          .catch(err => {
            this._errorservice.Error = err;
          });
      }

      // itt frissül a template
      this.szerepkorkivalasztva = szerepkorkivalasztva;
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



  toggleItem() {
    console.log('nah');
    const menu = document.querySelector('.menu');

    if (menu.classList.contains('submenu-active')) {
      menu.classList.remove('submenu-active');
    } else if (menu.querySelector('.submenu-active')) {
      menu.querySelector('.submenu-active').classList.remove('submenu-active');
      menu.classList.add('submenu-active');
    } else {
      menu.classList.add('submenu-active');
    }
  }

  closeSubmenu(e) {
    const menu = document.querySelector('.menu');
    const isClickInside = menu.contains(e.target);

    if (!isClickInside && menu.querySelector('.submenu-active')) {
      menu.querySelector('.submenu-active').classList.remove('submenu-active');
    }
  }

  toggleMenu() {
    const menu = document.querySelector('.menu');
    const toggle = document.querySelector('.toggle');

    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      toggle.querySelector('a').innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      menu.classList.add('active');
      toggle.querySelector('a').innerHTML = '<i class="fas fa-times"></i>';
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
