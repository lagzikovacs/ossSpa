import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PenznemService} from '../../01 Torzsadatok/03 Penznem/penznem.service';
import {PenznemZoomParam} from '../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {PenztarService} from '../penztar.service';
import {PenztarSzerkesztesMode} from '../penztarszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../common/deepCopy';
import {PenznemDto} from '../../01 Torzsadatok/03 Penznem/penznemdto';
import {PenztarDto} from '../penztardto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-penztar-szerkesztes',
  templateUrl: './penztar-szerkesztes.component.html'
})
export class PenztarSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new PenztarDto();
  @Input() set DtoOriginal(value: PenztarDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<PenztarDto>();

  SzerkesztesMode = PenztarSzerkesztesMode.Blank;

  form: FormGroup;
  eppFrissit = false;

  penztarzoombox: any;

  penztarservice: PenztarService;

  constructor(private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              penztarservice: PenztarService) {
    this.penztarservice = penztarservice;

    this.form = this._fb.group({
      'penztar': ['', [Validators.required, Validators.maxLength(30)]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  ngOnInit() {
    this.penztarzoombox = document.getElementById('penztarzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.penztarservice.CreateNew()
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
    this.form.controls['penztar'].setValue(this.DtoEdited.Penztar1);
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem);
  }
  updatedto() {
    this.DtoEdited.Penztar1 = this.form.value['penztar'];
    this.DtoEdited.Penznem = this.form.value['penznem'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._penznemservice.ZoomCheck(new PenznemZoomParam(this.DtoEdited.Penznemkod || 0,
      this.DtoEdited.Penznem || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.uj) {
          return this.penztarservice.Add(this.DtoEdited);
        } else {
          return this.penztarservice.Update(this.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.penztarservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  PenznemZoom() {
    this.updatedto();
    this.SzerkesztesMode = PenztarSzerkesztesMode.PenznemZoom;
    this.penztarzoombox.style.display = 'block';
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
    this.updateform();
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = PenztarSzerkesztesMode.Blank;
    this.penztarzoombox.style.display = 'none';
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
