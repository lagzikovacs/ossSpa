import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {JogKod} from "../../../common/enums/jogkod";
import {LogonService} from "../../../05 Segedeszkozok/05 Bejelentkezes/logon.service";
import {BizonylatDto} from "../bizonylatdto";
import {BizonylatTipus} from "../bizonylattipus";
import {BizonylatTipusLeiro} from "../bizonylattipusleiro";

@Component({
  selector: 'app-bizonylat-egy-toolbar',
  templateUrl: './bizonylat-egy-toolbar.component.html'
})
export class BizonylatEgyToolbarComponent implements OnDestroy {
  @Input() Dto = new BizonylatDto();
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();

  @Input() enTorles = true;
  @Input() enProjekt = true;
  @Input() enLevalasztas = false;
  @Output() eventNav: EventEmitter<number> = new EventEmitter<number>();

  jog = false;

  constructor(private _logonservice: LogonService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
  }

  modositasenabled(): boolean {
    return this.Dto.Bizonylatszam === null;
  }
  torlesenabled(): boolean {
    return this.Dto.Bizonylatszam === null;
  }
  kibocsatasenabled(): boolean {
    return this.Dto.Bizonylatszam === null;
  }
  kiszallitvaenabled(): boolean {
    return this.bizonylatTipus === BizonylatTipus.Megrendeles;
  }
  fuvarszamlaenabled(): boolean {
    return this.bizonylatTipus === BizonylatTipus.BejovoSzamla &&
      this.Dto.Bizonylatszam !== null;
  }
  kifizetesrendbenenabled(): boolean {
    return (this.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatTipus === BizonylatTipus.DijBekero ||
      this.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.Dto.Bizonylatszam !== null;
  }
  penztarenabled(): boolean {
    return (this.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
      this.bizonylatTipus === BizonylatTipus.ElolegSzamla) &&
      this.Dto.Bizonylatszam !== null &&
      this.Dto.Fizetesimod === 'Készpénz';
  }
  stornoenabled(): boolean {
    return this.Dto.Bizonylatszam !== null &&
      this.bizonylatLeiro.Stornozhato &&
      !this.Dto.Ezstornozott &&
      !this.Dto.Ezstornozo;
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
