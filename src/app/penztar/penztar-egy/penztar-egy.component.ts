import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {PenztartetelService} from '../../penztartetel/penztartetel.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-penztar-egy',
  templateUrl: './penztar-egy.component.html',
  animations: [rowanimation]
})
export class PenztarEgyComponent implements OnDestroy {
  egymode = EgyMode.Tetelek;
  penztarservice: PenztarService;
  jog = false;
  nyitva = false;

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
              penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Nyitva;
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
  doTetelek() {
    this.egymode = EgyMode.Tetelek;
  }
  doExport() {
    this.egymode = EgyMode.Export;
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.penztarservice.Delete(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.penztarservice.Dto.splice(this.penztarservice.DtoSelectedIndex, 1);
          this.penztarservice.DtoSelectedIndex = -1;

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
