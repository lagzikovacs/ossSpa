import {Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-csoport-list',
  templateUrl: './csoport-list.component.html'
})
export class CsoportListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  csoportservice: CsoportService;
  szurok = ['Csoport'];

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  onKereses() {
    this.csoportservice.elsokereses = true;
    this.csoportservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.csoportservice.Read(this.csoportservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.csoportservice.elsokereses) {
          this.csoportservice.Dto = res.Result;
          this.csoportservice.elsokereses = false;
        } else {
          const buf = [...this.csoportservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.csoportservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.csoportservice.DtoSelectedIndex = i;
    if (this.csoportservice.DtoSelectedIndex === -1) {
      return;
    }

    this.eppFrissit = true;
    this.csoportservice.SelectCsoportFelhasznalo(this.csoportservice.Dto[i].Csoportkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportFelhasznalo = res.Result;

        return this.csoportservice.SelectCsoportJog(this.csoportservice.Dto[i].Csoportkod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.csoportservice.DtoCsoportLehetsegesJog = res1.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
