import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {deepCopy} from '../../../common/deepCopy';
import {CsoportDto} from '../csoportdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-csoport-entity',
  templateUrl: './csoport-entity.component.html'
})
export class CsoportEntityComponent implements OnInit, OnDestroy {
  _dto = new CsoportDto();
  @Input() set Dto(value: CsoportDto) {
    this._dto = deepCopy(value);
    this.doCdr();
  }
  _dtoindex = 0;
  @Input() set DtoIndex(value: number) {
    this._dtoindex = value;
    this.doCdr();
  }
  _selected = false;
  _opened = false;
  _zoom = false;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  doCdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
