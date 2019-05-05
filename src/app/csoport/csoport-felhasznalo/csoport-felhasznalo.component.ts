import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportFelhasznaloParameter} from '../csoportfelhasznaloparameter';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-csoport-felhasznalo',
  templateUrl: './csoport-felhasznalo.component.html',
  styleUrls: ['./csoport-felhasznalo.component.css']
})
export class CsoportFelhasznaloComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  felhasznalo(i: number) {
    this.eppFrissit = true;

    const par = new CsoportFelhasznaloParameter(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex].Csoportkod,
      this.csoportservice.DtoCsoportFelhasznalo[i].Felhasznalokod, !this.csoportservice.DtoCsoportFelhasznalo[i].Csoporttag);

    this.csoportservice.CsoportFelhasznaloBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportFelhasznalo[i].Csoporttag = !this.csoportservice.DtoCsoportFelhasznalo[i].Csoporttag;
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
