import {IrattipusService} from '../irattipus.service';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-irattipus-szerkesztes',
  templateUrl: './irattipus-szerkesztes.component.html'
})
export class IrattipusSzerkesztesComponent implements OnInit, OnDestroy {
  irattipusservice: IrattipusService;

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

  constructor(irattipusservice: IrattipusService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.irattipusservice = irattipusservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.irattipusservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.irattipusservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.irattipusservice.DtoEdited = deepCopy(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.irattipusservice.Add(this.irattipusservice.DtoEdited);
    } else {
      p = this.irattipusservice.Update(this.irattipusservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.irattipusservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.irattipusservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
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
