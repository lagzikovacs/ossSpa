import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {TeendoService} from '../teendo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NumberResult} from '../../dtos/numberresult';

@Component({
  selector: 'app-teendo-szerkesztes',
  templateUrl: './teendo-szerkesztes.component.html',
  styleUrls: ['./teendo-szerkesztes.component.css']
})
export class TeendoSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  teendoservice: TeendoService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.teendoservice.uj) {
      p = this.teendoservice.Add(this.teendoservice.DtoEdited);
    } else {
      p = this.teendoservice.Update(this.teendoservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.teendoservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.teendoservice.uj) {
          this.teendoservice.Dto.unshift(res1.Result[0]);
        } else {
          this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.teendoservice.uj) {
      this._router.navigate(['../teendo-list'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
