import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../enums/jogkod';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-primitiv-egy-toolbar',
  templateUrl: './primitiv-egy-toolbar.component.html'
})
export class PrimitivEgyToolbarComponent implements OnDestroy {
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();
  jog = false;

  constructor(private _logonservice: LogonService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
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

