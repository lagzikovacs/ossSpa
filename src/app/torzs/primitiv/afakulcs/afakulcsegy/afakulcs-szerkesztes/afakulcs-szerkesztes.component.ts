import {Component, ViewChild} from '@angular/core';
import {AfakulcsService} from '../../../../../services/torzs/primitiv/afakulcs.service';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NumberResult} from '../../../../../dtos/numberresult';

@Component({
  selector: 'app-afakulcs-szerkesztes',
  templateUrl: './afakulcs-szerkesztes.component.html',
  styleUrls: ['./afakulcs-szerkesztes.component.css']
})
export class AfakulcsSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.afakulcsservice.uj) {
      p = this.afakulcsservice.Add(this.afakulcsservice.DtoEdited);
    } else {
      p = this.afakulcsservice.Update(this.afakulcsservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.afakulcsservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.afakulcsservice.uj) {
          this.afakulcsservice.Dto.unshift(res1.Result[0]);
        } else {
          this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.afakulcsservice.uj) {
      this._router.navigate(['../afakulcs'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
