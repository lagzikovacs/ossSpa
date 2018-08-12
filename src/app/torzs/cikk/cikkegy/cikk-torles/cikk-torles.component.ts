import {Component, OnInit, ViewChild} from '@angular/core';
import {CikkService} from "../../../../services/torzs/cikk.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrormodalComponent} from "../../../../tools/errormodal/errormodal.component";

@Component({
  selector: 'app-cikk-torles',
  templateUrl: './cikk-torles.component.html',
  styleUrls: ['./cikk-torles.component.css']
})
export class CikkTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              cikkservice: CikkService) {
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    if (this.cikkservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.cikkservice.Delete(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.Dto.splice(this.cikkservice.DtoSelectedIndex, 1);
        this.cikkservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../cikk'], {relativeTo: this._route});
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
