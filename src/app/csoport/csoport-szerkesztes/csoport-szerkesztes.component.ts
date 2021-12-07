import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {NumberResult} from '../../dtos/numberresult';
import {ErrorService} from '../../tools/errorbox/error.service';
import {CsoportDto} from '../csoportdto';
import {deepCopy} from '../../tools/deepCopy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-csoport-szerkesztes',
  templateUrl: './csoport-szerkesztes.component.html'
})
export class CsoportSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new CsoportDto();
  @Input() set DtoOriginal(value: CsoportDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<CsoportDto>();

  form: FormGroup;
  eppFrissit = false;

  csoportservice: CsoportService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;

    this.form = this._fb.group({
      'csoport': ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.csoportservice.CreateNew()
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
    this.form.controls['csoport'].setValue(this.DtoEdited.Csoport1);
  }
  updatedto() {
    this.DtoEdited.Csoport1 = this.form.value['csoport'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.csoportservice.Add(this.DtoEdited);
    } else {
      p = this.csoportservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.csoportservice.Get(res.Result);
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
