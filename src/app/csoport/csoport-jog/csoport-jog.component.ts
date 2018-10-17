import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {CsoportJogParameter} from '../csoportjogparameter';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-csoport-jog',
  templateUrl: './csoport-jog.component.html',
  styleUrls: ['./csoport-jog.component.css']
})
export class CsoportJogComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  jog(i: number) {
    this.eppFrissit = true;

    const par = new CsoportJogParameter(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex].CSOPORTKOD,
      this.csoportservice.DtoCsoportLehetsegesJog[i].LEHETSEGESJOGKOD, !this.csoportservice.DtoCsoportLehetsegesJog[i].CSOPORTTAG);

    this.csoportservice.CsoportJogBeKi(par)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportLehetsegesJog[i].CSOPORTTAG = !this.csoportservice.DtoCsoportLehetsegesJog[i].CSOPORTTAG;
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
