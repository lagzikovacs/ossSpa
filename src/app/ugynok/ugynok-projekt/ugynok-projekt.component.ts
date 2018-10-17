import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UgynokService} from '../ugynok.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../../projekt/projekt/projekt.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektDto} from '../../projekt/projekt/projektdto';

@Component({
  selector: 'app-feliratkozas-projekt',
  templateUrl: './ugynok-projekt.component.html',
  styleUrls: ['./ugynok-projekt.component.css']
})
export class FeliratkozasProjektComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  feliratkozasservice: UgynokService;
  projektservice: ProjektService;
  eppFrissit = false;

  constructor(feliratkozasservice: UgynokService,
              projektservice: ProjektService) {
    this.feliratkozasservice = feliratkozasservice;
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.feliratkozasservice.ProjektDto = new Array<ProjektDto>();

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
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
