import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {PenznemService} from '../../../01 Torzsadatok/03 Penznem/penznem.service';
import {FizetesimodService} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import * as moment from 'moment';
import {PenznemZoomParam} from '../../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {FizetesimodZoomParam} from '../../../01 Torzsadatok/02 Fizetesimod/fiztesimodzoomparam';
import {ErrorService} from '../../../common/errorbox/error.service';
import {PenznemDto} from '../../../01 Torzsadatok/03 Penznem/penznemdto';
import {FizetesimodDto} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimoddto';
import {deepCopy} from '../../../common/deepCopy';
import {KifizetesDto} from '../kifizetesdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ModalService} from '../../../common/modal/modal.service';
import {PenznemListComponent} from '../../../01 Torzsadatok/03 Penznem/penznem-list/penznem-list.component';
import {FizetesimodListComponent} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimod-list/fizetesimod-list.component';
import {BizonylatDto} from '../../../bizonylat/bizonylatdto';
import {NumberResult} from "../../../common/dtos/numberresult";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kifizetes-szerkesztes',
  templateUrl: './kifizetes-szerkesztes.component.html'
})
export class KifizetesSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_kifizetesszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_kifizetesszerk';

  @Input() uj = false;
  DtoEdited = new KifizetesDto();
  @Input() set DtoOriginal(value: KifizetesDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() Bizonylat = new BizonylatDto();
  @Output() eventSzerkeszteskesz = new EventEmitter<KifizetesDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  bizonylatkifizetesservice: KifizetesService;

  constructor(private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              private _modalservice: ModalService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              bizonylatkifizetesservice: KifizetesService) {
    super();

    this.bizonylatkifizetesservice = bizonylatkifizetesservice;

    this.form = this._fb.group({
      'datum': ['', [Validators.required]],
      'osszeg': [0, [Validators.required]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
      'fizetesimod': ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.bizonylatkifizetesservice.CreateNew();
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
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.updateform();
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
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

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._penznemservice.ZoomCheck(new PenznemZoomParam(this.DtoEdited.Penznemkod, this.DtoEdited.Penznem));
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParam(this.DtoEdited.Fizetesimodkod, this.DtoEdited.Fizetesimod));
      if (res1.Error != null) {
        throw res1.Error;
      }

      let res2: NumberResult;
      if (this.uj) {
        this.DtoEdited.Bizonylatkod = this.Bizonylat.Bizonylatkod;
        res2 = await this.bizonylatkifizetesservice.Add(this.DtoEdited);
      } else {
        res2 = await this.bizonylatkifizetesservice.Update(this.DtoEdited);
      }
      if (res2.Error != null) {
        throw res2.Error;
      }

      const res3 = await this.bizonylatkifizetesservice.Get(res2.Result);
      if (res3.Error != null) {
        throw res3.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res3.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  PenznemZoom() {
    this.updatedto();

    this.vcr.clear();
    const penznemC = this.vcr.createComponent(PenznemListComponent);
    penznemC.instance.maszk = this.DtoEdited.Penznem || '';
    penznemC.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Penznemkod = dto.Penznemkod;
      this.DtoEdited.Penznem = dto.Penznem1;
      this.updateform();
    });
    penznemC.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }


  FizetesimodZoom() {
    this.updatedto();

    this.vcr.clear();
    const fizetesimodC = this.vcr.createComponent(FizetesimodListComponent);
    fizetesimodC.instance.maszk = this.DtoEdited.Fizetesimod || '';
    fizetesimodC.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Fizetesimodkod = dto.Fizetesimodkod;
      this.DtoEdited.Fizetesimod = dto.Fizetesimod1;
      this.updateform();
    });
    fizetesimodC.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }


  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
