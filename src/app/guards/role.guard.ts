import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LogonService} from '../logon/logon.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, OnDestroy {
  constructor(private _router: Router,
              private _logonservice: LogonService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._logonservice.SzerepkorKivalasztva) {
      return true;
    } else {
      this._router.navigate(['/szerepkorvalasztas']);
      return false;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
