import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {ErrorService} from '../../../common/errorbox/error.service';
import {UgyfelService} from '../ugyfel.service';
import {deepCopy} from '../../../common/deepCopy';
import {UgyfelDto} from '../ugyfeldto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfel-csoport',
  templateUrl: './ugyfel-csoport.component.html'
})
export class UgyfelCsoportComponent implements OnInit, OnDestroy {
  DtoEdited = new UgyfelDto();
  @Input() set DtoOriginal(value: UgyfelDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelDto>();

  entries = ['(0) Mind', '(1) Kiemelt'];

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ugyfelservice: UgyfelService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;

    this.form = this._fb.group({
      'ugyfeltipus': [0, [Validators.required]]
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['ugyfeltipus'].setValue(this.DtoEdited.Csoport);
  }
  updatedto() {
    this.DtoEdited.Csoport = this.form.value['ugyfeltipus'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res1 = await this.ugyfelservice.Update(this.DtoEdited);
      if (res1.Error !== null) {
        throw res1.Error;
      }

      const res2 = await this.ugyfelservice.Get(res1.Result);
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
