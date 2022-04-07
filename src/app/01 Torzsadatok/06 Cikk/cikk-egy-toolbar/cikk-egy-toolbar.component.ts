import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cikk-egy-toolbar',
  templateUrl: './cikk-egy-toolbar.component.html'
})
export class CikkEgyToolbarComponent implements OnDestroy {
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();
  jog = false;

  constructor(private _logonservice: LogonService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
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
