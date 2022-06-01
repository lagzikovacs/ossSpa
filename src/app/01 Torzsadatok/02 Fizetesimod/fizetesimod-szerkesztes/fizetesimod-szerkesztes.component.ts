import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {FizetesimodDto} from '../fizetesimoddto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fizetesimod-szerkesztes',
  templateUrl: './fizetesimod-szerkesztes.component.html'
})
export class FizetesimodSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new FizetesimodDto();
  @Input() set DtoOriginal(value: FizetesimodDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<FizetesimodDto>();
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
              private _fizetesimodservice: FizetesimodService) {
    this.form = this._fb.group({
      'fizetesimod': ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this._fizetesimodservice.CreateNew();
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

    this.cim = this.uj ? 'Új ' + this._fizetesimodservice.cim.toLowerCase() : this._fizetesimodservice.cim + ' módosítása';
    this.updateform();
    this.docdr();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  updateform() {
    this.form.controls['fizetesimod'].setValue(this.DtoEdited.Fizetesimod1);
  }
  updatedto() {
    this.DtoEdited.Fizetesimod1 = this.form.value['fizetesimod'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this._fizetesimodservice.Add(this.DtoEdited);
      } else {
        res = await this._fizetesimodservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._fizetesimodservice.Get(res.Result);
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
