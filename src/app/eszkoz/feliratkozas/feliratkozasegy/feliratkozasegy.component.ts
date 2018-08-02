import {Component, ViewChild} from '@angular/core';
import {FeliratkozasService} from '../../../services/feliratkozas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ProjektService} from '../../../services/projekt.service';
import {SzMT} from "../../../dtos/szmt";
import {Szempont} from "../../../enums/szempont";

@Component({
  selector: 'app-feliratkozasegy',
  templateUrl: './feliratkozasegy.component.html',
  styleUrls: ['./feliratkozasegy.component.css']
})
export class FeliratkozasegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  feliratkozasservice: FeliratkozasService;
  projektservice: ProjektService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              feliratkozasservice: FeliratkozasService,
              projektservice: ProjektService) {
    this.feliratkozasservice = feliratkozasservice;
    this.projektservice = projektservice;
  }

  vissza() {
    this._router.navigate(['../feliratkozas'], {relativeTo: this._route});
  }
  projekt() {
    this.feliratkozasservice.pp.fi = new Array<SzMT>();
    this.feliratkozasservice.pp.fi.push(
      new SzMT(Szempont.UgyfelEmail, this.feliratkozasservice.Dto[this.feliratkozasservice.DtoSelectedIndex].EMAIL));

    this.projektservice.Select(this.feliratkozasservice.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.feliratkozasservice.ProjektDto = res.Result;

        this.eppFrissit = false;
        this._router.navigate(['projekt'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
