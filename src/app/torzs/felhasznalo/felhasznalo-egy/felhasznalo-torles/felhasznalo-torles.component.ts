import {Component, OnInit, ViewChild} from '@angular/core';
import {FelhasznaloService} from '../../../../services/torzs/primitiv/felhasznalo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-felhasznalo-torles',
  templateUrl: './felhasznalo-torles.component.html',
  styleUrls: ['./felhasznalo-torles.component.css']
})
export class FelhasznaloTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  felhasznaloservice: FelhasznaloService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  ngOnInit() {
    if (this.felhasznaloservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.felhasznaloservice.Delete(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.felhasznaloservice.Dto.splice(this.felhasznaloservice.DtoSelectedIndex, 1);
        this.felhasznaloservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../felhasznalo'], {relativeTo: this._route});
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
