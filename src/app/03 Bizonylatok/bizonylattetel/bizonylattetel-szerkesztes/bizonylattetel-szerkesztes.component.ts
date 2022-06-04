import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {CikkService} from '../../../01 Torzsadatok/06 Cikk/cikk.service';
import {MeService} from '../../../01 Torzsadatok/04 Mennyisegiegyseg/me.service';
import {AfakulcsService} from '../../../01 Torzsadatok/05 Afakulcs/afakulcs.service';
import {TermekdijService} from '../../../01 Torzsadatok/051 Termekdij/termekdij.service';
import {BruttobolParam} from '../bruttobolparam';
import {CikkZoomParam} from '../../../01 Torzsadatok/06 Cikk/cikkzoomparam';
import {TermekdijZoomParam} from '../../../01 Torzsadatok/051 Termekdij/termekdijzoomparam';
import {MeZoomParam} from '../../../01 Torzsadatok/04 Mennyisegiegyseg/mezoomparam';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatTipusLeiro} from '../../bizonylat/bizonylattipusleiro';
import {BizonylatTetelDto} from '../bizonylatteteldto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {AfakulcsZoomParam} from '../../../01 Torzsadatok/05 Afakulcs/afakulcszoomparam';
import {BizonylattetelService} from '../bizonylattetel.service';
import {TermekdijListComponent} from '../../../01 Torzsadatok/051 Termekdij/termekdij-list/termekdij-list.component';
import {ModalService} from '../../../common/modal/modal.service';
import {AfakulcsListComponent} from '../../../01 Torzsadatok/05 Afakulcs/afakulcs-list/afakulcs-list.component';
import {MeListComponent} from '../../../01 Torzsadatok/04 Mennyisegiegyseg/me-list/me-list.component';
import {CikkListComponent} from '../../../01 Torzsadatok/06 Cikk/cikk-list/cikk-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylattetel-szerkesztes',
  templateUrl: './bizonylattetel-szerkesztes.component.html'
})
export class BizonylattetelSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_bizonylattetelszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_bizonylattetelszerk';
  bodyclass = '';

  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() teteluj = false;
  @Input() szvesz = false;
  @Input() TetelDtoEdited = new BizonylatTetelDto();
  @Output() eventOk = new EventEmitter<BizonylatTetelDto>();
  @Output() eventMegsem = new EventEmitter<void>();

  bruttoosszeg = 0;

  formTetel: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatservice: BizonylatService;
  bizonylattetelservice: BizonylattetelService;

  constructor(private _cikkservice: CikkService,
              private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _modalservice: ModalService,
              bizonylatservice: BizonylatService,
              bizonylattetelservice: BizonylattetelService) {
    super();

    this.bizonylatservice = bizonylatservice;
    this.bizonylattetelservice = bizonylattetelservice;

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

    this.vcr.clear();
    const C = this.vcr.createComponent(CikkListComponent);
    C.instance.maszk = this.TetelDtoEdited.Megnevezes || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.TetelDtoEdited.Cikkkod = dto.Cikkkod;
      this.TetelDtoEdited.Megnevezes = dto.Megnevezes;
      this.TetelDtoEdited.Mekod = dto.Mekod;
      this.TetelDtoEdited.Me = dto.Me;
      this.TetelDtoEdited.Afakulcskod = dto.Afakulcskod;
      this.TetelDtoEdited.Afakulcs = dto.Afakulcs;
      this.TetelDtoEdited.Afamerteke = dto.Afamerteke;
      this.TetelDtoEdited.Egysegar = dto.Egysegar;
      this.TetelDtoEdited.Tomegkg = dto.Tomegkg;

      this.TetelDtoEdited.Termekdijkod = dto.Termekdijkod;
      this.TetelDtoEdited.Termekdijkt = dto.Termekdijkt;
      this.TetelDtoEdited.Termekdijmegnevezes = dto.Termekdijmegnevezes;
      this.TetelDtoEdited.Termekdijegysegar = dto.Termekdijegysegar;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-complex';
    this._modalservice.open(this.modalname);
  }

  MeZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(MeListComponent);
    C.instance.maszk = this.TetelDtoEdited.Me || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.TetelDtoEdited.Mekod = dto.Mekod;
      this.TetelDtoEdited.Me = dto.Me;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }

  AfakulcsZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(AfakulcsListComponent);
    C.instance.maszk = this.TetelDtoEdited.Afakulcs || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.TetelDtoEdited.Afakulcskod = dto.Afakulcskod;
      this.TetelDtoEdited.Afakulcs = dto.Afakulcs1;
      this.TetelDtoEdited.Afamerteke = dto.Afamerteke;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }

  TermekdijZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(TermekdijListComponent);
    C.instance.maszk = this.TetelDtoEdited.Termekdijkt || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.TetelDtoEdited.Termekdijkod = dto.Termekdijkod;
      this.TetelDtoEdited.Termekdijkt = dto.Termekdijkt;
      this.TetelDtoEdited.Termekdijmegnevezes = dto.Termekdijmegnevezes;
      this.TetelDtoEdited.Termekdijegysegar = dto.Termekdijegysegar;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }

  TermekdijTorles() {
    this.TetelDtoEdited.Termekdijkod = null;
    this.TetelDtoEdited.Termekdijkt = null;
    this.TetelDtoEdited.Termekdijmegnevezes = null;
    this.TetelDtoEdited.Termekdijegysegar = null;

    this.updateform();
  }

  async bruttobol() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.bizonylattetelservice.Bruttobol(new BruttobolParam(this.TetelDtoEdited, this.bruttoosszeg));
      if (res.Error != null) {
        throw res.Error;
      }

      this.TetelDtoEdited = res.Result[0];
      this.updateform();
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async tetelcalc(event: any) {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.bizonylattetelservice.BizonylattetelCalc(this.TetelDtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      this.TetelDtoEdited = res.Result[0];
      this.updateform();
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res1 = await this._cikkservice.ZoomCheck(new CikkZoomParam(this.TetelDtoEdited.Cikkkod || 0,
        this.TetelDtoEdited.Megnevezes || ''));
      if (res1.Error != null) {
        throw res1.Error;
      }

      const res2 = await this._meservice.ZoomCheck(new MeZoomParam(this.TetelDtoEdited.Mekod || 0,
        this.TetelDtoEdited.Me || ''));
      if (res2.Error != null) {
        throw res2.Error;
      }

      const res3 = await this._afakulcsservice.ZoomCheck(new AfakulcsZoomParam(this.TetelDtoEdited.Afakulcskod || 0,
        this.TetelDtoEdited.Afakulcs || ''));
      if (res3.Error != null) {
        throw res3.Error;
      }

      if (this.TetelDtoEdited.Termekdijas) {
        const res4 = await this._termekdijservice.ZoomCheck(new TermekdijZoomParam(this.TetelDtoEdited.Termekdijkod || 0,
          this.TetelDtoEdited.Termekdijkt || ''));
        if (res4.Error != null) {
          throw res4.Error;
        }
      }

      const res5 = await this.bizonylattetelservice.BizonylattetelCalc(this.TetelDtoEdited);
      if (res5.Error != null) {
        throw res5.Error;
      }

      this.spinner = false;
      this.eventOk.emit(res5.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
