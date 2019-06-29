import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {ProjektteendoService} from '../projektteendo.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {propCopy} from '../../tools/propCopy';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-projekt-teendo-elvegezve',
  templateUrl: './projekt-teendo-elvegezve.component.html'
})
export class ProjektTeendoElvegezveComponent implements OnInit, OnDestroy {
  projektteendoservice: ProjektteendoService;
  Elvegezve: any;

  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(projektteendoservice: ProjektteendoService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Elvegezve = moment().format('YYYY-MM-DD');

    this.projektteendoservice.DtoEdited = deepCopy(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);
  }

  onSubmit() {
    this.eppFrissit = true;

    this.projektteendoservice.DtoEdited.Elvegezve = moment(this.Elvegezve).toISOString(true);
    this.projektteendoservice.Update(this.projektteendoservice.DtoEdited)
    .then(res1 => {
      if (res1.Error !== null) {
        throw res1.Error;
      }

      return this.projektteendoservice.Get(res1.Result);
    })
    .then(res2 => {
      if (res2.Error !== null) {
        throw res2.Error;
      }

      propCopy(res2.Result[0], this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex]);

      this.eppFrissit = false;
      this.eventSzerkeszteskesz.emit();
    })
    .catch(err => {
      this.eppFrissit = false;
      this._errorservice.Error = err;
    });
  }

  cancel() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
