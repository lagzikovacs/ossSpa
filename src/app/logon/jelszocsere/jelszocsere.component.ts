import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../../primitiv/felhasznalo/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-jelszocsere',
  templateUrl: './jelszocsere.component.html'
})
export class JelszocsereComponent implements OnDestroy {
  regijelszo = '';
  jelszo = '';
  jelszoujra = '';

  eppFrissit = false;

  felhasznaloservice: FelhasznaloService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _errorservice: ErrorService,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  onSubmit() {
    if (this.jelszo !== this.jelszoujra) {
      this._errorservice.Error = 'A jelszó két példánya nem azonos!';
      return;
    }

    this.eppFrissit = true;
    this.felhasznaloservice.JelszoCsere(this.regijelszo, this.jelszo)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this._router.navigate(['../fooldal'], {relativeTo: this._route});
      })
      .catch(err => {
        this.eppFrissit = false;
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
