import {IrattipusService} from '../../../../../services/irattipus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NumberResult} from '../../../../../dtos/numberresult';

@Component({
  selector: 'app-irattipus-szerkesztes',
  templateUrl: './irattipus-szerkesztes.component.html',
  styleUrls: ['./irattipus-szerkesztes.component.css']
})
export class IrattipusSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.irattipusservice.uj) {
      p = this.irattipusservice.Add(this.irattipusservice.DtoEdited);
    } else {
      p = this.irattipusservice.Update(this.irattipusservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.irattipusservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.irattipusservice.uj) {
          this.irattipusservice.Dto.unshift(res1.Result[0]);
        } else {
          this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.irattipusservice.uj) {
      this._router.navigate(['../irattipus'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
