import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {HelysegService} from '../../07 Helyseg/helyseg.service';
import {UgyfelSzerkesztesMode} from '../ugyfelszerkesztesmode';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {HelysegDto} from '../../07 Helyseg/helysegdto';
import {UgyfelDto} from '../ugyfeldto';
import {TevekenysegDto} from '../../08 Tevekenyseg/tevekenysegdto';
import {TevekenysegService} from '../../08 Tevekenyseg/tevekenyseg.service';
import {TevekenysegZoomParam} from '../../08 Tevekenyseg/tevekenysegzoomparam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelysegZoomParam} from "../../07 Helyseg/helysegzoomparam";
import {HelysegListComponent} from "../../07 Helyseg/helyseg-list/helyseg-list.component";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {TevekenysegListComponent} from "../../08 Tevekenyseg/tevekenyseg-list/tevekenyseg-list.component";
import {ModalService} from "../../../common/modal/modal.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfel-szerkesztes',
  templateUrl: './ugyfel-szerkesztes.component.html'
})
export class UgyfelSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_ugyfelszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname: string = 'modal_ugyfelszerk';

  @Input() uj = false;
  DtoEdited = new UgyfelDto();
  @Input() set DtoOriginal(value: UgyfelDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  ugyfelservice: UgyfelService;

  constructor(private _helysegservice: HelysegService,
              private _tevekenysegservice: TevekenysegService,
              private _errorservice: ErrorService,
              private _modalservice: ModalService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              ugyfelservice: UgyfelService) {
    super();

    this.ugyfelservice = ugyfelservice;

    this.form = this._fb.group({
      'nev': ['', [Validators.required, Validators.maxLength(200)]],
      'iranyitoszam': ['', [Validators.required, Validators.maxLength(20)]],
      'helysegnev': ['', [Validators.required, Validators.maxLength(100)]],
      'kozterulet': ['', [Validators.required, Validators.maxLength(100)]],
      'kozterulettipus': ['', [Validators.required, Validators.maxLength(20)]],
      'hazszam': ['', [Validators.required, Validators.maxLength(10)]],
      'telefon': ['', [Validators.required, Validators.maxLength(20)]],
      'email': ['', [Validators.required, Validators.maxLength(50)]],
      'adoszam': ['', [Validators.maxLength(20)]],
      'euadoszam': ['', [Validators.maxLength(20)]],
      'ceg': ['', [Validators.maxLength(200)]],
      'beosztas': ['', [Validators.maxLength(200)]],
      'tevekenyseg': ['', [Validators.required, Validators.maxLength(100)]],
      'egyeblink': ['', [Validators.maxLength(200)]],
      'ajanlotta': ['', [Validators.maxLength(200)]],
      'megjegyzes': ['', [Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      this.ugyfelservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.updateform();
          this.spinner = false;
        })
        .catch(err => {
          this.spinner = false;
          this._errorservice.Error = err;
        });
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['nev'].setValue(this.DtoEdited.Nev);
    this.form.controls['iranyitoszam'].setValue(this.DtoEdited.Iranyitoszam);
    this.form.controls['helysegnev'].setValue(this.DtoEdited.Helysegnev);
    this.form.controls['kozterulet'].setValue(this.DtoEdited.Kozterulet);
    this.form.controls['kozterulettipus'].setValue(this.DtoEdited.Kozterulettipus);
    this.form.controls['hazszam'].setValue(this.DtoEdited.Hazszam);
    this.form.controls['telefon'].setValue(this.DtoEdited.Telefon);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['adoszam'].setValue(this.DtoEdited.Adoszam);
    this.form.controls['euadoszam'].setValue(this.DtoEdited.Euadoszam);
    this.form.controls['ceg'].setValue(this.DtoEdited.Ceg);
    this.form.controls['beosztas'].setValue(this.DtoEdited.Beosztas);
    this.form.controls['tevekenyseg'].setValue(this.DtoEdited.Tevekenyseg);
    this.form.controls['egyeblink'].setValue(this.DtoEdited.Egyeblink);
    this.form.controls['ajanlotta'].setValue(this.DtoEdited.Ajanlotta);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Iranyitoszam = this.form.value['iranyitoszam'];
    this.DtoEdited.Helysegnev = this.form.value['helysegnev'];
    this.DtoEdited.Kozterulet = this.form.value['kozterulet'];
    this.DtoEdited.Kozterulettipus = this.form.value['kozterulettipus'];
    this.DtoEdited.Hazszam = this.form.value['hazszam'];
    this.DtoEdited.Telefon = this.form.value['telefon'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Adoszam = this.form.value['adoszam'];
    this.DtoEdited.Euadoszam = this.form.value['euadoszam'];
    this.DtoEdited.Ceg = this.form.value['ceg'];
    this.DtoEdited.Beosztas = this.form.value['beosztas'];
    this.DtoEdited.Tevekenyseg = this.form.value['tevekenyseg'];
    this.DtoEdited.Egyeblink = this.form.value['egyeblink'];
    this.DtoEdited.Ajanlotta = this.form.value['ajanlotta'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    this.spinner = true;
    this.updatedto();

    this._helysegservice.ZoomCheck(new HelysegZoomParam(this.DtoEdited.Helysegkod || 0,
      this.DtoEdited.Helysegnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this._tevekenysegservice.ZoomCheck(new TevekenysegZoomParam(this.DtoEdited.Tevekenysegkod || 0,
          this.DtoEdited.Tevekenyseg || ''));
      })
      .then(res0 => {
        if (res0.Error !== null) {
          throw res0.Error;
        }

        if (this.uj) {
          return this.ugyfelservice.Add(this.DtoEdited);
        } else {
          return this.ugyfelservice.Update(this.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        this.spinner = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
      })
      .catch(err => {
        this.spinner = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  HelysegZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(HelysegListComponent);
    C.instance.maszk = this.DtoEdited.Helysegnev || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Helysegkod = dto.Helysegkod;
      this.DtoEdited.Helysegnev = dto.Helysegnev;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  TevekenysegZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(TevekenysegListComponent);
    C.instance.maszk = this.DtoEdited.Tevekenyseg || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Tevekenysegkod = dto.Tevekenysegkod;
      this.DtoEdited.Tevekenyseg = dto.Tevekenyseg1;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
