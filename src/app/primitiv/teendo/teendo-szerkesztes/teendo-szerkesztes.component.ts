import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';
import {propCopy} from '../../../tools/propCopy';

@Component({
  selector: 'app-teendo-szerkesztes',
  templateUrl: './teendo-szerkesztes.component.html'
})
export class TeendoSzerkesztesComponent implements OnInit, OnDestroy {
  teendoservice: TeendoService;

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

  constructor(teendoservice: TeendoService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.teendoservice = teendoservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.teendoservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.teendoservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.teendoservice.DtoEdited = deepCopy(this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.teendoservice.Add(this.teendoservice.DtoEdited);
    } else {
      p = this.teendoservice.Update(this.teendoservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.teendoservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.teendoservice.Dto.unshift(res1.Result[0]);
        } else {
          propCopy(res1.Result[0], this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex]);
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
