import {Component, Input, OnDestroy} from '@angular/core';
import {ColumnSettings} from './columnsettings';

@Component({
  selector: 'app-reszletek',
  templateUrl: './reszletek.component.html',
  styleUrls: ['./reszletek.component.css']
})
export class ReszletekComponent implements OnDestroy {
  @Input() cim: string;
  @Input() item: any;
  @Input() colsets: ColumnSettings[];

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
