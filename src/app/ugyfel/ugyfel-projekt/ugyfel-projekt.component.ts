import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {ProjektService} from '../../projekt/projekt/projekt.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektDto} from '../../projekt/projekt/projektdto';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';

@Component({
  selector: 'app-ugyfel-projekt',
  templateUrl: './ugyfel-projekt.component.html',
  styleUrls: ['./ugyfel-projekt.component.css']
})
export class UgyfelProjektComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  eppFrissit = false;

  constructor(private _projektservice: ProjektService,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    this.ugyfelservice.ProjektDto = new Array<ProjektDto>();

    this.ugyfelservice.pp.fi = new Array<SzMT>();
    this.ugyfelservice.pp.fi.push(
      new SzMT(Szempont.UgyfelKod, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex].Ugyfelkod.toString()));

    this._projektservice.Select(this.ugyfelservice.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ugyfelservice.ProjektDto = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
