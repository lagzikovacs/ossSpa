import {Component, OnDestroy, ViewChild} from '@angular/core';
import {UgyfelterlogService} from './ugyfelterlog.service';
import {Szempont} from '../enums/szempont';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {SzMT} from '../dtos/szmt';
import {UgyfelterlogDto} from './ugyfelterlogdto';

@Component({
  selector: 'app-ugyfelterlog',
  templateUrl: './ugyfelterlog.component.html'
})
export class UgyfelterlogComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelterlogservice: UgyfelterlogService;
  eppFrissit = false;
  elsokereses = false;

  szurok = ['Id', 'Név'];

  szempontok = [
    Szempont.Kod, Szempont.Nev
  ];


  constructor(ugyfelterlogservice: UgyfelterlogService) {
    this.ugyfelterlogservice = ugyfelterlogservice;
  }

  onKereses() {
    this.ugyfelterlogservice.Dto = new Array<UgyfelterlogDto>();
    this.ugyfelterlogservice.DtoSelectedIndex = -1;
    this.ugyfelterlogservice.OsszesRekord = 0;

    this.elsokereses = true;
    this.ugyfelterlogservice.ulp.rekordtol = 0;
    this.ugyfelterlogservice.ulp.fi = new Array<SzMT>();

    this.ugyfelterlogservice.ulp.fi.push(new SzMT(this.szempontok[this.ugyfelterlogservice.szempont], this.ugyfelterlogservice.minta));

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugyfelterlogservice.Select(this.ugyfelterlogservice.ulp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.ugyfelterlogservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.ugyfelterlogservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.ugyfelterlogservice.Dto = buf;
        }
        this.ugyfelterlogservice.OsszesRekord = res.OsszesRekord;

        this.ugyfelterlogservice.ulp.rekordtol += this.ugyfelterlogservice.ulp.lapmeret;
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
