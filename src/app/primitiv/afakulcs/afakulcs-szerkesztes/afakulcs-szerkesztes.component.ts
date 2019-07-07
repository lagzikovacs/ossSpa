import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {AfakulcsDto} from '../afakulcsdto';

@Component({
  selector: 'app-afakulcs-szerkesztes',
  templateUrl: './afakulcs-szerkesztes.component.html'
})
export class AfakulcsSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new AfakulcsDto();
  @Input() set DtoOriginal(value: AfakulcsDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<AfakulcsDto>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  afakulcsservice: AfakulcsService;

  constructor(private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService,
              afakulcsservice: AfakulcsService) {
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

          this.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.afakulcsservice.Add(this.DtoEdited);
    } else {
      p = this.afakulcsservice.Update(this.DtoEdited);
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

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
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
