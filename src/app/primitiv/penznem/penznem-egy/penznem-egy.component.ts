import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {EgyMode} from '../../../enums/egymode';

@Component({
  selector: 'app-penznem-egy',
  templateUrl: './penznem-egy.component.html',
  animations: [rowanimation]
})
export class PenznemEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  penznemservice: PenznemService;
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
              penznemservice: PenznemService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.penznemservice = penznemservice;
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

      this.penznemservice.Delete(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.penznemservice.Dto.splice(this.penznemservice.DtoSelectedIndex, 1);
          this.penznemservice.DtoSelectedIndex = -1;

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
