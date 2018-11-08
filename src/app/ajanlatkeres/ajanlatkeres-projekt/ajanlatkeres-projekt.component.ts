import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../../projekt/projekt/projekt.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {ProjektDto} from '../../projekt/projekt/projektdto';

@Component({
  selector: 'app-ajanlatkeres-projekt',
  templateUrl: './ajanlatkeres-projekt.component.html',
  styleUrls: ['./ajanlatkeres-projekt.component.css']
})
export class AjanlatkeresProjektComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ajanlatkeresservice: AjanlatkeresService;
  projektservice: ProjektService;
  eppFrissit = false;

  constructor(ajanlatkeresservice: AjanlatkeresService,
              projektservice: ProjektService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.ajanlatkeresservice.ProjektDto = new Array<ProjektDto>();

    this.ajanlatkeresservice.pp.fi = new Array<SzMT>();
    this.ajanlatkeresservice.pp.fi.push(
      new SzMT(Szempont.UgyfelEmail, this.ajanlatkeresservice.Dto[this.ajanlatkeresservice.DtoSelectedIndex].EMAIL));

    this.projektservice.Select(this.ajanlatkeresservice.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ajanlatkeresservice.ProjektDto = res.Result;

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
