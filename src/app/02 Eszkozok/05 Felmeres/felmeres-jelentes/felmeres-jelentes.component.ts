import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FelmeresService} from '../felmeres.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../../common/deepCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-felmeres-jelentes',
  templateUrl: './felmeres-jelentes.component.html'
})
export class FelmeresJelentesComponent  implements OnInit, OnDestroy {
  DtoEdited = new FelmeresDto();
  @Input() set DtoOriginal(value: FelmeresDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FelmeresDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  felmeresservice: FelmeresService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              felmeresservice: FelmeresService) {
    this.felmeresservice = felmeresservice;

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
      const res = await this.felmeresservice.Update(this.DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.felmeresservice.Get(res.Result);
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
