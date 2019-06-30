import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-felhasznalo-szerkesztes',
  templateUrl: './felhasznalo-szerkesztes.component.html'
})
export class FelhasznaloSzerkesztesComponent implements OnInit, OnDestroy {
  felhasznaloservice: FelhasznaloService;

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

  constructor(felhasznaloservice: FelhasznaloService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.felhasznaloservice = felhasznaloservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.felhasznaloservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.felhasznaloservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.felhasznaloservice.DtoEdited = deepCopy(this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.felhasznaloservice.Add(this.felhasznaloservice.DtoEdited);
    } else {
      p = this.felhasznaloservice.Update(this.felhasznaloservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.felhasznaloservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.felhasznaloservice.Dto[this.felhasznaloservice.DtoSelectedIndex]);
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
