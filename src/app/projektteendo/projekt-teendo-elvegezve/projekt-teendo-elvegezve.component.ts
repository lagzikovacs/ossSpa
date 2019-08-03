import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {ProjektteendoService} from '../projektteendo.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektteendoDto} from '../projektteendodto';

@Component({
  selector: 'app-projekt-teendo-elvegezve',
  templateUrl: './projekt-teendo-elvegezve.component.html'
})
export class ProjektTeendoElvegezveComponent implements OnInit, OnDestroy {
  DtoEdited = new ProjektteendoDto();
  @Input() set DtoOriginal(value: ProjektteendoDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<ProjektteendoDto>();

  Elvegezve: any;

  eppFrissit = false;

  projektteendoservice: ProjektteendoService;

  constructor(private _errorservice: ErrorService,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Elvegezve = moment().format('YYYY-MM-DD');
  }

  onSubmit() {
    this.eppFrissit = true;

    this.DtoEdited.Elvegezve = moment(this.Elvegezve).toISOString(true);
    this.projektteendoservice.Update(this.DtoEdited)
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

      this.eppFrissit = false;
      this.eventSzerkeszteskesz.emit(res2.Result[0]);
    })
    .catch(err => {
      this.eppFrissit = false;
      this._errorservice.Error = err;
    });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
