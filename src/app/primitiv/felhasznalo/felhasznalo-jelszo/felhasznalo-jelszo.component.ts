import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FelhasznaloService} from '../felhasznalo.service';
import {rowanimation} from '../../../animation/rowAnimation';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {FelhasznaloDto} from '../felhasznalodto';
import {deepCopy} from '../../../tools/deepCopy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-felhasznalo-jelszo',
  templateUrl: './felhasznalo-jelszo.component.html',
  animations: [rowanimation]
})
export class FelhasznaloJelszoComponent implements OnDestroy {
  DtoEdited = new FelhasznaloDto();
  @Input() set DtoOriginal(value: FelhasznaloDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FelhasznaloDto>();

  form: FormGroup;
  eppFrissit = false;

  jelszo = '';
  jelszoujra = '';

  felhasznaloservice: FelhasznaloService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;

    this.form = this._fb.group({
      'jelszo': ['', [Validators.required, Validators.maxLength(30)]],
      'jelszoujra': ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  onSubmit() {
    this.jelszo = this.form.value['jelszo'];
    this.jelszoujra = this.form.value['jelszoujra'];

    if (this.jelszo !== this.jelszoujra) {
      this._errorservice.Error = 'A jelszó két példánya nem azonos!';
      return;
    }

    this.eppFrissit = true;
    this.felhasznaloservice.JelszoBeallitas(this.DtoEdited.Felhasznalokod, this.jelszo, this.DtoEdited.Modositva)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(this.DtoEdited.Felhasznalokod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this._errorservice.Error = err;
        this.eppFrissit = false;
      });
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
