import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MeService} from '../me.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {MeDto} from '../medto';

@Component({
  selector: 'app-me-szerkesztes',
  templateUrl: './me-szerkesztes.component.html'
})
export class MeSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new MeDto();
  @Input() set DtoOriginal(value: MeDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<MeDto>();

  meservice: MeService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              meservice: MeService) {
    this.meservice = meservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.spinnerservice.eppFrissit = true;
      this.meservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.spinnerservice.eppFrissit = false;
        })
        .catch(err => {
          this.spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.spinnerservice.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.meservice.Add(this.DtoEdited);
    } else {
      p = this.meservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.meservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.spinnerservice.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
