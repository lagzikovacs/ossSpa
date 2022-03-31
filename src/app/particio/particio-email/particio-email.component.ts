import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {EmailConf} from '../emailconf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  form: FormGroup;
  cEmails: EmailConf[];

  constructor(private _fb: FormBuilder) {

    this.form = this._fb.group({
      'konfiguracio': ['', [Validators.required]],
      'azonosito': ['', [Validators.required]],
      'jelszo': ['', [Validators.required]],
      'kuldoneve': ['', [Validators.required]],
      'kuldoemailcime': ['', [Validators.required]],
      'klienstipus': ['', [Validators.required]],
      'customhost': [''],
      'customport': [0],
      'ssl': [false, [Validators.required]],
    });
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

    this.selected = 0;
    this.updateform();
  }

  updateform() {
    this.form.controls['konfiguracio'].setValue(this.selected);

    this.form.controls['azonosito'].setValue(this.cEmails[this.selected].Azonosito);
    this.form.controls['jelszo'].setValue(this.cEmails[this.selected].Jelszo);
    this.form.controls['kuldoneve'].setValue(this.cEmails[this.selected].KuldoNeve);
    this.form.controls['kuldoemailcime'].setValue(this.cEmails[this.selected].KuldoEmailcime);
    this.form.controls['klienstipus'].setValue(this.cEmails[this.selected].Tipus);
    this.form.controls['customhost'].setValue(this.cEmails[this.selected].CustomHost);
    this.form.controls['customport'].setValue(this.cEmails[this.selected].CustomPort);
    this.form.controls['ssl'].setValue(this.cEmails[this.selected].Ssl);
  }
  selectedchange(i) {
    this.updateconf();
    this.selected = i;
    this.updateform();
  }
  updateconf() {
    this.cEmails[this.selected].Azonosito = this.form.value['azonosito'];
    this.cEmails[this.selected].Jelszo = this.form.value['jelszo'];
    this.cEmails[this.selected].KuldoNeve = this.form.value['kuldoneve'];
    this.cEmails[this.selected].KuldoEmailcime = this.form.value['kuldoemailcime'];
    this.cEmails[this.selected].Tipus = this.form.value['klienstipus'];
    this.cEmails[this.selected].CustomHost = this.form.value['customhost'];
    this.cEmails[this.selected].CustomPort = this.form.value['customport'];
    this.cEmails[this.selected].Ssl = this.form.value['ssl'];
  }

  onSubmit() {
    this.updateconf();
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
