import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {HelysegDto} from '../helysegdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-helyseg-szerkesztes',
  templateUrl: './helyseg-szerkesztes.component.html'
})
export class HelysegSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new HelysegDto();
  @Input() set DtoOriginal(value: HelysegDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<HelysegDto>();

  form: FormGroup;
  eppFrissit = false;

  helysegservice: HelysegService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              helysegservice: HelysegService) {
    this.helysegservice = helysegservice;

    this.form = this._fb.group({
      'helysegnev': ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.helysegservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['helysegnev'].setValue(this.DtoEdited.Helysegnev);
  }
  updatedto() {
    this.DtoEdited.Helysegnev = this.form.value['helysegnev'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.helysegservice.Add(this.DtoEdited);
    } else {
      p = this.helysegservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.helysegservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
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
