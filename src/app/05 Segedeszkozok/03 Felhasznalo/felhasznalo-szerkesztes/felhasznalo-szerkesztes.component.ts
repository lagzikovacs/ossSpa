import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {FelhasznaloDto} from '../felhasznalodto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-felhasznalo-szerkesztes',
  templateUrl: './felhasznalo-szerkesztes.component.html'
})
export class FelhasznaloSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new FelhasznaloDto();
  @Input() set DtoOriginal(value: FelhasznaloDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FelhasznaloDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  felhasznaloservice: FelhasznaloService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;

    this.form = this._fb.group({
      'azonosito': ['', [Validators.required, Validators.maxLength(30)]],
      'nev': ['', [Validators.required, Validators.maxLength(100)]],
      'telefon': ['', [Validators.required, Validators.maxLength(50)]],
      'email': ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      'statusz': ['', [Validators.required, Validators.maxLength(10)]],
      'logonlog': ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.felhasznaloservice.CreateNew();
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
    this.form.controls['azonosito'].setValue(this.DtoEdited.Azonosito);
    this.form.controls['nev'].setValue(this.DtoEdited.Nev);
    this.form.controls['telefon'].setValue(this.DtoEdited.Telefon);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['statusz'].setValue(this.DtoEdited.Statusz);
    this.form.controls['logonlog'].setValue(this.DtoEdited.Logonlog);
  }
  updatedto() {
    this.DtoEdited.Azonosito = this.form.value['azonosito'];
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Telefon = this.form.value['telefon'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Statusz = this.form.value['statusz'];
    this.DtoEdited.Logonlog = this.form.value['logonlog'] === 'true' ? true : false;
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this.felhasznaloservice.Add(this.DtoEdited);
      } else {
        res = await this.felhasznaloservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.felhasznaloservice.Get(res.Result);
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
