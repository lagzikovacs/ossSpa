import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {FelhasznaloService} from '../../../../../services/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NumberResult} from '../../../../../dtos/numberresult';

@Component({
  selector: 'app-felhasznalo-szerkesztes',
  templateUrl: './felhasznalo-szerkesztes.component.html',
  styleUrls: ['./felhasznalo-szerkesztes.component.css']
})
export class FelhasznaloSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.felhasznaloservice.uj) {
      p = this.felhasznaloservice.Add(this.felhasznaloservice.DtoEdited);
    } else {
      p = this.felhasznaloservice.Update(this.felhasznaloservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.felhasznaloservice.uj) {
          this.felhasznaloservice.Dto.unshift(res1.Result[0]);
        } else {
          this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex] = res1.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.felhasznaloservice.uj) {
      this._router.navigate(['../felhasznalo'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
