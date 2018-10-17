import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EsemenynaploService} from './esemenynaplo.service';
import {ErrormodalComponent} from '../errormodal/errormodal.component';

@Component({
  selector: 'app-esemenynaplo',
  templateUrl: './esemenynaplo.component.html',
  styleUrls: ['./esemenynaplo.component.css']
})
export class EsemenynaploComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  esemenynaploservice: EsemenynaploService;
  eppFrissit = false;

  constructor(esemenynaploservice: EsemenynaploService) {
    this.esemenynaploservice = esemenynaploservice;
  }

  onKereses() {
    this.esemenynaploservice.elsokereses = true;
    this.esemenynaploservice.ep.rekordtol = 0;
    this.esemenynaploservice.ep.felhasznalokod = this.esemenynaploservice.Felhasznalokod;

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.esemenynaploservice.Select(this.esemenynaploservice.ep)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.esemenynaploservice.elsokereses) {
          this.esemenynaploservice.Dto = res.Result;
          this.esemenynaploservice.elsokereses = false;
        } else {
          const buf = [...this.esemenynaploservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.esemenynaploservice.Dto = buf;
        }
        this.esemenynaploservice.OsszesRekord = res.OsszesRekord;

        this.esemenynaploservice.ep.rekordtol += this.esemenynaploservice.ep.lapmeret;
        this.eppFrissit = false;
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
