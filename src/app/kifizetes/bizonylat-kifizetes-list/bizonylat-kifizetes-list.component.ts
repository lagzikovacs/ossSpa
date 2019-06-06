import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {LogonService} from '../../logon/logon.service';
import {BizonylatKifizetesContainerMode} from '../bizonylatkifizetescontainermode';
import {BizonylatKifizetesEgyMode} from '../bizonylatkifizetesegymode';
import {BizonylatKifizetesSzerkesztesMode} from '../bizonylatkifizetesszerkesztesmode';
import * as moment from 'moment';

@Component({
  selector: 'app-bizonylat-kifizetes-list',
  templateUrl: './bizonylat-kifizetes-list.component.html',
  styleUrls: ['./bizonylat-kifizetes-list.component.css']
})
export class BizonylatKifizetesListComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;
  ti = -1;

  constructor(private _logonservice: LogonService,
              private _bizonylatservice: BizonylatService,
              bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  kereses() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.Select(this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        this.eppFrissit = false;

        this.bizonylatkifizetesservice.Dto = res.Result;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  setClickedRow(i: number) {
    this.bizonylatkifizetesservice.DtoSelectedIndex = i;
    this.bizonylatkifizetesservice.uj = false;
    this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.Egy;
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Reszletek;
  }
  uj() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.bizonylatkifizetesservice.uj = true;
        this.bizonylatkifizetesservice.DtoSelectedIndex = -1;

        this.bizonylatkifizetesservice.DtoEdited = res.Result[0];
        this.bizonylatkifizetesservice.DtoEdited.Datum = moment().toISOString(true);
        this.bizonylatkifizetesservice.DtoEdited.Osszeg = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Brutto;
        this.bizonylatkifizetesservice.DtoEdited.Penznemkod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Penznemkod;
        this.bizonylatkifizetesservice.DtoEdited.Penznem = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Penznem;
        this.bizonylatkifizetesservice.DtoEdited.Fizetesimodkod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Fizetesimodkod;
        this.bizonylatkifizetesservice.DtoEdited.Fizetesimod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Fizetesimod;

        this.eppFrissit = false;

        this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.Uj;
        this.bizonylatkifizetesservice.SzerkesztesMode = BizonylatKifizetesSzerkesztesMode.Blank;
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
