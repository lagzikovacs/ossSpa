import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VagolapService} from '../vagolap.service';
import {BizonylatDto} from '../../../03 Bizonylatok/bizonylat/bizonylatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vagolap-bizonylathoz',
  templateUrl: './vagolap-bizonylathoz.component.html'
})
export class VagolapBizonylathozComponent implements OnInit, OnDestroy {
  @Input() item: BizonylatDto;
  @Input() tipus: string;

  constructor(private _vagolapservice: VagolapService) {
  }

  ngOnInit(): void {
    this._vagolapservice.bizonylatotvagolapra(this.item, this.tipus);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
