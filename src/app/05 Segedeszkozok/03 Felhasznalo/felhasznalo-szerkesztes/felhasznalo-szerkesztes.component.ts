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
  @Output() eventOk = new EventEmitter<FelhasznaloDto>();
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
              private _felhasznaloservice: FelhasznaloService) {

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
        const res = await this._felhasznaloservice.CreateNew();
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

    this.cim = this.uj ? 'Új ' + this._felhasznaloservice.cim.toLowerCase() : this._felhasznaloservice.cim + ' módosítása';
    this.updateform();
    this.docdr();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
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
        res = await this._felhasznaloservice.Add(this.DtoEdited);
      } else {
        res = await this._felhasznaloservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._felhasznaloservice.Get(res.Result);
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

