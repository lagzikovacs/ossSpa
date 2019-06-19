import {Component, OnDestroy, OnInit} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektDto} from '../../projekt/projektdto';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-ajanlatkeres-projekt',
  templateUrl: './ajanlatkeres-projekt.component.html'
})
export class AjanlatkeresProjektComponent implements OnInit, OnDestroy {
  ajanlatkeresservice: AjanlatkeresService;
  projektservice: ProjektService;
  eppFrissit = false;

  constructor(ajanlatkeresservice: AjanlatkeresService,
              projektservice: ProjektService,
              private _errorservice: ErrorService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
    this.projektservice = projektservice;
  }

  ngOnInit() {
    this.ajanlatkeresservice.ProjektDto = new Array<ProjektDto>();

    this.ajanlatkeresservice.pp.fi = new Array<SzMT>();
    this.ajanlatkeresservice.pp.fi.push(
      new SzMT(Szempont.UgyfelEmail, this.ajanlatkeresservice.Dto[this.ajanlatkeresservice.DtoSelectedIndex].Email));

    this.projektservice.Select(this.ajanlatkeresservice.pp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ajanlatkeresservice.ProjektDto = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
