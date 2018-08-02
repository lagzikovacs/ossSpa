import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {HelysegService} from '../../../../../services/helyseg.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NumberResult} from '../../../../../dtos/numberresult';

@Component({
  selector: 'app-helyseg-szerkesztes',
  templateUrl: './helyseg-szerkesztes.component.html',
  styleUrls: ['./helyseg-szerkesztes.component.css']
})
export class HelysegSzerkesztesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              irattipusservice: HelysegService) {
    this.helysegservice = irattipusservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.helysegservice.uj) {
      p = this.helysegservice.Add(this.helysegservice.DtoEdited);
    } else {
      p = this.helysegservice.Update(this.helysegservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.helysegservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.helysegservice.uj) {
          this.helysegservice.Dto.unshift(res1.Result[0]);
        } else {
          this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.helysegservice.uj) {
      this._router.navigate(['../helyseg'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }
}
