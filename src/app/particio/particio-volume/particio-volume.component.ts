import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {VolumeConf} from '../volumeconf';

@Component({
  selector: 'app-particio-volume',
  templateUrl: './particio-volume.component.html'
})
export class ParticioVolumeComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  cVolume: VolumeConf;

  ngOnInit() {
    try {
      this.cVolume = JSON.parse(this.Dto.Volume); // kivétel, ha hibás
      if (this.cVolume === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cVolume = new VolumeConf();
    }
  }

  onSubmit() {
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
