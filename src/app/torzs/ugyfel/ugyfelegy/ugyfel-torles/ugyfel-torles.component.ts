import {Component, OnInit, ViewChild} from '@angular/core';
import {UgyfelService} from '../../../../services/torzs/ugyfel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-ugyfel-torles',
  templateUrl: './ugyfel-torles.component.html',
  styleUrls: ['./ugyfel-torles.component.css']
})
export class UgyfelTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    if (this.ugyfelservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.ugyfelservice.Delete(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ugyfelservice.Dto.splice(this.ugyfelservice.DtoSelectedIndex, 1);
        this.ugyfelservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../ugyfel'], {relativeTo: this._route});
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
