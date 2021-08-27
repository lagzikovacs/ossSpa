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

  entries = ['Sales', 'Egyéb'];
  selected = 0;

  cEmails: EmailConf[];

  selectedchange(i) {
    this.selected = i;
  }

  ngOnInit() {
    try {
      this.cEmails = JSON.parse(this.Dto.Emails); // kivétel, ha hibás
      if (this.cEmails === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cEmails = new Array<EmailConf>();
      this.cEmails.push(new EmailConf());
      this.cEmails.push(new EmailConf());
      this.cEmails[0].ConfName = this.entries[0];
      this.cEmails[0].Tipus = 'Gmail';
      this.cEmails[0].Ssl = false;
      this.cEmails[1].ConfName = this.entries[1];
      this.cEmails[1].Tipus = 'Gmail';
      this.cEmails[1].Ssl = false;
    }
  }

  onSubmit() {
    this.Dto.Emails = JSON.stringify(this.cEmails);

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
