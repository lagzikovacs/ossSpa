import {Component, OnInit, ViewChild} from '@angular/core';
import {MeService} from '../../../../../services/torzs/primitiv/me.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-me-torles',
  templateUrl: './me-torles.component.html',
  styleUrls: ['./me-torles.component.css']
})
export class MeTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              meservice: MeService) {
    this.meservice = meservice;
  }

  ngOnInit() {
    if (this.meservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.meservice.Delete(this.meservice.Dto[this.meservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.meservice.Dto.splice(this.meservice.DtoSelectedIndex, 1);
        this.meservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../me'], {relativeTo: this._route});
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
