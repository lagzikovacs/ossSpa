import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-helyseg-szerkesztes',
  templateUrl: './helyseg-szerkesztes.component.html'
})
export class HelysegSzerkesztesComponent implements OnInit, OnDestroy {
  helysegservice: HelysegService;

  @Input() uj = false;
  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(helysegservice: HelysegService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.helysegservice = helysegservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.helysegservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.helysegservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.helysegservice.DtoEdited = deepCopy(this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.helysegservice.Add(this.helysegservice.DtoEdited);
    } else {
      p = this.helysegservice.Update(this.helysegservice.DtoEdited);
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

        if (this.uj) {
          this.helysegservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex]);
        }

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
