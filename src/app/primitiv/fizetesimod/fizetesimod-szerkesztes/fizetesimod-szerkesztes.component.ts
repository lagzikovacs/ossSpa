import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FizetesimodService} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {FizetesimodDto} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimoddto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fizetesimod-szerkesztes',
  templateUrl: './fizetesimod-szerkesztes.component.html'
})
export class FizetesimodSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new FizetesimodDto();
  @Input() set DtoOriginal(value: FizetesimodDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FizetesimodDto>();

  form: FormGroup;
  eppFrissit = false;

  fizetesimodservice: FizetesimodService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;

    this.form = this._fb.group({
      'fizetesimod': ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.fizetesimodservice.CreateNew()
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
    this.form.controls['fizetesimod'].setValue(this.DtoEdited.Fizetesimod1);
  }
  updatedto() {
    this.DtoEdited.Fizetesimod1 = this.form.value['fizetesimod'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.fizetesimodservice.Add(this.DtoEdited);
    } else {
      p = this.fizetesimodservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.fizetesimodservice.Get(res.Result);
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
