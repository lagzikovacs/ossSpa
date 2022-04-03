import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../../05 Segedeszkozok/03 Felhasznalo/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../tools/errorbox/error.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-jelszocsere',
  templateUrl: './jelszocsere.component.html'
})
export class JelszocsereComponent implements OnDestroy {
  regijelszo = '';
  jelszo = '';
  jelszoujra = '';

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  felhasznaloservice: FelhasznaloService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;

    this.form = this._fb.group({
      'regijelszo': ['', [Validators.required, Validators.maxLength(30)]],
      'jelszo': ['', [Validators.required, Validators.maxLength(30)]],
      'jelszoujra': ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  onSubmit() {
    this.regijelszo = this.form.value['regijelszo'];
    this.jelszo = this.form.value['jelszo'];
    this.jelszoujra = this.form.value['jelszoujra'];

    if (this.jelszo !== this.jelszoujra) {
      this._errorservice.Error = 'A jelszó két példánya nem azonos!';
      return;
    }

    this.spinner = true;
    this.felhasznaloservice.JelszoCsere(this.regijelszo, this.jelszo)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.spinner = false;
        this._router.navigate(['../bejelentkezes'], {relativeTo: this._route});
      })
      .catch(err => {
        this.spinner = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this._router.navigate(['../fooldal'], {relativeTo: this._route});
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
