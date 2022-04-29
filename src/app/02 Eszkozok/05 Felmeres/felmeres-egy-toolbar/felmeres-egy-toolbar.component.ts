import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../../common/deepCopy';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-felmeres-egy-toolbar',
  templateUrl: './felmeres-egy-toolbar.component.html'
})
export class FelmeresEgyToolbarComponent implements OnDestroy {
  Dto = new FelmeresDto();
  @Input() set dto(value: FelmeresDto) {
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
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.FELMERESMOD]);
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
