import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {AfakulcsDto} from '../afakulcsdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-afakulcs-szerkesztes',
  templateUrl: './afakulcs-szerkesztes.component.html'
})
export class AfakulcsSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new AfakulcsDto();
  @Input() set DtoOriginal(value: AfakulcsDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<AfakulcsDto>();
  @Output() eventMegsem = new EventEmitter<void>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  cim = '';

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _afakulcsservice: AfakulcsService) {
    this.form = this._fb.group({
      'afakulcs': ['', [Validators.required, Validators.maxLength(10)]],
      'afamerteke': ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this._afakulcsservice.CreateNew();
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

    this.cim = this.uj ? 'Új ' + this._afakulcsservice.cim.toLowerCase() : this._afakulcsservice.cim + ' módosítása';
    this.updateform();
    this.docdr();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  updateform() {
    this.form.controls['afakulcs'].setValue(this.DtoEdited.Afakulcs1);
    this.form.controls['afamerteke'].setValue(this.DtoEdited.Afamerteke);
  }
  updatedto() {
    this.DtoEdited.Afakulcs1 = this.form.value['afakulcs'];
    this.DtoEdited.Afamerteke = this.form.value['afamerteke'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this._afakulcsservice.Add(this.DtoEdited);
      } else {
        res = await this._afakulcsservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._afakulcsservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventOk.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
