import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MeService} from '../me.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-me-szerkesztes',
  templateUrl: './me-szerkesztes.component.html'
})
export class MeSzerkesztesComponent implements OnInit, OnDestroy {
  meservice: MeService;

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

  constructor(meservice: MeService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.meservice = meservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.meservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.meservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.meservice.DtoEdited = deepCopy(this.meservice.Dto[this.meservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.meservice.Add(this.meservice.DtoEdited);
    } else {
      p = this.meservice.Update(this.meservice.DtoEdited);
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

        if (this.uj) {
          this.meservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.meservice.Dto[this.meservice.DtoSelectedIndex]);
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
