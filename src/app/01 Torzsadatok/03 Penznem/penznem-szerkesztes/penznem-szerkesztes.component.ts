import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {PenznemDto} from '../penznemdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penznem-szerkesztes',
  templateUrl: './penznem-szerkesztes.component.html'
})
export class PenznemSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new PenznemDto();
  @Input() set DtoOriginal(value: PenznemDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<PenznemDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  penznemservice: PenznemService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              penznemservice: PenznemService) {
    this.penznemservice = penznemservice;

    this.form = this._fb.group({
      'penznem': ['', [Validators.required, Validators.maxLength(3)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.penznemservice.CreateNew();
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
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem1);
  }
  updatedto() {
    this.DtoEdited.Penznem1 = this.form.value['penznem'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this.penznemservice.Add(this.DtoEdited);
      } else {
        res = await this.penznemservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.penznemservice.Get(res.Result);
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
