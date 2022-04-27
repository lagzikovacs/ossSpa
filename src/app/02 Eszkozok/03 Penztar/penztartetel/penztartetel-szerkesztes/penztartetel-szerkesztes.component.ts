import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';
import * as moment from 'moment';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {PenztartetelDto} from '../penztarteteldto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penztartetel-szerkesztes',
  templateUrl: './penztartetel-szerkesztes.component.html'
})
export class PenztartetelSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild('jogcim', {static: true}) jogcimInput: ElementRef;

  @Input() Penztarkod = -1;

  DtoEdited = new PenztartetelDto();

  @Output() eventSzerkeszteskesz = new EventEmitter<PenztartetelDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  penztartetelservice: PenztartetelService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;

    this.form = this._fb.group({
      'datum': ['', [Validators.required]],
      'jogcim': ['', [Validators.required, Validators.maxLength(50)]],
      'bevetel': [0, []],
      'kiadas': [0, []],
      'ugyfel': ['', [Validators.maxLength(200)]],
      'bizonylatszam': ['', [Validators.maxLength(20)]],
      'megjegyzes': ['', [Validators.maxLength(200)]],
    });
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.penztartetelservice.CreateNew();
      if (res.Error !== null) {
        throw res.Error;
      }

      this.DtoEdited = res.Result[0];
      this.DtoEdited.Penztarkod = this.Penztarkod;

      this.updateform();
      this.jogcimInput.nativeElement.selectedIndex = 2;
      this.jogcimchange();

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  jogcimchange() {
    this.form.controls['ugyfel'].enable();
    this.form.controls['bizonylatszam'].enable();
    this.form.controls['bevetel'].enable();
    this.form.controls['kiadas'].enable();

    switch (this.jogcimInput.nativeElement.selectedIndex) {
      case 0: // Bevét korrekció
        this.form.controls['ugyfel'].disable();
        this.form.controls['bizonylatszam'].disable();
        this.form.controls['bevetel'].disable();
        break;
      case 1: // Kiadás korrekció
        this.form.controls['ugyfel'].disable();
        this.form.controls['bizonylatszam'].disable();
        this.form.controls['kiadas'].disable();
        break;
      case 2: // pénzfelvét bankból
        this.form.controls['ugyfel'].disable();
        this.form.controls['bizonylatszam'].disable();
        this.form.controls['kiadas'].disable();
        break;
      case 3: // befizetés bankba
        this.form.controls['ugyfel'].disable();
        this.form.controls['bizonylatszam'].disable();
        this.form.controls['bevetel'].disable();
        break;
      case 4: // Bejövő számla
        this.form.controls['bevetel'].disable();
        break;
      case 5: // Kimenő számla
        this.form.controls['kiadas'].disable();
        break;
      case 6: // Bérkifizetés
        this.form.controls['bizonylatszam'].disable();
        this.form.controls['bevetel'].disable();
        break;
    }
  }

  updateform() {
    const formDatum = moment(this.DtoEdited.Datum).format('YYYY-MM-DD');

    this.form.controls['datum'].setValue(formDatum);
    this.form.controls['jogcim'].setValue(this.DtoEdited.Jogcim);
    this.form.controls['bevetel'].setValue(this.DtoEdited.Bevetel);
    this.form.controls['kiadas'].setValue(this.DtoEdited.Kiadas);
    this.form.controls['ugyfel'].setValue(this.DtoEdited.Ugyfelnev);
    this.form.controls['bizonylatszam'].setValue(this.DtoEdited.Bizonylatszam);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    const dtoDatum = moment(this.form.value['datum']).toISOString(true);

    this.DtoEdited.Datum = dtoDatum;
    this.DtoEdited.Jogcim = this.form.value['jogcim'];
    this.DtoEdited.Bevetel = this.form.value['bevetel'];
    this.DtoEdited.Kiadas = this.form.value['kiadas'];
    this.DtoEdited.Ugyfelnev = this.form.value['ugyfel'];
    this.DtoEdited.Bizonylatszam = this.form.value['bizonylatszam'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.penztartetelservice.Add(this.DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.penztartetelservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
