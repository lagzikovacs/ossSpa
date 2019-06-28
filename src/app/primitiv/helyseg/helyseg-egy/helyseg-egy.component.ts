import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-helyseg-egy',
  templateUrl: './helyseg-egy.component.html',
  animations: [rowanimation]
})
export class HelysegEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  helysegservice: HelysegService;
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
              helysegservice: HelysegService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
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

      this.helysegservice.Delete(this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.helysegservice.Dto.splice(this.helysegservice.DtoSelectedIndex, 1);
          this.helysegservice.DtoSelectedIndex = -1;

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
