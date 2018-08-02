import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FelhasznaloService} from '../../../../../services/felhasznalo.service';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';

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

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              felhasznaloservice: FelhasznaloService) {
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

        this.eppFrissit = false;
        this._router.navigate(['../blank'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  cancel() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
