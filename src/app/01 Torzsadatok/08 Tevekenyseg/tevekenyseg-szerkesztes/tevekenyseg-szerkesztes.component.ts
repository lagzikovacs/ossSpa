import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {TevekenysegDto} from '../tevekenysegdto';
import {TevekenysegService} from '../tevekenyseg.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tevekenyseg-szerkesztes',
  templateUrl: './tevekenyseg-szerkesztes.component.html'
})
export class TevekenysegSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new TevekenysegDto();
  @Input() set DtoOriginal(value: TevekenysegDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<TevekenysegDto>();
  @Output() eventCancel = new EventEmitter<void>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  tevekenysegservice: TevekenysegService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              tevekenysegservice: TevekenysegService) {
    this.tevekenysegservice = tevekenysegservice;

    this.form = this._fb.group({
      'tevekenyseg': ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.tevekenysegservice.CreateNew();
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
    this.form.controls['tevekenyseg'].setValue(this.DtoEdited.Tevekenyseg1);
  }
  updatedto() {
    this.DtoEdited.Tevekenyseg1 = this.form.value['tevekenyseg'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this.tevekenysegservice.Add(this.DtoEdited);
      } else {
        res = await this.tevekenysegservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.tevekenysegservice.Get(res.Result);
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