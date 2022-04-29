import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {JogKod} from '../../../common/enums/jogkod';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {deepCopy} from '../../../common/deepCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ajanlatkeres-egy-toolbar',
  templateUrl: './ajanlatkeres-egy-toolbar.component.html'
})
export class AjanlatkeresEgyToolbarComponent implements OnDestroy {
  Dto = new AjanlatkeresDto();
  @Input() set dto(value: AjanlatkeresDto) {
    this.Dto = deepCopy(value);
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();
  jog = false;

  constructor(private _logonservice: LogonService,
              private _cdr: ChangeDetectorRef) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKERESMOD]);
  }

  doNav(i: number) {
    this.eventNav.emit(i);
  }

  ngOnDestroy(): void {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
