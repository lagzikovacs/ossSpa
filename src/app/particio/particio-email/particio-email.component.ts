import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {EmailConf} from '../emailconf';

@Component({
  selector: 'app-particio-email',
  templateUrl: './particio-email.component.html'
})
export class ParticioEmailComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  entries = ['Sales', 'NAV online számla'];
  selected = 0;

  eMails: EmailConf[];

  selectedchange(i) {
    this.selected = i;
  }

  initemails() {
    this.eMails = new Array<EmailConf>();
    this.eMails.push(new EmailConf());
    this.eMails.push(new EmailConf());
    this.eMails[0].ConfName = 'Sales';
    this.eMails[0].Tipus = 'Gmail';
    this.eMails[0].Ssl = false;
    this.eMails[1].ConfName = 'NAV online számla';
    this.eMails[1].Tipus = 'Gmail';
    this.eMails[1].Ssl = false;
  }

  ngOnInit() {
    try {
      this.eMails = JSON.parse(this.Dto.Emails); // kivétel, ha hibás
      if (this.eMails === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.initemails();
    }
  }

  onSubmit() {
    this.Dto.Emails = JSON.stringify(this.eMails);

    this.eventOk.emit(this.Dto);
  }
  cancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
