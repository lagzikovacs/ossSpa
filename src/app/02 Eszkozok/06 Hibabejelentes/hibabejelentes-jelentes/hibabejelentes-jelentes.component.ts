import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HibabejelentesService} from '../hibabejelentes.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {deepCopy} from '../../../common/deepCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hibabejelentes-jelentes',
  templateUrl: './hibabejelentes-jelentes.component.html'
})
export class HibabejelentesJelentesComponent implements OnInit, OnDestroy {
  DtoEdited = new HibabejelentesDto();
  @Input() set DtoOriginal(value: HibabejelentesDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<HibabejelentesDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  hibabejelentesservice: HibabejelentesService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              hibabejelentesservice: HibabejelentesService) {
    this.hibabejelentesservice = hibabejelentesservice;

    this.form = this._fb.group({
      'megjegyzes1': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateform();
  }

  updateform() {
    this.form.controls['megjegyzes1'].setValue(this.DtoEdited.Megjegyzes1);
  }
  updatedto() {
    this.DtoEdited.Megjegyzes1 = this.form.value['megjegyzes1'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.hibabejelentesservice.Update(this.DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.hibabejelentesservice.Get(res.Result);
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
