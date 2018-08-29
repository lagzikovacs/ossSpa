import {Component, ViewChild} from '@angular/core';
import {PenznemService} from "../penznem.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrormodalComponent} from "../../tools/errormodal/errormodal.component";
import {NumberResult} from "../../dtos/numberresult";

@Component({
  selector: 'app-penznem-szerkesztes',
  templateUrl: './penznem-szerkesztes.component.html',
  styleUrls: ['./penznem-szerkesztes.component.css']
})
export class PenznemSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.penznemservice.uj) {
      p = this.penznemservice.Add(this.penznemservice.DtoEdited);
    } else {
      p = this.penznemservice.Update(this.penznemservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.penznemservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.penznemservice.uj) {
          this.penznemservice.Dto.unshift(res1.Result[0]);
        } else {
          this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.penznemservice.uj) {
      this._router.navigate(['../penznem-list'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
