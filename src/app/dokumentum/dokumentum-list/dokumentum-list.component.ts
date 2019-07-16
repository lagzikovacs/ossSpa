import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumDto} from '../dokumentumdto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {EgyMode} from '../../enums/egymode';
import {propCopy} from '../../tools/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-dokumentum-list',
  templateUrl: './dokumentum-list.component.html',
  animations: [rowanimation]
})
export class DokumentumListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  elsokereses = true;

  Dto = new Array<DokumentumDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  @Input() Iratkod = -1;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.Dto = new Array<DokumentumDto>();
    this.DtoSelectedIndex = -1;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.dokumentumservice.Select(this.Iratkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.elsokereses = false;

        this.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
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
  onUjtetelkesz(dto: DokumentumDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: DokumentumDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.dokumentumservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  onLetoltesDirekt(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Reszletek;
    this.onLetoltes();
  }
  onLetoltes() {
    this.eppFrissit = true;
    this.dokumentumservice.Kimentes(this.Dto[this.DtoSelectedIndex])
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onLetoltesPDF() {
    this.eppFrissit = true;
    this.dokumentumservice.KimentesPDF(this.Dto[this.DtoSelectedIndex])
      .then(res => {
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
