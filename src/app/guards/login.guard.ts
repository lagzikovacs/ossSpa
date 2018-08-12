import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LogonService} from '../services/segedeszkosz/logon.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _router: Router, private _logonservice: LogonService) {
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
}
