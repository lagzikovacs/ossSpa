import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from './error.service';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-errorbox',
  templateUrl: './errorbox.component.html'
})
export class ErrorboxComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  errorbox: any;

  hiba: any;
  ahibastring = true;

  constructor(private _router: Router,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.errorbox = document.getElementById('errorbox');

    this._errorservice.ErrormessageObservable().pipe(untilComponentDestroyed(this)).subscribe(h => {
      this.ahibastring = typeof(h) === 'string';
      this.hiba = h;
      this._cdr.markForCheck();
      this._cdr.detectChanges();

      this.errorbox.style.display = 'block';
    });
  }

  doClose() {
    this.errorbox.style.display = 'none';

    if (this.ahibastring) {
      if (this.hiba.indexOf('Ismeretlen Sid') !== -1) {
        this._router.navigate(['/bejelentkezes']);
      }
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
