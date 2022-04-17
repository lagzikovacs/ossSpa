import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LogonService} from "../../05 Bejelentkezes/logon.service";
import {JogKod} from "../../../common/enums/jogkod";

@Component({
  selector: 'app-csoport-egy-toolbar',
  templateUrl: './csoport-egy-toolbar.component.html'
})
export class CsoportEgyToolbarComponent implements OnDestroy {
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();
  jog: boolean = false;

  constructor(private _logonservice: LogonService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CSOPORT]);
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
