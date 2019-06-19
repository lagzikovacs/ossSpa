import {Component, OnDestroy} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {FelhasznaloEgyMode} from '../felhasznaloegymode';
import {rowanimation} from '../../../animation/rowAnimation';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-felhasznalo-jelszo',
  templateUrl: './felhasznalo-jelszo.component.html',
  animations: [rowanimation]
})
export class FelhasznaloJelszoComponent implements OnDestroy {
  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;
  jelszo = '';
  jelszoujra = '';

  constructor(felhasznaloservice: FelhasznaloService,
              private _errorservice: ErrorService) {
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
        this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
      })
      .catch(err => {
        this._errorservice.Error = err;
        this.eppFrissit = false;
      });
  }

  cancel() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
