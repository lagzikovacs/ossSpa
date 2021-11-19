import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IratDto} from '../../irat/iratdto';
import {VagolapService} from '../vagolap.service';

@Component({
  selector: 'app-vagolap-irathoz',
  templateUrl: './vagolap-irathoz.component.html'
})
export class VagolapIrathozComponent implements OnInit, OnDestroy {
  @Input() item: IratDto;

  constructor(private _vagolapservice: VagolapService) {
  }

  ngOnInit(): void {
    this._vagolapservice.iratotvagolapra(this.item);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
