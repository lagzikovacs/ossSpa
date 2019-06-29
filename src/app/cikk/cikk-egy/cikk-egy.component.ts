import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {CikkService} from '../cikk.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkMozgasParameter} from '../cikkmozgasparameter';
import {CikkSzerkesztesMode} from '../cikkszerkesztesmode';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-cikk-egy',
  templateUrl: './cikk-egy.component.html',
  animations: [rowanimation]
})
export class CikkEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  cikkservice: CikkService;
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
              cikkservice: CikkService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
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
  doBeszerzes() {
    this.cikkservice.BizonylattipusKod = 3;
    this.beszerzeskivet();
  }
  doKivet() {
    this.cikkservice.BizonylattipusKod = 2;
    this.beszerzeskivet();
  }
  beszerzeskivet() {
    this.eppFrissit = true;
    this.cikkservice.Mozgas(new CikkMozgasParameter(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex].Cikkkod,
      this.cikkservice.BizonylattipusKod))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.MozgasDto = res.Result;

        this.eppFrissit = false;
        this.egymode = EgyMode.BeszerzesKivet;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.cikkservice.Delete(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.cikkservice.Dto.splice(this.cikkservice.DtoSelectedIndex, 1);
          this.cikkservice.DtoSelectedIndex = -1;

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
