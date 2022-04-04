import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektjegyzetService} from '../projektjegyzet.service';
import * as moment from 'moment';
import {ErrorService} from '../../common/errorbox/error.service';
import {deepCopy} from '../../common/deepCopy';
import {ProjektjegyzetDto} from '../projektjegyzetdto';
import {NumberResult} from '../../common/dtos/numberresult';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  form: FormGroup;
  eppFrissit = false;

  projektjegyzetservice: ProjektjegyzetService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              projektjegyzetservice: ProjektjegyzetService) {
    this.projektjegyzetservice = projektjegyzetservice;

    this.form = this._fb.group({
      'leiras': ['', [Validators.required]],
    });
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
          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['leiras'].setValue(this.DtoEdited.Leiras);
  }
  updatedto() {
    this.DtoEdited.Leiras = this.form.value['leiras'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

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
