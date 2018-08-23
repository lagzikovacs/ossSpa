import {Component, OnInit, ViewChild} from '@angular/core';
import {FeliratkozasService} from '../../../../services/eszkoz/feliratkozas.service';
import {Szempont} from '../../../../enums/szempont';
import {SzMT} from '../../../../dtos/szmt';
import {ProjektService} from '../../../../services/eszkoz/projekt/projekt.service';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {ProjektDto} from '../../../../dtos/projekt/projektdto';

@Component({
  selector: 'app-feliratkozas-projekt',
  templateUrl: './feliratkozas-projekt.component.html',
  styleUrls: ['./feliratkozas-projekt.component.css']
})
export class FeliratkozasProjektComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  feliratkozasservice: FeliratkozasService;
  projektservice: ProjektService;
  eppFrissit = false;

  constructor(feliratkozasservice: FeliratkozasService,
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
}
