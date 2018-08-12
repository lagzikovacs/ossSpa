import {Component, ViewChild} from '@angular/core';
import {FizetesimodService} from '../../../../../services/torzs/primitiv/fizetesimod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {NumberResult} from '../../../../../dtos/numberresult';

@Component({
  selector: 'app-fizetesimod-szerkesztes',
  templateUrl: './fizetesimod-szerkesztes.component.html',
  styleUrls: ['./fizetesimod-szerkesztes.component.css']
})
export class FizetesimodSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.fizetesimodservice.uj) {
      p = this.fizetesimodservice.Add(this.fizetesimodservice.DtoEdited);
    } else {
      p = this.fizetesimodservice.Update(this.fizetesimodservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.fizetesimodservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.fizetesimodservice.uj) {
          this.fizetesimodservice.Dto.unshift(res1.Result[0]);
        } else {
          this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.fizetesimodservice.uj) {
      this._router.navigate(['../fizetesimod'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
