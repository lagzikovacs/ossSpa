import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {TevekenysegDto} from '../tevekenysegdto';
import {TevekenysegService} from '../tevekenyseg.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tevekenyseg-szerkesztes',
  templateUrl: './tevekenyseg-szerkesztes.component.html'
})
export class TevekenysegSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new TevekenysegDto();
  @Input() set DtoOriginal(value: TevekenysegDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<TevekenysegDto>();

  form: FormGroup;
  eppFrissit = false;

  tevekenysegservice: TevekenysegService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              tevekenysegservice: TevekenysegService) {
    this.tevekenysegservice = tevekenysegservice;

    this.form = this._fb.group({
      'tevekenyseg': ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.tevekenysegservice.CreateNew()
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
    this.form.controls['tevekenyseg'].setValue(this.DtoEdited.Tevekenyseg1);
  }
  updatedto() {
    this.DtoEdited.Tevekenyseg1 = this.form.value['tevekenyseg'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.tevekenysegservice.Add(this.DtoEdited);
    } else {
      p = this.tevekenysegservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.tevekenysegservice.Get(res.Result);
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
