import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {CsoportService} from '../../../../services/segedeszkosz/csoport.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-csoport-torles',
  templateUrl: './csoport-torles.component.html',
  styleUrls: ['./csoport-torles.component.css']
})
export class CsoportTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  ngOnInit() {
    if (this.csoportservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.csoportservice.Delete(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.Dto.splice(this.csoportservice.DtoSelectedIndex, 1);
        this.csoportservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../csoport'], {relativeTo: this._route});
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
