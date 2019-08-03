import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {FizetesimodDto} from '../fizetesimoddto';

@Component({
  selector: 'app-fizetesimod-szerkesztes',
  templateUrl: './fizetesimod-szerkesztes.component.html'
})
export class FizetesimodSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new FizetesimodDto();
  @Input() set DtoOriginal(value: FizetesimodDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FizetesimodDto>();

  eppFrissit = false;

  fizetesimodservice: FizetesimodService;

  constructor(private _errorservice: ErrorService,
              fizetesimodservice: FizetesimodService) {
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
      p = this.fizetesimodservice.Add(this.DtoEdited);
    } else {
      p = this.fizetesimodservice.Update(this.DtoEdited);
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
