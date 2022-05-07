import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekthez-rendeles',
  templateUrl: './projekthez-rendeles.component.html'
})
export class ProjekthezRendelesComponent {
  @Output() Szerkeszteskesz = new EventEmitter<number>();

  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      'projektkod': [0, [Validators.required]]
    });
  }

  onSubmit() {
    this.Szerkeszteskesz.emit(this.form.value['projektkod']);
  }

  onCancel() {
    this.Szerkeszteskesz.emit();
  }
}
