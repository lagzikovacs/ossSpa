import {Component, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportFelhasznaloParameter} from '../csoportfelhasznaloparameter';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-csoport-felhasznalo',
  templateUrl: './csoport-felhasznalo.component.html',
  styleUrls: ['./csoport-felhasznalo.component.css']
})
export class CsoportFelhasznaloComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  felhasznalo(i: number) {
    this.eppFrissit = true;

    const par = new CsoportFelhasznaloParameter(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex].CSOPORTKOD,
      this.csoportservice.DtoCsoportFelhasznalo[i].FELHASZNALOKOD, !this.csoportservice.DtoCsoportFelhasznalo[i].CSOPORTTAG);

    this.csoportservice.CsoportFelhasznaloBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportFelhasznalo[i].CSOPORTTAG = !this.csoportservice.DtoCsoportFelhasznalo[i].CSOPORTTAG;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
