import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {HelysegDto} from '../helysegdto';

@Component({
  selector: 'app-helyseg-szerkesztes',
  templateUrl: './helyseg-szerkesztes.component.html'
})
export class HelysegSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new HelysegDto();
  @Input() set DtoOriginal(value: HelysegDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<HelysegDto>();

  eppFrissit = false;

  helysegservice: HelysegService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.spinnerservice.eppFrissit = true;
      this.helysegservice.CreateNew()
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
      p = this.helysegservice.Add(this.DtoEdited);
    } else {
      p = this.helysegservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.helysegservice.Get(res.Result);
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
