import {Component, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../../../../services/eszkoz/penztar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-penztar-torles',
  templateUrl: './penztar-torles.component.html',
  styleUrls: ['./penztar-torles.component.css']
})
export class PenztarTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    if (this.penztarservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.penztarservice.Delete(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penztarservice.Dto.splice(this.penztarservice.DtoSelectedIndex, 1);
        this.penztarservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../penztar'], {relativeTo: this._route});
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
