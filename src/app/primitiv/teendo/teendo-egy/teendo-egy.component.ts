import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-teendo-egy',
  templateUrl: './teendo-egy.component.html',
  animations: [rowanimation]
})
export class TeendoEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  teendoservice: TeendoService;
  jog = false;

  @Output() eventTorlesutan = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              teendoservice: TeendoService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
  }

  doReszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  doTorles () {
    this.egymode = EgyMode.Torles;
  }
  doModositas() {
    this.egymode = EgyMode.Modositas;
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.teendoservice.Delete(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.teendoservice.Dto.splice(this.teendoservice.DtoSelectedIndex, 1);
          this.teendoservice.DtoSelectedIndex = -1;

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

  onModositaskesz() {
    this.egymode = EgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
