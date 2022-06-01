import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {FelhasznaloDto} from '../felhasznalodto';
import {deepCopy} from '../../../common/deepCopy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-felhasznalo-jelszo',
  templateUrl: './felhasznalo-jelszo.component.html'
})
export class FelhasznaloJelszoComponent implements OnDestroy {
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
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  jelszo = '';
  jelszoujra = '';

  felhasznaloservice: FelhasznaloService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;

    this.form = this._fb.group({
      'jelszo': ['', [Validators.required, Validators.maxLength(30)]],
      'jelszoujra': ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  async onSubmit() {
    this.jelszo = this.form.value['jelszo'];
    this.jelszoujra = this.form.value['jelszoujra'];

    if (this.jelszo !== this.jelszoujra) {
      this._errorservice.Error = 'A jelszó két példánya nem azonos!';
      return;
    }

    this.spinner = true;
    try {
      const res = await this.felhasznaloservice.JelszoBeallitas(this.DtoEdited.Felhasznalokod,
        this.jelszo, this.DtoEdited.Modositva);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.felhasznaloservice.Get(this.DtoEdited.Felhasznalokod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventOk.emit(res1.Result[0]);
    } catch (err) {
      this._errorservice.Error = err;
      this.spinner = false;
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
