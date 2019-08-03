import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {TeendoDto} from '../teendodto';

@Component({
  selector: 'app-teendo-szerkesztes',
  templateUrl: './teendo-szerkesztes.component.html'
})
export class TeendoSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new TeendoDto();
  @Input() set DtoOriginal(value: TeendoDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<TeendoDto>();

  eppFrissit = false;

  teendoservice: TeendoService;

  constructor(private _errorservice: ErrorService,
              teendoservice: TeendoService) {
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
      p = this.teendoservice.Add(this.DtoEdited);
    } else {
      p = this.teendoservice.Update(this.DtoEdited);
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
