import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {JogKod} from '../../../common/enums/jogkod';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {deepCopy} from '../../../common/deepCopy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hibabejelentes-egy-toolbar',
  templateUrl: './hibabejelentes-egy-toolbar.component.html'
})
export class HibabejelentesEgyToolbarComponent implements OnDestroy {
  Dto = new HibabejelentesDto();
  @Input() set dto(value: HibabejelentesDto) {
    this.Dto = deepCopy(value);
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  @Input() ProjektBol = false;
  @Input() dokcim = '';
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();
  jog = false;

  constructor(private _logonservice: LogonService,
              private _cdr: ChangeDetectorRef) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.HIBABEJELENTESMOD]);
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
