import {Component, Input, OnDestroy} from '@angular/core';
import {CikkService} from '../cikk.service';
import {CikkMozgasTetelDto} from '../cikkmozgasteteldto';
import {ColumnSettings} from '../../tools/reszletek/columnsettings';

@Component({
  selector: 'app-cikk-beszerzes-kivet',
  templateUrl: './cikk-beszerzes-kivet.component.html'
})
export class CikkBeszerzesKivetComponent implements OnDestroy {
  @Input() BizonylattipusKod: number;
  @Input() MozgasDto = new Array<CikkMozgasTetelDto>();
  @Input() BeszerzesKivetGridSettings = new Array<ColumnSettings>();

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
