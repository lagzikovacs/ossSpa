import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-dokumentum-egy',
  templateUrl: './dokumentum-egy.component.html',
  animations: [rowanimation]
})
export class DokumentumEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  dokumentumservice: DokumentumService;

  @Output() eventTorlesutan = new EventEmitter<void>();

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
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  doReszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  doTorles() {
    this.egymode = EgyMode.Torles;
  }

  letoltes() {
    this.eppFrissit = true;
    this.dokumentumservice.Kimentes()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  letoltesPDF() {
    this.eppFrissit = true;
    this.dokumentumservice.KimentesPDF()
      .then(res => {
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.dokumentumservice.Delete(this.dokumentumservice.Dto[this.dokumentumservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.dokumentumservice.Dto.splice(this.dokumentumservice.DtoSelectedIndex, 1);
          this.dokumentumservice.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.eventTorlesutan.emit();
        })
        .catch(err => {
          this.eppFrissit = false;
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
