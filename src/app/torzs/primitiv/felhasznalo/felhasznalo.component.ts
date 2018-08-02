import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../../../services/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-felhasznalo',
  templateUrl: './felhasznalo.component.html',
  styleUrls: ['./felhasznalo.component.css']
})
export class FelhasznaloComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Név'];

  eppFrissit = false;
  felhasznaloservice: FelhasznaloService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  onKereses() {
    this.felhasznaloservice.elsokereses = true;
    this.felhasznaloservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.felhasznaloservice.Read(this.felhasznaloservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.felhasznaloservice.elsokereses) {
          this.felhasznaloservice.Dto = res.Result;
          this.felhasznaloservice.elsokereses = false;
        } else {
          const buf = [...this.felhasznaloservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.felhasznaloservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setClickedRow(i: number) {
    this.felhasznaloservice.DtoSelectedIndex = i;
    this.felhasznaloservice.uj = false;
    this._router.navigate(['../felhasznaloegy'], {relativeTo: this._route});
  }

  uj() {
    this.eppFrissit = true;
    this.felhasznaloservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.felhasznaloservice.uj = true;
        this.felhasznaloservice.DtoEdited = res.Result[0];
        this.felhasznaloservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../felhasznalouj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
