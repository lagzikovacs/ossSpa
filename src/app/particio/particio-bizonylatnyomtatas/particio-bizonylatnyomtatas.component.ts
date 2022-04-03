import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../../05 Segedeszkozok/01 Particio/particiodto';
import {BizonylatConf} from '../../05 Segedeszkozok/01 Particio/bizonylatconf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-particio-bizonylatnyomtatas',
  templateUrl: './particio-bizonylatnyomtatas.component.html'
})
export class ParticioBizonylatComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  form: FormGroup;
  cBizonylat: BizonylatConf;

  constructor(private _fb: FormBuilder) {

    this.form = this._fb.group({
      'bizonylatkepiratkod': [0, [Validators.required]],
      'eredetipeldanyokszama': [0, [Validators.required]],
      'masolatokszama': [0, [Validators.required]],
    });
  }

  ngOnInit() {
    try {
      this.cBizonylat = JSON.parse(this.Dto.Bizonylat); // kivétel, ha hibás
      if (this.cBizonylat === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cBizonylat = new BizonylatConf();
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['bizonylatkepiratkod'].setValue(this.cBizonylat.BizonylatkepIratkod);
    this.form.controls['eredetipeldanyokszama'].setValue(this.cBizonylat.EredetipeldanyokSzama);
    this.form.controls['masolatokszama'].setValue(this.cBizonylat.MasolatokSzama);
  }
  updateconf() {
    this.cBizonylat.BizonylatkepIratkod = this.form.value['bizonylatkepiratkod'];
    this.cBizonylat.EredetipeldanyokSzama = this.form.value['eredetipeldanyokszama'];
    this.cBizonylat.MasolatokSzama = this.form.value['masolatokszama'];
  }

  onSubmit() {
    this.updateconf();
    this.Dto.Bizonylat = JSON.stringify(this.cBizonylat);

    this.eventOk.emit(this.Dto);
  }
  onCancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
