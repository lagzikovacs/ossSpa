import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {SzamlazasirendSzerkesztesMode} from '../szamlazasirendszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {PenznemDto} from '../../primitiv/penznem/penznemdto';
import {SzamlazasirendDto} from '../szamlazasirenddto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-szamlazasirend-szerkesztes',
  templateUrl: './szamlazasirend-szerkesztes.component.html'
})
export class SzamlazasirendSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new SzamlazasirendDto();
  @Input() set DtoOriginal(value: SzamlazasirendDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() Projektkod = -1;
  @Output() eventSzerkeszteskesz = new EventEmitter<SzamlazasirendDto>();

  SzerkesztesMode = SzamlazasirendSzerkesztesMode.Blank;

  form: FormGroup;
  eppFrissit = false;

  penznemzoombox: any;

  szamlazasirendservice: SzamlazasirendService;

  constructor(private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;

    this.form = this._fb.group({
      'osszeg': [0, [Validators.required]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
      'megjegyzes': ['', []]
    });
  }

  ngOnInit() {
    this.penznemzoombox = document.getElementById('penznemzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.szamlazasirendservice.CreateNew()
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
    this.form.controls['osszeg'].setValue(this.DtoEdited.Osszeg);
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    this.DtoEdited.Osszeg = this.form.value['osszeg'];
    this.DtoEdited.Penznem = this.form.value['penznem'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.DtoEdited.Penznemkod || 0,
      this.DtoEdited.Penznem || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.uj) {
          this.DtoEdited.Projektkod = this.Projektkod;
          return this.szamlazasirendservice.Add(this.DtoEdited);
        } else {
          return this.szamlazasirendservice.Update(this.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.szamlazasirendservice.Get(res1.Result);
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
    this.SzerkesztesMode = SzamlazasirendSzerkesztesMode.PenznemZoom;
    this.penznemzoombox.style.display = 'block';
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
    this.updateform();
    this.penznemzoombox.style.display = 'none';
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = SzamlazasirendSzerkesztesMode.Blank;
    this.penznemzoombox.style.display = 'none';
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
