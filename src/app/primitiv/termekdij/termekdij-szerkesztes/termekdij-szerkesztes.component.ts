import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {deepCopy} from '../../../tools/deepCopy';

@Component({
  selector: 'app-termekdij-szerkesztes',
  templateUrl: './termekdij-szerkesztes.component.html'
})
export class TermekdijSzerkesztesComponent implements OnInit, OnDestroy {
  termekdijservice: TermekdijService;

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

  constructor(termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
    this.termekdijservice = termekdijservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.termekdijservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.termekdijservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.termekdijservice.DtoEdited = deepCopy(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.termekdijservice.Add(this.termekdijservice.DtoEdited);
    } else {
      p = this.termekdijservice.Update(this.termekdijservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.termekdijservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.termekdijservice.Dto.unshift(res1.Result[0]);
        } else {
          this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex] = res1.Result[0];
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
