import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CikkService} from '../../01 Torzsadatok/06 Cikk/cikk.service';
import {MeService} from '../../01 Torzsadatok/04 Mennyisegiegyseg/me.service';
import {AfakulcsService} from '../../01 Torzsadatok/05 Afakulcs/afakulcs.service';
import {TermekdijService} from '../../01 Torzsadatok/051 Termekdij/termekdij.service';
import {MeZoomParam} from '../../01 Torzsadatok/04 Mennyisegiegyseg/mezoomparam';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {TermekdijZoomParam} from '../../01 Torzsadatok/051 Termekdij/termekdijzoomparam';
import {CikkSzerkesztesMode} from '../../01 Torzsadatok/06 Cikk/cikkszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {AfakulcsDto} from '../../01 Torzsadatok/05 Afakulcs/afakulcsdto';
import {MeDto} from '../../01 Torzsadatok/04 Mennyisegiegyseg/medto';
import {TermekdijDto} from '../../01 Torzsadatok/051 Termekdij/termekdijdto';
import {CikkDto} from '../../01 Torzsadatok/06 Cikk/cikkdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AfakulcsZoomParam} from '../../01 Torzsadatok/05 Afakulcs/afakulcszoomparam';

@Component({
  selector: 'app-cikk-szerkesztes',
  templateUrl: './cikk-szerkesztes.component.html'
})
export class CikkSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new CikkDto();
  @Input() set DtoOriginal(value: CikkDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<CikkDto>();

  form: FormGroup;
  eppFrissit = false;

  cikkzoombox: any;

  SzerkesztesMode = CikkSzerkesztesMode.Blank;

  cikkservice: CikkService;

  constructor(private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              cikkservice: CikkService) {
    this.cikkservice = cikkservice;

    this.form = this._fb.group({
      'megnevezes': ['', [Validators.required, Validators.maxLength(100)]],
      'me': ['', [Validators.required, Validators.maxLength(10)]],
      'afakulcs': ['', [Validators.required, Validators.maxLength(10)]],
      'egysegar': [0, [Validators.required]],
      'kk': ['', [Validators.required]],
      'tomeg': [0, [Validators.required]],
      'termekdijkt': ['', [Validators.maxLength(30)]],
      'termekdijmegnevezes': [{value: '', disabled: true}, []],
      'termekdijegysegar': [{value: '', disabled: true}, []]
    });
  }

  ngOnInit() {
    this.cikkzoombox = document.getElementById('cikkzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.cikkservice.CreateNew()
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
    this.form.controls['megnevezes'].setValue(this.DtoEdited.Megnevezes);
    this.form.controls['me'].setValue(this.DtoEdited.Me);
    this.form.controls['afakulcs'].setValue(this.DtoEdited.Afakulcs);
    this.form.controls['egysegar'].setValue(this.DtoEdited.Egysegar);
    this.form.controls['kk'].setValue(this.DtoEdited.Keszletetkepez);
    this.form.controls['tomeg'].setValue(this.DtoEdited.Tomegkg);
    this.form.controls['termekdijkt'].setValue(this.DtoEdited.Termekdijkt);
    this.form.controls['termekdijmegnevezes'].setValue(this.DtoEdited.Termekdijmegnevezes);
    this.form.controls['termekdijegysegar'].setValue(this.DtoEdited.Termekdijegysegar);
  }
  updatedto() {
    this.DtoEdited.Megnevezes = this.form.value['megnevezes'];
    this.DtoEdited.Me = this.form.value['me'];
    this.DtoEdited.Afakulcs = this.form.value['afakulcs'];
    this.DtoEdited.Egysegar = this.form.value['egysegar'];
    this.DtoEdited.Keszletetkepez = this.form.value['kk'];
    this.DtoEdited.Tomegkg = this.form.value['tomeg'];
    this.DtoEdited.Termekdijkt = this.form.value['termekdijkt'];
    this.DtoEdited.Termekdijmegnevezes = this.form.value['termekdijmegnevezes'];
    this.DtoEdited.Termekdijegysegar = this.form.value['termekdijegysegar'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._meservice.ZoomCheck(new MeZoomParam(this.DtoEdited.Mekod || 0,
      this.DtoEdited.Me || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }
        return this._afakulcsservice.ZoomCheck(new AfakulcsZoomParam(this.DtoEdited.Afakulcskod || 0,
          this.DtoEdited.Afakulcs || ''));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        if ((this.DtoEdited.Termekdijkt || '') !== '') {
          return this._termekdijservice.ZoomCheck(new TermekdijZoomParam(this.DtoEdited.Termekdijkod || 0,
            this.DtoEdited.Termekdijkt || ''));
        } else {
          this.DtoEdited.Termekdijkod = undefined;
          this.DtoEdited.Termekdijkt = undefined;
          this.DtoEdited.Termekdijmegnevezes = undefined;
          this.DtoEdited.Termekdijegysegar = undefined;
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        // itt a zoom már le van ellenőrizve
        if (this.uj) {
          return this.cikkservice.Add(this.DtoEdited);
        } else {
          return this.cikkservice.Update(this.DtoEdited);
        }
      })
      .then(res3 => {
        if (res3.Error !== null) {
          throw res3.Error;
        }
        return this.cikkservice.Get(res3.Result);
      })
      .then(res4 => {
        if (res4.Error !== null) {
          throw res4.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res4.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  MeZoom() {
    this.updatedto();
    this.SzerkesztesMode = CikkSzerkesztesMode.MeZoom;
    this.cikkzoombox.style.display = 'block';
  }
  onMeSelectzoom(Dto: MeDto) {
    this.DtoEdited.Mekod = Dto.Mekod;
    this.DtoEdited.Me = Dto.Me;
    this.updateform();
  }
  onMeStopzoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.Blank;
    this.cikkzoombox.style.display = 'none';
  }

  AfakulcsZoom() {
    this.updatedto();
    this.SzerkesztesMode = CikkSzerkesztesMode.AfakulcsZoom;
    this.cikkzoombox.style.display = 'block';
  }
  onAfakulcsSelectzoom(Dto: AfakulcsDto) {
    this.DtoEdited.Afakulcskod = Dto.Afakulcskod;
    this.DtoEdited.Afakulcs = Dto.Afakulcs1;
    this.DtoEdited.Afamerteke = Dto.Afamerteke;
    this.updateform();
  }
  onAfakulcsStopzoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.Blank;
    this.cikkzoombox.style.display = 'none';
  }

  TermekdijZoom() {
    this.updatedto();
    this.SzerkesztesMode = CikkSzerkesztesMode.TermekdijZoom;
    this.cikkzoombox.style.display = 'block';
  }
  onTermekdijSelectzoom(Dto: TermekdijDto) {
    this.DtoEdited.Termekdijkod = Dto.Termekdijkod;
    this.DtoEdited.Termekdijkt = Dto.Termekdijkt;
    this.DtoEdited.Termekdijmegnevezes = Dto.Termekdijmegnevezes;
    this.DtoEdited.Termekdijegysegar = Dto.Termekdijegysegar;
    this.updateform();
  }
  onTermekdijStopzoom() {
    this.SzerkesztesMode = CikkSzerkesztesMode.Blank;
    this.cikkzoombox.style.display = 'none';
  }
  TermekdijTorles() {
    this.updatedto();
    this.DtoEdited.Termekdijkod = null;
    this.DtoEdited.Termekdijkt = null;
    this.DtoEdited.Termekdijmegnevezes = null;
    this.DtoEdited.Termekdijegysegar = null;
    this.updateform();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
