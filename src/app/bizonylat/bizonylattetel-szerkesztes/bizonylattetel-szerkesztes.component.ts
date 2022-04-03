import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {CikkService} from '../../cikk/cikk.service';
import {MeService} from '../../primitiv/me/me.service';
import {AfakulcsService} from '../../primitiv/afakulcs/afakulcs.service';
import {TermekdijService} from '../../primitiv/termekdij/termekdij.service';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {BruttobolParam} from '../bruttobolparam';
import {CikkZoomParameter} from '../../cikk/cikkzoomparameter';
import {EmptyResult} from '../../common/dtos/emptyresult';
import {TermekdijZoomParameter} from '../../primitiv/termekdij/termekdijzoomparameter';
import {AfakulcsZoomParameter} from '../../primitiv/afakulcs/afakulcszoomparameter';
import {MeZoomParameter} from '../../primitiv/me/mezoomparameter';
import {ErrorService} from '../../tools/errorbox/error.service';
import {AfakulcsDto} from '../../primitiv/afakulcs/afakulcsdto';
import {MeDto} from '../../primitiv/me/medto';
import {TermekdijDto} from '../../primitiv/termekdij/termekdijdto';
import {CikkDto} from '../../cikk/cikkdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatTetelDto} from '../bizonylatteteldto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-bizonylattetel-szerkesztes',
  templateUrl: './bizonylattetel-szerkesztes.component.html'
})
export class BizonylattetelSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() teteluj = false;
  @Input() szvesz = false;
  @Input() TetelDtoEdited = new BizonylatTetelDto();
  @Output() eventUjModositasUtan = new EventEmitter<BizonylatTetelDto>();

  TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;

  bruttoosszeg = 0;

  formTetel: FormGroup;
  eppFrissit = false;

  bizonylattetelzoombox: any;

  bizonylatservice: BizonylatService;

  constructor(private _cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              bizonylatservice: BizonylatService) {
    super();

    this.bizonylatservice = bizonylatservice;

    this.formTetel = this._fb.group({
      'megnevezes': ['', [Validators.required, Validators.maxLength(100)]],
      'mennyiseg': [0, [Validators.required, Validators.min(0)]],
      'me': ['', [Validators.required, Validators.maxLength(10)]],
      'egysegar': [0, [Validators.required]],
      'bruttoosszeg': [0, []],
      'afakulcs': ['', [Validators.required, Validators.maxLength(10)]],
      'megjegyzes': ['', []],
      'netto': [{value: 0, disabled: true}, []],
      'afa': [{value: 0, disabled: true}, []],
      'brutto': [{value: 0, disabled: true}, []],

      'tomegkg': [0, [Validators.required, Validators.min(0)]],
      'termekdijkt': ['', [Validators.maxLength(10)]],
      'termekdijmegnevezes': [{value: '', disabled: true}, []],
      'termekdijegysegar': ['', []],
      'termekdij': [{value: '', disabled: true}, []],
      'termekdijas': ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.bizonylattetelzoombox = document.getElementById('bizonylattetelzoombox');

    this.updateform();
  }

  updateform() {
    this.formTetel.controls['megnevezes'].setValue(this.TetelDtoEdited.Megnevezes);
    this.formTetel.controls['mennyiseg'].setValue(this.TetelDtoEdited.Mennyiseg);
    this.formTetel.controls['me'].setValue(this.TetelDtoEdited.Me);
    this.formTetel.controls['egysegar'].setValue(this.TetelDtoEdited.Egysegar);
    this.formTetel.controls['bruttoosszeg'].setValue(this.bruttoosszeg);
    this.formTetel.controls['afakulcs'].setValue(this.TetelDtoEdited.Afakulcs);
    this.formTetel.controls['megjegyzes'].setValue(this.TetelDtoEdited.Megjegyzes);
    this.formTetel.controls['netto'].setValue(this.TetelDtoEdited.Netto);
    this.formTetel.controls['afa'].setValue(this.TetelDtoEdited.Afa);
    this.formTetel.controls['brutto'].setValue(this.TetelDtoEdited.Brutto);

    this.formTetel.controls['tomegkg'].setValue(this.TetelDtoEdited.Tomegkg);
    this.formTetel.controls['termekdijkt'].setValue(this.TetelDtoEdited.Termekdijkt);
    this.formTetel.controls['termekdijmegnevezes'].setValue(this.TetelDtoEdited.Termekdijmegnevezes);
    this.formTetel.controls['termekdijegysegar'].setValue(this.TetelDtoEdited.Termekdijegysegar);
    this.formTetel.controls['termekdij'].setValue(this.TetelDtoEdited.Termekdij);
    this.formTetel.controls['termekdijas'].setValue(this.TetelDtoEdited.Termekdijas);
  }
  updatedto() {
    this.TetelDtoEdited.Megnevezes = this.formTetel.value['megnevezes'];
    this.TetelDtoEdited.Mennyiseg = this.formTetel.value['mennyiseg'];
    this.TetelDtoEdited.Me = this.formTetel.value['me'];
    this.TetelDtoEdited.Egysegar = this.formTetel.value['egysegar'];
    this.bruttoosszeg = this.formTetel.value['bruttoosszeg'];
    this.TetelDtoEdited.Afakulcs = this.formTetel.value['afakulcs'];
    this.TetelDtoEdited.Megjegyzes = this.formTetel.value['megjegyzes'];

    this.TetelDtoEdited.Tomegkg = this.formTetel.value['tomegkg'];
    this.TetelDtoEdited.Termekdijkt = this.formTetel.value['termekdijkt'];
    this.TetelDtoEdited.Termekdijegysegar = this.formTetel.value['termekdijegysegar'];
    this.TetelDtoEdited.Termekdijas = this.formTetel.value['termekdijas'];
  }


  CikkZoom() {
    this.updatedto();
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.CikkZoom;
    this.bizonylattetelzoombox.style.display = 'block';
  }
  onCikkSelectzoom(Dto: CikkDto) {
    this.TetelDtoEdited.Cikkkod = Dto.Cikkkod;
    this.TetelDtoEdited.Megnevezes = Dto.Megnevezes;
    this.TetelDtoEdited.Mekod = Dto.Mekod;
    this.TetelDtoEdited.Me = Dto.Me;
    this.TetelDtoEdited.Afakulcskod = Dto.Afakulcskod;
    this.TetelDtoEdited.Afakulcs = Dto.Afakulcs;
    this.TetelDtoEdited.Afamerteke = Dto.Afamerteke;
    this.TetelDtoEdited.Egysegar = Dto.Egysegar;
    this.TetelDtoEdited.Tomegkg = Dto.Tomegkg;

    this.TetelDtoEdited.Termekdijkod = Dto.Termekdijkod;
    this.TetelDtoEdited.Termekdijkt = Dto.Termekdijkt;
    this.TetelDtoEdited.Termekdijmegnevezes = Dto.Termekdijmegnevezes;
    this.TetelDtoEdited.Termekdijegysegar = Dto.Termekdijegysegar;

    this.updateform();
  }
  onCikkStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
  }

  MeZoom() {
    this.updatedto();
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.MeZoom;
    this.bizonylattetelzoombox.style.display = 'block';
  }
  onMeSelectzoom(Dto: MeDto) {
    this.TetelDtoEdited.Mekod = Dto.Mekod;
    this.TetelDtoEdited.Me = Dto.Me;

    this.updateform();
  }
  onMeStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
  }

  AfakulcsZoom() {
    this.updatedto();
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.AfakulcsZoom;
    this.bizonylattetelzoombox.style.display = 'block';
  }
  onAfakulcsSelectzoom(Dto: AfakulcsDto) {
    this.TetelDtoEdited.Afakulcskod = Dto.Afakulcskod;
    this.TetelDtoEdited.Afakulcs = Dto.Afakulcs1;
    this.TetelDtoEdited.Afamerteke = Dto.Afamerteke;

    this.updateform();
  }
  onAfakulcsStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
  }

  TermekdijZoom() {
    this.updatedto();
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.TermekdijZoom;
    this.bizonylattetelzoombox.style.display = 'block';
  }
  onTermekdijSelectzoom(Dto: TermekdijDto) {
    this.TetelDtoEdited.Termekdijkod = Dto.Termekdijkod;
    this.TetelDtoEdited.Termekdijkt = Dto.Termekdijkt;
    this.TetelDtoEdited.Termekdijmegnevezes = Dto.Termekdijmegnevezes;
    this.TetelDtoEdited.Termekdijegysegar = Dto.Termekdijegysegar;

    this.updateform();
  }
  onTermekdijStopzoom() {
    this.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this.bizonylattetelzoombox.style.display = 'none';
  }

  TermekdijTorles() {
    this.TetelDtoEdited.Termekdijkod = null;
    this.TetelDtoEdited.Termekdijkt = null;
    this.TetelDtoEdited.Termekdijmegnevezes = null;
    this.TetelDtoEdited.Termekdijegysegar = null;

    this.updateform();
  }

  bruttobol() {
    this.eppFrissit = true;
    this.updatedto();

    this.bizonylatservice.Bruttobol(new BruttobolParam(this.TetelDtoEdited, this.bruttoosszeg))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.TetelDtoEdited = res.Result[0];
        this.updateform();
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  tetelcalc(event: any) {
    this.eppFrissit = true;
    this.updatedto();

    this.bizonylatservice.BizonylattetelCalc(this.TetelDtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.TetelDtoEdited = res.Result[0];
        this.updateform();
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  async onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    try {
      const res1 = await this._cikkservice.ZoomCheck(new CikkZoomParameter(this.TetelDtoEdited.Cikkkod || 0,
        this.TetelDtoEdited.Megnevezes || ''));
      if (res1.Error != null) {
        throw res1.Error;
      }

      const res2 = await this._meservice.ZoomCheck(new MeZoomParameter(this.TetelDtoEdited.Mekod || 0,
        this.TetelDtoEdited.Me || ''));
      if (res2.Error != null) {
        throw res2.Error;
      }

      const res3 = await this._afakulcsservice.ZoomCheck(new AfakulcsZoomParameter(this.TetelDtoEdited.Afakulcskod || 0,
        this.TetelDtoEdited.Afakulcs || ''));
      if (res3.Error != null) {
        throw res3.Error;
      }

      if (this.TetelDtoEdited.Termekdijas) {
        const res4 = await this._termekdijservice.ZoomCheck(new TermekdijZoomParameter(this.TetelDtoEdited.Termekdijkod || 0,
          this.TetelDtoEdited.Termekdijkt || ''));
        if (res4.Error != null) {
          throw res4.Error;
        }
      }

      const res5 = await this.bizonylatservice.BizonylattetelCalc(this.TetelDtoEdited);
      if (res5.Error != null) {
        throw res5.Error;
      }

      this.eppFrissit = false;
      this.eventUjModositasUtan.emit(res5.Result[0]);
    } catch (err) {
      this.eppFrissit = false;
      this._errorservice.Error = err;
    }
  }

  cancel() {
    this.eventUjModositasUtan.emit(null);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
