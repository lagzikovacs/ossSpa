import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toolbarfooter',
  templateUrl: './toolbarfooter.component.html',
  styleUrls: ['./toolbarfooter.component.css']
})
export class ToolbarfooterComponent {
  @Input() enKereses = true;
  @Input() perAll = '0 / 0';
  @Input() rekordszam = 0;
  @Input() osszesrekord = 0;

  @Output() KeresesTovabb = new EventEmitter<void>();

  doKereses() {
    this.KeresesTovabb.emit();
  }
}
