import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';
import {HelysegService} from '../../../../../services/torzs/primitiv/helyseg.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-helyseg-torles',
  templateUrl: './helyseg-torles.component.html',
  styleUrls: ['./helyseg-torles.component.css']
})
export class HelysegTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              irattipusservice: HelysegService) {
    this.helysegservice = irattipusservice;
  }

  ngOnInit() {
    if (this.helysegservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.helysegservice.Delete(this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.helysegservice.Dto.splice(this.helysegservice.DtoSelectedIndex, 1);
        this.helysegservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../helyseg'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
