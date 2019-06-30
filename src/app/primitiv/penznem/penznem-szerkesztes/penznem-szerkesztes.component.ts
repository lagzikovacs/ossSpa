import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-penznem-szerkesztes',
  templateUrl: './penznem-szerkesztes.component.html'
})
export class PenznemSzerkesztesComponent implements OnInit, OnDestroy {
  penznemservice: PenznemService;

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

  constructor(penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.penznemservice = penznemservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.penznemservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.penznemservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.penznemservice.DtoEdited = deepCopy(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.penznemservice.Add(this.penznemservice.DtoEdited);
    } else {
      p = this.penznemservice.Update(this.penznemservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.penznemservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.penznemservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex]);
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
