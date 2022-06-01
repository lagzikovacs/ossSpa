import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {UgyfelterService} from '../../../ext/ugyfelter/ugyfelter.service';
import {UgyfelService} from '../ugyfel.service';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {ErrorService} from '../../../common/errorbox/error.service';
import {UgyfelDto} from '../ugyfeldto';
import {deepCopy} from '../../../common/deepCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {EgyszeruKerdesUzenetComponent} from '../../../common/egyszeru-kerdes-uzenet/egyszeru-kerdes-uzenet.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ugyfelter-link',
  templateUrl: './ugyfelter-link.component.html',
})
export class UgyfelterLinkComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_ugyfelterlink', {read: ViewContainerRef}) vcr: ViewContainerRef;

  DtoEdited = new UgyfelDto();
  @Input() set DtoOriginal(value: UgyfelDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<UgyfelDto>();

  link = '';
  kikuldesikodidopontja: any;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  constructor(private _ugyfelservice: UgyfelService,
              private _ugyfelterservice: UgyfelterService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef) {
    super();
  }

  async ngOnInit() {
    if (this.DtoEdited.Kikuldesikodidopontja !== null) {
      this.spinner = true;
      try {
        const res = await this._ugyfelterservice.GetLink(this.DtoEdited);
        if (res.Error !== null) {
          throw res.Error;
        }

        this.link = environment.OSSRef + res.Result;
        this.kikuldesidopontja();
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.kikuldesikodidopontja = '';
      this.link = '';
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = 'Ügyféltér link';
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const ekuC = this.vcr.createComponent(EgyszeruKerdesUzenetComponent);

        ekuC.instance.cim = 'Új ügyféltér link';
        ekuC.instance.kerdes = this.link === '' ? 'Új ügyféltér linket készít. Biztos benne?' :
          'Ha új ügyféltér linket készít, a régi érvényessége megszűnik. Biztos benne?';
        ekuC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doUj();
        });
        ekuC.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
    }
  }

  kikuldesidopontja() {
    this.kikuldesikodidopontja = moment(this.DtoEdited.Kikuldesikodidopontja).format('YYYY-MM-DD HH:mm:ss');
  }

  async doUj() {
    this.spinner = true;
    try {
      const res = await this._ugyfelterservice.CreateNewLink(this.DtoEdited);
      if (res.Error !== null) {
        throw res.Error;
      }

      this.link = environment.OSSRef + res.Result;

      const res1 = await this._ugyfelservice.Get(this.DtoEdited.Ugyfelkod);
      if (res1.Error !== null) {
        throw res1.Error;
      }

      this.DtoEdited = res1.Result[0];
      this.kikuldesidopontja();
      this.spinner = false;

      this.doNav(0);
      this.eventOk.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this._ugyfelterservice.ClearLink(this.DtoEdited);
        if (res.Error !== null) {
          throw res.Error;
        }

        const res1 = await this._ugyfelservice.Get(this.DtoEdited.Ugyfelkod);
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.DtoEdited = res1.Result[0];
        this.link = '';
        this.kikuldesikodidopontja = '';
        this.spinner = false;

        this.doNav(0);
        this.eventOk.emit(res1.Result[0]);
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.doNav(0);
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
