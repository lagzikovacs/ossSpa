import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {NumberResult} from '../../dtos/numberresult';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-csoport-szerkesztes',
  templateUrl: './csoport-szerkesztes.component.html'
})
export class CsoportSzerkesztesComponent implements OnInit, OnDestroy {
  csoportservice: CsoportService;

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

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.csoportservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.csoportservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.csoportservice.DtoEdited = deepCopy(this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.csoportservice.Add(this.csoportservice.DtoEdited);
    } else {
      p = this.csoportservice.Update(this.csoportservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.csoportservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.csoportservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex]);
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  OnCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
