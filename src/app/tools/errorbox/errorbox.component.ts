import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from './error.service';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-errorbox',
  templateUrl: './errorbox.component.html',
  styleUrls: ['./errorbox.component.css']
})
export class ErrorboxComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  errorbox: any;
  hiba: any;
  ahibastring = true;

  constructor(private _router: Router,
              private _errorservice: ErrorService) {
    super();
  }

  ngOnInit() {
    this.errorbox = document.getElementById('errorbox');

    this._errorservice.ErrormessageObservable().pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.hiba = this._errorservice.hiba;

      this.ahibastring = typeof(this.hiba) === 'string';

      this.errorbox.style.display = 'block';
    });
  }

  onClose() {
    this.errorbox.style.display = 'none';

    if (this.ahibastring) {
      if (this.hiba.indexOf('Ismeretlen Sid') !== -1) {
        this._router.navigate(['/bejelentkezes']);
      }
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
