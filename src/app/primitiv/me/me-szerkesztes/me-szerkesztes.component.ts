import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MeService} from '../me.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {MeDto} from '../medto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-me-szerkesztes',
  templateUrl: './me-szerkesztes.component.html'
})
export class MeSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new MeDto();
  @Input() set DtoOriginal(value: MeDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<MeDto>();

  form: FormGroup;
  eppFrissit = false;

  meservice: MeService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              meservice: MeService) {
    this.meservice = meservice;

    this.form = this._fb.group({
      'me': ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.meservice.CreateNew()
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
    this.form.controls['me'].setValue(this.DtoEdited.Me);
  }
  updatedto() {
    this.DtoEdited.Me = this.form.value['me'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.meservice.Add(this.DtoEdited);
    } else {
      p = this.meservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.meservice.Get(res.Result);
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
