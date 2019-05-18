import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatService} from '../../bizonylat.service';
import {LogonService} from '../../../logon/logon.service';
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
        this.bizonylatkifizetesservice.DtoEdited.DATUM = moment().toISOString(true);
        this.bizonylatkifizetesservice.DtoEdited.Datum = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].BRUTTO;
        this.bizonylatkifizetesservice.DtoEdited.Penznemkod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].PENZNEMKOD;
        this.bizonylatkifizetesservice.DtoEdited.Penznem = this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].PENZNEM;
        this.bizonylatkifizetesservice.DtoEdited.Fizetesimodkod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].FIZETESIMODKOD;
        this.bizonylatkifizetesservice.DtoEdited.Fizetesimod =
          this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].FIZETESIMOD;

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
