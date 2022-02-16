import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
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
  @Output() eventSzerkeszteskesz = new EventEmitter<AfakulcsDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  afakulcsservice: AfakulcsService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;

    this.form = this._fb.group({
      'afakulcs': ['', [Validators.required, Validators.maxLength(10)]],
      'afamerteke': ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      this.afakulcsservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.updateform();
          this.spinner = false;
        })
        .catch(err => {
          this.spinner = false;
          this._errorservice.Error = err;
        });
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['afakulcs'].setValue(this.DtoEdited.Afakulcs1);
    this.form.controls['afamerteke'].setValue(this.DtoEdited.Afamerteke);
  }
  updatedto() {
    this.DtoEdited.Afakulcs1 = this.form.value['afakulcs'];
    this.DtoEdited.Afamerteke = this.form.value['afamerteke'];
  }

  onSubmit() {
    this.spinner = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.afakulcsservice.Add(this.DtoEdited);
    } else {
      p = this.afakulcsservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.afakulcsservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.spinner = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.spinner = false;
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
