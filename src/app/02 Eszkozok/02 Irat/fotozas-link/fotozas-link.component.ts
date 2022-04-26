import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IratService} from '../../../02 Eszkozok/02 Irat/irat/irat.service';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {IratDto} from '../../../02 Eszkozok/02 Irat/irat/iratdto';
import {EgyMode} from '../../../common/enums/egymode';
import {FotozasService} from '../../../ext/fotozas/fotozas.service';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {EgyszeruKerdesUzenetComponent} from "../../../common/egyszeru-kerdes-uzenet/egyszeru-kerdes-uzenet.component";
import {TetelTorlesComponent} from "../../../common/tetel-torles/tetel-torles.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fotozas-link',
  templateUrl: './fotozas-link.component.html'
})
export class FotozasLinkComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_fotozaslink', {read: ViewContainerRef}) vcr: ViewContainerRef;

  DtoEdited = new IratDto();
  @Input() set DtoOriginal(value: IratDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<IratDto>();

  link = '';
  kikuldesikodidopontja: any;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  constructor(private _iratservice: IratService,
              private _fotozasservice: FotozasService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef) {
    super();
  }

  async ngOnInit() {
    if (this.DtoEdited.Kikuldesikodidopontja !== null) {
      this.spinner = true;
      try {
        const res = await this._fotozasservice.GetLink(this.DtoEdited);
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

        teteltorlesC.instance.cim = 'Fotózás link';
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const ekuC = this.vcr.createComponent(EgyszeruKerdesUzenetComponent);

        ekuC.instance.cim = 'Új fotózás link';
        ekuC.instance.kerdes = this.link === '' ? 'Új fotózás linket készít. Biztos benne?' :
          'Ha új fotózás linket készít, a régi érvényessége megszűnik. Biztos benne?';
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
      const res = await this._fotozasservice.CreateNewLink(this.DtoEdited);
      if (res.Error !== null) {
        throw res.Error;
      }

      this.link = environment.OSSRef + res.Result;

      const res1 = await this._iratservice.Get(this.DtoEdited.Iratkod);
      if (res1.Error !== null) {
        throw res1.Error;
      }

      this.DtoEdited = res1.Result[0];
      this.kikuldesidopontja();
      this.spinner = false;

      this.doNav(0);
      this.eventSzerkeszteskesz.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this._fotozasservice.ClearLink(this.DtoEdited);
        if (res.Error !== null) {
          throw res.Error;
        }

        const res1 = await this._iratservice.Get(this.DtoEdited.Iratkod);
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this.DtoEdited = res1.Result[0];
        this.link = '';
        this.kikuldesikodidopontja = '';
        this.spinner = false;

        this.doNav(0);
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
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
