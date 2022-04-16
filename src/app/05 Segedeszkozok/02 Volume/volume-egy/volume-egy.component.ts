import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin} from '@w11k/ngx-componentdestroyed';
import {ErrorService} from '../../../common/errorbox/error.service';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {VolumeService} from '../volume.service';
import {deepCopy} from '../../../common/deepCopy';
import {VolumeDto} from '../volumedto';
import {VolumeTesztComponent} from '../volume-teszt/volume-teszt.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-volume-egy',
  templateUrl: './volume-egy.component.html'
})
export class VolumeEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_volume', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() defaultNav = 0;
  Dto = new VolumeDto();
  @Input() set dto(value: VolumeDto) {
    this.Dto = deepCopy(value);
  }

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  volumeservice: VolumeService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              volumeservice: VolumeService) {
    super();

    this.volumeservice = volumeservice;
  }

  ngAfterViewInit() {
    if (this.defaultNav > 0) {
      this.doNav(this.defaultNav);
      this.docdr();
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.volumeservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.volumeservice.ReszletekSettings;
        break;
      case EgyMode.Teszt: // 17
        const teteltorlesC = this.vcr.createComponent(VolumeTesztComponent);

        teteltorlesC.instance.Volumekod = this.Dto.Volumekod;
        break;
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
