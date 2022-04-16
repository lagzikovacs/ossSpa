import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../particiodto';
import {ProjektConf} from '../projektconf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-particio-projektiratminta',
  templateUrl: './particio-projektiratminta.component.html'
})
export class ParticioProjektiratmintaComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto = new ParticioDto();
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  form: FormGroup;
  cProjekt: ProjektConf = new ProjektConf();

  constructor(private _fb: FormBuilder) {

    this.form = this._fb.group({
      'ajanlatiratkod': [0, [Validators.required]],
      'szerzodesiratkod': [0, [Validators.required]],
      'szallitasiszerzodesiratkod': [0, [Validators.required]],
      'feltetelesszerzodesiratkod': [0, [Validators.required]],
      'oftszerzodesiratkod': [0, [Validators.required]],
      'hmketulajdonoshozzajarulasiratkod': [0, [Validators.required]],
      'munkalapiratkod': [0, [Validators.required]],
      'elegedettsegifelmeresiratkod': [0, [Validators.required]],
      'keszrejelenteselmuemasziratkod': [0, [Validators.required]],
      'keszrejelenteseoniratkod': [0, [Validators.required]],
      'keszrejelentesmvmiratkod': [0, [Validators.required]],
      'keszrejelenteseonelmuiratkod': [0, [Validators.required]],
      'keszrejelentesmvmemasziratkod': [0, [Validators.required]],
    });
  }

  ngOnInit() {
    try {
      this.cProjekt = JSON.parse(this.Dto.Projekt); // kivétel, ha hibás
      if (this.cProjekt === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cProjekt = new ProjektConf();
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['ajanlatiratkod'].setValue(this.cProjekt.AjanlatIratkod);
    this.form.controls['szerzodesiratkod'].setValue(this.cProjekt.SzerzodesIratkod);
    this.form.controls['szallitasiszerzodesiratkod'].setValue(this.cProjekt.SzallitasiSzerzodesIratkod);
    this.form.controls['feltetelesszerzodesiratkod'].setValue(this.cProjekt.FeltetelesSzerzodesIratkod);
    this.form.controls['oftszerzodesiratkod'].setValue(this.cProjekt.OFTSzerzodesIratkod);
    this.form.controls['hmketulajdonoshozzajarulasiratkod'].setValue(this.cProjekt.HMKEtulajdonoshozzajarulasIratkod);
    this.form.controls['munkalapiratkod'].setValue(this.cProjekt.MunkalapIratkod);
    this.form.controls['elegedettsegifelmeresiratkod'].setValue(this.cProjekt.ElegedettsegiFelmeresIratkod);
    this.form.controls['keszrejelenteselmuemasziratkod'].setValue(this.cProjekt.KeszrejelentesElmuemaszIratkod);
    this.form.controls['keszrejelenteseoniratkod'].setValue(this.cProjekt.KeszrejelentesEonIratkod);
    this.form.controls['keszrejelentesmvmiratkod'].setValue(this.cProjekt.KeszrejelentesMvmIratkod);
    this.form.controls['keszrejelenteseonelmuiratkod'].setValue(this.cProjekt.KeszrejelentesEonelmuIratkod);
    this.form.controls['keszrejelentesmvmemasziratkod'].setValue(this.cProjekt.KeszrejelentesMvmemaszIratkod);
  }
  updateconf() {
    this.cProjekt.AjanlatIratkod = this.form.value['ajanlatiratkod'];
    this.cProjekt.SzerzodesIratkod = this.form.value['szerzodesiratkod'];
    this.cProjekt.SzallitasiSzerzodesIratkod = this.form.value['szallitasiszerzodesiratkod'];
    this.cProjekt.FeltetelesSzerzodesIratkod = this.form.value['feltetelesszerzodesiratkod'];
    this.cProjekt.OFTSzerzodesIratkod = this.form.value['oftszerzodesiratkod'];
    this.cProjekt.HMKEtulajdonoshozzajarulasIratkod = this.form.value['hmketulajdonoshozzajarulasiratkod'];
    this.cProjekt.MunkalapIratkod = this.form.value['munkalapiratkod'];
    this.cProjekt.ElegedettsegiFelmeresIratkod = this.form.value['elegedettsegifelmeresiratkod'];
    this.cProjekt.KeszrejelentesElmuemaszIratkod = this.form.value['keszrejelenteselmuemasziratkod'];
    this.cProjekt.KeszrejelentesEonIratkod = this.form.value['keszrejelenteseoniratkod'];
    this.cProjekt.KeszrejelentesMvmIratkod = this.form.value['keszrejelentesmvmiratkod'];
    this.cProjekt.KeszrejelentesEonelmuIratkod = this.form.value['keszrejelenteseonelmuiratkod'];
    this.cProjekt.KeszrejelentesMvmemaszIratkod = this.form.value['keszrejelentesmvmemasziratkod'];
  }

  onSubmit() {
    this.updateconf();
    this.Dto.Projekt = JSON.stringify(this.cProjekt);

    this.eventOk.emit(this.Dto);
  }
  onCancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
