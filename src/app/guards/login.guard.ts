import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LogonService} from '../05 Segedeszkozok/05 Bejelentkezes/logon.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, OnDestroy {
  constructor(private _router: Router,
              private _logonservice: LogonService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._logonservice.isBejelentkezve()) {
      return true;
    } else {
      this._router.navigate(['/bejelentkezes']);
      return false;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
