import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AjanlatSzerkesztesMode} from '../ajanlatszerkesztesmode';
import {CikkDto} from '../../cikk/cikkdto';
import {AjanlatBuf} from '../ajanlatbuf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajanlat-tetel',
  templateUrl: './ajanlat-tetel.html'
})
export class AjanlatTetelComponent implements OnInit, OnDestroy {
  @Input() item: AjanlatBuf;
  @Output() eventTetelKesz = new EventEmitter<AjanlatBuf>();

  ajanlatzoombox: any;
  AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
  formTetel: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formTetel = this._fb.group({
      'cikk': ['', [Validators.required, Validators.maxLength(100)]],
      'mennyiseg': [0, [Validators.required, Validators.min(0)]],
      'egysegar': [0, [Validators.required, Validators.min(0)]],
      'egysegnyi': [0, []],
      'garancia': [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.ajanlatzoombox = document.getElementById('ajanlatzoombox');

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
    this.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.CikkZoom;
    this.ajanlatzoombox.style.display = 'block';
  }
  onCikkSelectzoom(Dto: CikkDto) {
    this.item.CikkKod = Dto.Cikkkod;
    this.item.CikkNev = Dto.Megnevezes;
    this.item.AfaMerteke = Dto.Afamerteke;
    this.item.EgysegAr = Dto.Egysegar;

    this.updateform();
  }
  onCikkStopzoom() {
    this.AjanlatSzerkesztesMode = AjanlatSzerkesztesMode.Blank;
    this.ajanlatzoombox.style.display = 'none';
  }

  onSubmit() {
    this.updatedto();
    
    this.eventTetelKesz.emit(this.item);
  }
  cancel() {
    this.eventTetelKesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
