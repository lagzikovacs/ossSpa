import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {FelhasznaloDto} from '../felhasznalodto';

@Component({
  selector: 'app-felhasznalo-szerkesztes',
  templateUrl: './felhasznalo-szerkesztes.component.html'
})
export class FelhasznaloSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new FelhasznaloDto();
  @Input() set DtoOriginal(value: FelhasznaloDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FelhasznaloDto>();

  eppFrissit = false;

  felhasznaloservice: FelhasznaloService;

  constructor(private _errorservice: ErrorService,
              felhasznaloservice: FelhasznaloService) {
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
      p = this.felhasznaloservice.Add(this.DtoEdited);
    } else {
      p = this.felhasznaloservice.Update(this.DtoEdited);
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

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
