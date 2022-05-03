import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VagolapService} from '../vagolap.service';
import {VagolapMode} from '../vagolapmode';
import {VagolapDto} from '../vagolapdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vagolap',
  templateUrl: './vagolap.component.html'
})
export class VagolapComponent implements OnInit, OnDestroy {
  @Input() Mode = VagolapMode.List;

  vagolapservice: VagolapService;

  constructor(private _cdr: ChangeDetectorRef,
              vagolapservice: VagolapService) {
    this.vagolapservice = vagolapservice;
  }

  ngOnInit() {
    for (let i = 0; i < this.vagolapservice.Dto.length; i++) {
      this.vagolapservice.Dto[i].selected = false;
    }
  }

  doTorles() {
    this.vagolapservice.Dto = new Array<VagolapDto>();
  }

  isdisabled(i: number) {
    if (this.Mode === VagolapMode.List) {
      return true;
    }
    if (this.Mode === VagolapMode.Bizonylatirat && this.vagolapservice.Dto[i].tipus === 1) {
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
