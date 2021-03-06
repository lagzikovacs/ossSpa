import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektjegyzetService} from '../projektjegyzet.service';
import * as moment from 'moment';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {ProjektjegyzetDto} from '../projektjegyzetdto';
import {NumberResult} from '../../dtos/numberresult';

@Component({
  selector: 'app-projekt-jegyzet-szerkesztes',
  templateUrl: './projekt-jegyzet-szerkesztes.component.html'
})
export class ProjektJegyzetSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new ProjektjegyzetDto();
  @Input() set DtoOriginal(value: ProjektjegyzetDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() Projektkod = -1;
  @Output() eventSzerkeszteskesz = new EventEmitter<ProjektjegyzetDto>();

  eppFrissit = false;

  projektjegyzetservice: ProjektjegyzetService;

  constructor(private _errorservice: ErrorService,
              projektjegyzetservice: ProjektjegyzetService) {
    this.projektjegyzetservice = projektjegyzetservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.projektjegyzetservice.CreateNew()
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
      this.DtoEdited.Projektkod = this.Projektkod;
      p = this.projektjegyzetservice.Add(this.DtoEdited);
    } else {
      p = this.projektjegyzetservice.Update(this.DtoEdited);
    }

    p
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.projektjegyzetservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
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
