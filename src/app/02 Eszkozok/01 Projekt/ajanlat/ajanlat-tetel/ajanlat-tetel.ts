import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {CikkDto} from '../../../../01 Torzsadatok/06 Cikk/cikkdto';
import {AjanlatBuf} from '../ajanlatbuf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {CikkListComponent} from '../../../../01 Torzsadatok/06 Cikk/cikk-list/cikk-list.component';
import {ModalService} from '../../../../common/modal/modal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ajanlat-tetel',
  templateUrl: './ajanlat-tetel.html'
})
export class AjanlatTetelComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_ajanlatszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_ajanlatszerk';

  @Input() item: AjanlatBuf;
  @Output() eventTetelKesz = new EventEmitter<AjanlatBuf>();

  formTetel: FormGroup;

  constructor(private _fb: FormBuilder,
              private _modalservice: ModalService) {
    super();

    this.formTetel = this._fb.group({
      'cikk': ['', [Validators.required, Validators.maxLength(100)]],
      'mennyiseg': [0, [Validators.required, Validators.min(0)]],
      'egysegar': [0, [Validators.required, Validators.min(0)]],
      'egysegnyi': [0, []],
      'garancia': [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.formTetel.controls['cikk'].setValue(this.item.CikkNev);
    this.formTetel.controls['mennyiseg'].setValue(this.item.Mennyiseg);
    this.formTetel.controls['egysegar'].setValue(this.item.EgysegAr);
    this.formTetel.controls['egysegnyi'].setValue(this.item.EgysegnyiTeljesitmeny);
    this.formTetel.controls['garancia'].setValue(this.item.Garancia);
  }
  updatedto() {
    this.item.CikkNev = this.formTetel.value['cikk'];
    this.item.Mennyiseg = this.formTetel.value['mennyiseg'];
    this.item.EgysegAr = this.formTetel.value['egysegar'];
    this.item.EgysegnyiTeljesitmeny = this.formTetel.value['egysegnyi'];
    this.item.Garancia = this.formTetel.value['garancia'];
  }

  CikkZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(CikkListComponent);
    C.instance.maszk = this.item.CikkNev || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.item.CikkKod = dto.Cikkkod;
      this.item.CikkNev = dto.Megnevezes;
      this.item.AfaMerteke = dto.Afamerteke;
      this.item.EgysegAr = dto.Egysegar;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  onSubmit() {
    this.updatedto();

    this.eventTetelKesz.emit(this.item);
  }
  cancel() {
    this.eventTetelKesz.emit(null);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
