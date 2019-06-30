import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-fizetesimod-szerkesztes',
  templateUrl: './fizetesimod-szerkesztes.component.html'
})
export class FizetesimodSzerkesztesComponent implements OnInit, OnDestroy {
  fizetesimodservice: FizetesimodService;

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

  constructor(fizetesimodservice: FizetesimodService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.fizetesimodservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.fizetesimodservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.fizetesimodservice.DtoEdited = deepCopy(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.fizetesimodservice.Add(this.fizetesimodservice.DtoEdited);
    } else {
      p = this.fizetesimodservice.Update(this.fizetesimodservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.fizetesimodservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.fizetesimodservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
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
