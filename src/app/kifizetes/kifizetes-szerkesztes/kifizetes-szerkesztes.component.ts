import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {FizetesimodService} from '../../primitiv/fizetesimod/fizetesimod.service';
import {KifizetesSzerkesztesMode} from '../kifizetesszerkesztesmode';
import * as moment from 'moment';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {FizetesimodZoomParameter} from '../../primitiv/fizetesimod/fiztesimodzoomparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {PenznemDto} from '../../primitiv/penznem/penznemdto';
import {FizetesimodDto} from '../../primitiv/fizetesimod/fizetesimoddto';
import {deepCopy} from '../../tools/deepCopy';
import {KifizetesDto} from '../kifizetesdto';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';

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

  Datum: any;

  eppFrissit = false;

  kifizeteszoombox: any;

  bizonylatkifizetesservice: KifizetesService;

  constructor(private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
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
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }

    this.Datum = moment(this.DtoEdited.Datum).format('YYYY-MM-DD');
  }

  onSubmit() {
    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.DtoEdited.Penznemkod, this.DtoEdited.Penznem))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParameter(this.DtoEdited.Fizetesimodkod, this.DtoEdited.Fizetesimod));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.DtoEdited.Datum = moment(this.Datum).toISOString(true);
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
    this.SzerkesztesMode = KifizetesSzerkesztesMode.PenznemZoom;
    this.kifizeteszoombox.style.display = 'block';
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
    this.kifizeteszoombox.style.display = 'none';
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
    this.kifizeteszoombox.style.display = 'none';
  }

  FizetesimodZoom() {
    this.SzerkesztesMode = KifizetesSzerkesztesMode.FizetesimodZoom;
    this.kifizeteszoombox.style.display = 'block';
  }
  onFizetesimodSelectzoom(Dto: FizetesimodDto) {
    this.DtoEdited.Fizetesimodkod = Dto.Fizetesimodkod;
    this.DtoEdited.Fizetesimod = Dto.Fizetesimod1;
    this.kifizeteszoombox.style.display = 'none';
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
