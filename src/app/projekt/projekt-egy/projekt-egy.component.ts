import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-projekt-egy',
  templateUrl: './projekt-egy.component.html',
  animations: [rowanimation]
})
export class ProjektEgyComponent implements OnDestroy {
  egymode = EgyMode.Bizonylatesirat;
  projektservice: ProjektService;
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
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektservice: ProjektService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);
    this.projektservice = projektservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles () {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.egymode = EgyMode.Modositas;
  }
  onModositaskesz() {
    this.egymode = EgyMode.Reszletek;
  }

  stsz() {
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Statusz;
  }
  muszakiallapot() {
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Muszakiallapot;
  }
  inverter() {
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Inverter;
  }
  napelem() {
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Napelem;
  }
  iratminta() {
    this.egymode = EgyMode.Iratminta;
  }
  onMunkalaputan() {
    // TODO a munkalap írja a projektet, újra kell olvasni
  }
  datumok() {
    this.projektservice.DtoEdited = deepCopy(this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Datumok;
  }
  bizonylatesirat() {
    this.egymode = EgyMode.Bizonylatesirat;
  }
  szamlazasirend() {
    this.egymode = EgyMode.Szamlazasirend;
  }
  teendo() {
    this.egymode = EgyMode.Teendo;
  }

  SegedOk() {
    this.eppFrissit = true;
    this.projektservice.Update(this.projektservice.DtoEdited)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this.projektservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        propCopy(res1.Result[0], this.projektservice.Dto[this.projektservice.DtoSelectedIndex]);

        this.eppFrissit = false;
        this.egymode = EgyMode.Reszletek;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  SegedCancel() {
    this.egymode = EgyMode.Reszletek;
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.projektservice.Delete(this.projektservice.Dto[this.projektservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.projektservice.Dto.splice(this.projektservice.DtoSelectedIndex, 1);
          this.projektservice.DtoSelectedIndex = -1;

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
