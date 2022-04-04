import {IrattipusService} from '../irattipus.service';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {NumberResult} from '../../../common/dtos/numberresult';
import {IrattipusDto} from '../irattipusdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-irattipus-szerkesztes',
  templateUrl: './irattipus-szerkesztes.component.html'
})
export class IrattipusSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new IrattipusDto();
  @Input() set DtoOriginal(value: IrattipusDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<IrattipusDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  irattipusservice: IrattipusService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;

    this.form = this._fb.group({
      'irattipus': ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.irattipusservice.CreateNew();
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['irattipus'].setValue(this.DtoEdited.Irattipus1);
  }
  updatedto() {
    this.DtoEdited.Irattipus1 = this.form.value['irattipus'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this.irattipusservice.Add(this.DtoEdited);
      } else {
        res = await this.irattipusservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.irattipusservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res1.Result[0]);
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
