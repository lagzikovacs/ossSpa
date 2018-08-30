import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../felhasznalo.service';
import {FelhasznaloEgyMode} from '../felhasznaloegymode';

@Component({
  selector: 'app-felhasznalo-jelszo',
  templateUrl: './felhasznalo-jelszo.component.html',
  styleUrls: ['./felhasznalo-jelszo.component.css']
})
export class FelhasznaloJelszoComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;
  jelszo = '';
  jelszoujra = '';

  constructor(felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  onSubmit() {
    if (this.jelszo !== this.jelszoujra) {
      this.errormodal.show('A jelszó két példánya nem azonos!');
      return;
    }

    this.eppFrissit = true;
    this.felhasznaloservice.JelszoBeallitas(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].FELHASZNALOKOD,
      this.jelszo, this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].MODOSITVA)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex].FELHASZNALOKOD);
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  cancel() {
    this.felhasznaloservice.EgyMode = FelhasznaloEgyMode.Reszletek;
  }
}
