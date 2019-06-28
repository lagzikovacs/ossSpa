import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';

@Component({
  selector: 'app-afakulcs-szerkesztes',
  templateUrl: './afakulcs-szerkesztes.component.html'
})
export class AfakulcsSzerkesztesComponent implements OnInit, OnDestroy {
  afakulcsservice: AfakulcsService;

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

  constructor(afakulcsservice: AfakulcsService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.afakulcsservice = afakulcsservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.afakulcsservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.afakulcsservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.afakulcsservice.DtoEdited = deepCopy(this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.afakulcsservice.Add(this.afakulcsservice.DtoEdited);
    } else {
      p = this.afakulcsservice.Update(this.afakulcsservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.afakulcsservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.afakulcsservice.Dto.unshift(res1.Result[0]);
        } else {
          this.afakulcsservice.Dto[this.afakulcsservice.DtoSelectedIndex] = res1.Result[0];
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
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
