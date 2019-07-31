import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {SzamlazasirendDto} from '../szamlazasirenddto';
import {EgyMode} from '../../enums/egymode';
import {propCopy} from '../../tools/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-szamlazasirend-list',
  templateUrl: './szamlazasirend-list.component.html',
  animations: [rowanimation]
})
export class SzamlazasirendListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() Projektkod = -1;

  Dto = new Array<SzamlazasirendDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  szamlazasirendservice: SzamlazasirendService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.tabla.clearselections();

    this.spinnerservice.eppFrissit = true;
    this.szamlazasirendservice.Select(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: SzamlazasirendDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: SzamlazasirendDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.spinnerservice.eppFrissit = true;

      this.szamlazasirendservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.spinnerservice.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
