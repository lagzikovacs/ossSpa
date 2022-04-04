import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbarfooter',
  templateUrl: './toolbarfooter.component.html'
})
export class ToolbarfooterComponent implements OnDestroy {
  @Input() enKereses = true;
  @Input() perAll = '0 / 0';
  @Input() rekordszam = 0;
  @Input() osszesrekord = 0;

  @Output() KeresesTovabb = new EventEmitter<void>();

  doKereses() {
    this.KeresesTovabb.emit();
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
