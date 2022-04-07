import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {MeService} from '../../04 Mennyisegiegyseg/me.service';
import {AfakulcsService} from '../../05 Afakulcs/afakulcs.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {AfakulcsDto} from '../../05 Afakulcs/afakulcsdto';
import {MeDto} from '../../04 Mennyisegiegyseg/medto';
import {CikkDto} from '../cikkdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MeZoomParam} from '../../04 Mennyisegiegyseg/mezoomparam';
import {AfakulcsZoomParam} from '../../05 Afakulcs/afakulcszoomparam';
import {CikkService} from '../cikk.service';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ModalService} from '../../../common/modal/modal.service';
import {MeListComponent} from '../../04 Mennyisegiegyseg/me-list/me-list.component';
import {AfakulcsListComponent} from '../../05 Afakulcs/afakulcs-list/afakulcs-list.component';
import {TermekdijListComponent} from '../../051 Termekdij/termekdij-list/termekdij-list.component';
import {NumberResult} from '../../../common/dtos/numberresult';
import {TermekdijService} from '../../051 Termekdij/termekdij.service';
import {TermekdijZoomParam} from '../../051 Termekdij/termekdijzoomparam';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cikk-szerkesztes',
  templateUrl: './cikk-szerkesztes.component.html'
})
export class CikkSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_cikkszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_cikkszerk';

  @Input() uj = false;
  DtoEdited = new CikkDto();
  @Input() set DtoOriginal(value: CikkDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<CikkDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  cikkservice: CikkService;

  constructor(private _meservice: MeService,
              private _afakulcsservice: AfakulcsService,
              private _termekdijservice: TermekdijService,
              private _errorservice: ErrorService,
              private _modalservice: ModalService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              cikkservice: CikkService) {
    super();

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

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.cikkservice.CreateNew();
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    }

    this.updateform();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
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
    this.DtoEdited.Keszletetkepez = this.form.value['kk'] === 'true';
    this.DtoEdited.Tomegkg = this.form.value['tomeg'];

    this.DtoEdited.Termekdijkt = this.form.value['termekdijkt'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._meservice.ZoomCheck(new MeZoomParam(this.DtoEdited.Mekod || 0,
        this.DtoEdited.Me || ''));
      if (res.Error !== null) {
        throw res.Error;
      }

      const res1 = await this._afakulcsservice.ZoomCheck(new AfakulcsZoomParam(this.DtoEdited.Afakulcskod || 0,
        this.DtoEdited.Afakulcs || ''));
      if (res1.Error !== null) {
        throw res1.Error;
      }

      if (this.DtoEdited.Termekdijkt || '' !== '') {
        const res2 = await this._termekdijservice.ZoomCheck(new TermekdijZoomParam(this.DtoEdited.Termekdijkod || 0,
          this.DtoEdited.Termekdijkt || ''));
        if (res2.Error !== null) {
          throw res2.Error;
        }
      }

      let res3: NumberResult;
      if (this.uj) {
        res3 = await this.cikkservice.Add(this.DtoEdited);
      } else {
        res3 = await this.cikkservice.Update(this.DtoEdited);
      }
      if (res3.Error !== null) {
        throw res3.Error;
      }

      const res4 = await this.cikkservice.Get(res3.Result);
      if (res4.Error !== null) {
        throw res4.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res4.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }


  MeZoom() {
    this.updatedto();

    this.vcr.clear();
    const meC = this.vcr.createComponent(MeListComponent);
    meC.instance.maszk = this.DtoEdited.Me || '';
    meC.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Mekod = dto.Mekod;
      this.DtoEdited.Me = dto.Me;
      this.updateform();
    });
    meC.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  AfakulcsZoom() {
    this.updatedto();

    this.vcr.clear();
    const afakulcsC = this.vcr.createComponent(AfakulcsListComponent);
    afakulcsC.instance.maszk = this.DtoEdited.Afakulcs || '';
    afakulcsC.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Afakulcskod = dto.Afakulcskod;
      this.DtoEdited.Afakulcs = dto.Afakulcs1;
      this.DtoEdited.Afamerteke = dto.Afamerteke;
      this.updateform();
    });
    afakulcsC.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  TermekdijZoom() {
    this.updatedto();

    this.vcr.clear();
    const tdC = this.vcr.createComponent(TermekdijListComponent);
    tdC.instance.maszk = this.DtoEdited.Termekdijkt || '';
    tdC.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Termekdijkod = dto.Termekdijkod;
      this.DtoEdited.Termekdijkt = dto.Termekdijkt;
      this.DtoEdited.Termekdijmegnevezes = dto.Termekdijmegnevezes;
      this.DtoEdited.Termekdijegysegar = dto.Termekdijegysegar;
      this.updateform();
    });
    tdC.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  TermekdijTorles() {
    this.updatedto();
    this.DtoEdited.Termekdijkod = null;
    this.DtoEdited.Termekdijkt = null;
    this.DtoEdited.Termekdijmegnevezes = null;
    this.DtoEdited.Termekdijegysegar = null;
    this.updateform();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
