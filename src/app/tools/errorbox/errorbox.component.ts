import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from './error.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-errorbox',
  templateUrl: './errorbox.component.html',
  styleUrls: ['./errorbox.component.css']
})
export class ErrorboxComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  hiba: any;
  ahibastring = true;

  constructor(private _router: Router,
              private _errorservice: ErrorService) { }

  ngOnInit() {
    this.subscription = this._errorservice.ErrormessageObservable().subscribe(() => {
      this.hiba = this._errorservice.hiba;

      this.ahibastring = typeof(this.hiba) === 'string';

      $('#errorbox').modal(); // a modal bootstrap extension a jqueryhez
    });
  }

  onClose() {
    if (this.ahibastring) {
      if (this.hiba.indexOf('Ismeretlen Sid') !== -1) {
        this._router.navigate(['/bejelentkezes']);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
