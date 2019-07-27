import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../../primitiv/felhasznalo/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-jelszocsere',
  templateUrl: './jelszocsere.component.html'
})
export class JelszocsereComponent implements OnDestroy {
  regijelszo = '';
  jelszo = '';
  jelszoujra = '';

  felhasznaloservice: FelhasznaloService;
  spinnerservice: SpinnerService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
    this.spinnerservice = spinnerservice;
  }

  onSubmit() {
    if (this.jelszo !== this.jelszoujra) {
      this._errorservice.Error = 'A jelszó két példánya nem azonos!';
      return;
    }

    this.spinnerservice.eppFrissit = true;
    this.felhasznaloservice.JelszoCsere(this.regijelszo, this.jelszo)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.spinnerservice.eppFrissit = false;
        this._router.navigate(['../fooldal'], {relativeTo: this._route});
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
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
