import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {MeService} from '../../../../../services/torzs/primitiv/me.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NumberResult} from '../../../../../dtos/numberresult';

@Component({
  selector: 'app-me-szerkesztes',
  templateUrl: './me-szerkesztes.component.html',
  styleUrls: ['./me-szerkesztes.component.css']
})
export class MeSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              meservice: MeService) {
    this.meservice = meservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.meservice.uj) {
      p = this.meservice.Add(this.meservice.DtoEdited);
    } else {
      p = this.meservice.Update(this.meservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.meservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.meservice.uj) {
          this.meservice.Dto.unshift(res1.Result[0]);
        } else {
          this.meservice.Dto[this.meservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.meservice.uj) {
      this._router.navigate(['../me'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
