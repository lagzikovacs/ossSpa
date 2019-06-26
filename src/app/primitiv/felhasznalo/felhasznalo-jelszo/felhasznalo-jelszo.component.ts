import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {rowanimation} from '../../../animation/rowAnimation';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';

@Component({
  selector: 'app-felhasznalo-jelszo',
  templateUrl: './felhasznalo-jelszo.component.html',
  animations: [rowanimation]
})
export class FelhasznaloJelszoComponent implements OnDestroy {
  felhasznaloservice: FelhasznaloService;
  jelszo = '';
  jelszoujra = '';

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(felhasznaloservice: FelhasznaloService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  onSubmit() {
    if (this.jelszo !== this.jelszoujra) {
      this._errorservice.Error = 'A jelszó két példánya nem azonos!';
      return;
    }

    this.eppFrissit = true;
    this.felhasznaloservice.JelszoBeallitas(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].Felhasznalokod,
      this.jelszo, this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].Modositva)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].Felhasznalokod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex] = res1.Result[0];

        this.eppFrissit = false;
        this.KontenerKeres.emit();
      })
      .catch(err => {
        this._errorservice.Error = err;
        this.eppFrissit = false;
      });
  }

  cancel() {
    this.KontenerKeres.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
