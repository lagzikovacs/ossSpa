import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {JogKod} from '../../../../common/enums/jogkod';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dokumentum-egy-toolbar',
  templateUrl: './dokumentum-egy-toolbar.component.html'
})
export class DokumentumEgyToolbarComponent implements OnDestroy {
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();
  jog = false;

  constructor(private _logonservice: LogonService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
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
