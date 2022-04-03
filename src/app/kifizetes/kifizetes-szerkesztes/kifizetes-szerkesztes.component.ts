import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {PenznemService} from '../../01 Torzsadatok/03 Penznem/penznem.service';
import {FizetesimodService} from '../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import {KifizetesSzerkesztesMode} from '../kifizetesszerkesztesmode';
import * as moment from 'moment';
import {PenznemZoomParam} from '../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {FizetesimodZoomParam} from '../../01 Torzsadatok/02 Fizetesimod/fiztesimodzoomparam';
import {ErrorService} from '../../tools/errorbox/error.service';
import {PenznemDto} from '../../01 Torzsadatok/03 Penznem/penznemdto';
import {FizetesimodDto} from '../../01 Torzsadatok/02 Fizetesimod/fizetesimoddto';
import {deepCopy} from '../../common/deepCopy';
import {KifizetesDto} from '../kifizetesdto';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-kifizetes-szerkesztes',
  templateUrl: './kifizetes-szerkesztes.component.html'
})
export class KifizetesSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new KifizetesDto();
  @Input() set DtoOriginal(value: KifizetesDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() Bizonylat = new BizonylatDto();
  @Output() eventSzerkeszteskesz = new EventEmitter<KifizetesDto>();

  SzerkesztesMode = KifizetesSzerkesztesMode.Blank;

  form: FormGroup;
  eppFrissit = false;

  kifizeteszoombox: any;

  bizonylatkifizetesservice: KifizetesService;

  constructor(private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;

    this.form = this._fb.group({
      'datum': ['', [Validators.required]],
      'osszeg': [0, [Validators.required]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
      'fizetesimod': ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    this.kifizeteszoombox = document.getElementById('kifizeteszoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.bizonylatkifizetesservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.DtoEdited.Osszeg = this.Bizonylat.Brutto;
          this.DtoEdited.Penznemkod = this.Bizonylat.Penznemkod;
          this.DtoEdited.Penznem = this.Bizonylat.Penznem;
          this.DtoEdited.Fizetesimodkod = this.Bizonylat.Fizetesimodkod;
          this.DtoEdited.Fizetesimod = this.Bizonylat.Fizetesimod;
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
    const formDatum = moment(this.DtoEdited.Datum).format('YYYY-MM-DD');

    this.form.controls['datum'].setValue(formDatum);
    this.form.controls['osszeg'].setValue(this.DtoEdited.Osszeg);
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem);
    this.form.controls['fizetesimod'].setValue(this.DtoEdited.Fizetesimod);
  }
  updatedto() {
    const dtoDatum = moment(this.form.value['datum']).toISOString(true);

    this.DtoEdited.Datum = dtoDatum;
    this.DtoEdited.Osszeg = this.form.value['osszeg'];
    this.DtoEdited.Penznem = this.form.value['penznem'];
    this.DtoEdited.Fizetesimod = this.form.value['fizetesimod'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._penznemservice.ZoomCheck(new PenznemZoomParam(this.DtoEdited.Penznemkod, this.DtoEdited.Penznem))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParam(this.DtoEdited.Fizetesimodkod, this.DtoEdited.Fizetesimod));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.uj) {
          this.DtoEdited.Bizonylatkod = this.Bizonylat.Bizonylatkod;
          return this.bizonylatkifizetesservice.Add(this.DtoEdited);
        } else {
          return this.bizonylatkifizetesservice.Update(this.DtoEdited);
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this.bizonylatkifizetesservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res3.Result[0]);
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
    this.SzerkesztesMode = KifizetesSzerkesztesMode.PenznemZoom;
    this.kifizeteszoombox.style.display = 'block';
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
    this.updateform();
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
    this.kifizeteszoombox.style.display = 'none';
  }

  FizetesimodZoom() {
    this.updatedto();
    this.SzerkesztesMode = KifizetesSzerkesztesMode.FizetesimodZoom;
    this.kifizeteszoombox.style.display = 'block';
  }
  onFizetesimodSelectzoom(Dto: FizetesimodDto) {
    this.DtoEdited.Fizetesimodkod = Dto.Fizetesimodkod;
    this.DtoEdited.Fizetesimod = Dto.Fizetesimod1;
    this.updateform();
  }
  onFizetesimodStopzoom() {
    this.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
    this.kifizeteszoombox.style.display = 'none';
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
