import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {PenztartetelService} from '../../penztartetel/penztartetel.service';
import {PenztartetelContainerMode} from '../../penztartetel/penztartetelcontainermode';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-penztar-egy',
  templateUrl: './penztar-egy.component.html',
  animations: [rowanimation]
})
export class PenztarEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  penztarservice: PenztarService;
  mod = false;
  nyitva = false;
  ri = -1;

  @Output() torlesutan = new EventEmitter<void>();

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
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
    this.nyitva = this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex].Nyitva;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.penztarservice.uj = false;
    this.penztarservice.DtoEdited = deepCopy(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }
  tetelek() {
    this.egymode = EgyMode.Tetelek;
    this._penztartetelservice.ContainerMode = PenztartetelContainerMode.List;
  }
  export() {
    this.egymode = EgyMode.Export;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.penztarservice.Delete(this.penztarservice.Dto[this.penztarservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penztarservice.Dto.splice(this.penztarservice.DtoSelectedIndex, 1);
        this.penztarservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.torlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.egymode = EgyMode.Reszletek;
  }

  EgyReszletek() {
    this.egymode = EgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
