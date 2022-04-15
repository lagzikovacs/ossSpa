import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VagolapService} from '../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {IratDto} from '../../02 Eszkozok/02 Irat/irat/iratdto';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';

@Component({
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
