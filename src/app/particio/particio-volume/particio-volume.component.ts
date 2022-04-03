import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../../05 Segedeszkozok/01 Particio/particiodto';
import {VolumeConf} from '../../05 Segedeszkozok/01 Particio/volumeconf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-particio-volume',
  templateUrl: './particio-volume.component.html'
})
export class ParticioVolumeComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  form: FormGroup;
  cVolume: VolumeConf;

  constructor(private _fb: FormBuilder) {

    this.form = this._fb.group({
      'ujvolumemaxmeret': [0, [Validators.required]],
      'ujvolumeeleresiut': ['', [Validators.required]],
    });
  }

  ngOnInit() {
    try {
      this.cVolume = JSON.parse(this.Dto.Volume); // kivétel, ha hibás
      if (this.cVolume === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cVolume = new VolumeConf();
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['ujvolumemaxmeret'].setValue(this.cVolume.UjvolumeMaxmeret);
    this.form.controls['ujvolumeeleresiut'].setValue(this.cVolume.UjvolumeEleresiut);
  }
  updateconf() {
    this.cVolume.UjvolumeMaxmeret = this.form.value['ujvolumemaxmeret'];
    this.cVolume.UjvolumeEleresiut = this.form.value['ujvolumeeleresiut'];
  }

  onSubmit() {
    this.updateconf();
    this.Dto.Volume = JSON.stringify(this.cVolume);

    this.eventOk.emit(this.Dto);
  }
  cancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
