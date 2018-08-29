import {Component, ViewChild} from '@angular/core';
import {FelhasznaloService} from '../../../felhasznalo/felhasznalo.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-jelszocsere',
  templateUrl: './jelszocsere.component.html',
  styleUrls: ['./jelszocsere.component.css']
})
export class JelszocsereComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;
  regijelszo = '';
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
    this.felhasznaloservice.JelszoCsere(this.regijelszo, this.jelszo)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this._router.navigate(['../fooldal'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  cancel() {
    this._router.navigate(['../fooldal'], {relativeTo: this._route});
  }
}
