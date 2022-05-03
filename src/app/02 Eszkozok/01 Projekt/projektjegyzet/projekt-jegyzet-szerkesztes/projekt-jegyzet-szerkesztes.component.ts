import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {ProjektjegyzetService} from '../projektjegyzet.service';
import * as moment from 'moment';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {deepCopy} from '../../../../common/deepCopy';
import {ProjektjegyzetDto} from '../projektjegyzetdto';
import {NumberResult} from '../../../../common/dtos/numberresult';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektjegyzetservice: ProjektjegyzetService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              projektjegyzetservice: ProjektjegyzetService) {
    this.projektjegyzetservice = projektjegyzetservice;

    this.form = this._fb.group({
      'leiras': ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.projektjegyzetservice.CreateNew();
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.updateform();
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
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

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res1: NumberResult;

      if (this.uj) {
        this.DtoEdited.Projektkod = this.Projektkod;
        res1 = await this.projektjegyzetservice.Add(this.DtoEdited);
      } else {
        res1 = await this.projektjegyzetservice.Update(this.DtoEdited);
      }
      if (res1.Error !== null) {
        throw res1.Error;
      }

      const res2 = await this.projektjegyzetservice.Get(res1.Result);
      if (res2.Error !== null) {
        throw res2.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res2.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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
