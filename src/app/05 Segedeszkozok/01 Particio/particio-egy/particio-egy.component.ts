import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild,
  ViewContainerRef, EventEmitter
} from '@angular/core';
import {ParticioService} from '../particio.service';
import {ParticioDto} from '../particiodto';
import {deepCopy} from '../../../common/deepCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {ParticioKibocsatoComponent} from "../particio-kibocsato/particio-kibocsato.component";
import {ParticioBizonylatComponent} from "../particio-bizonylatnyomtatas/particio-bizonylatnyomtatas.component";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ParticioProjektiratmintaComponent} from "../particio-projektiratminta/particio-projektiratminta.component";
import {ParticioVolumeComponent} from "../particio-volume/particio-volume.component";
import {ParticioEmailComponent} from "../particio-email/particio-email.component";
import {ErrorService} from "../../../common/errorbox/error.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-particio-egy',
  templateUrl: './particio-egy.component.html'
})
export class ParticioEgyComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont', {read: ViewContainerRef}) vcr: ViewContainerRef;

  Ori = new ParticioDto();
  Dto = new ParticioDto();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  particioservice: ParticioService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              particioservice: ParticioService) {
    super();

    this.particioservice = particioservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.particioservice.Get();
      if (res.Error != null) {
        throw res.Error;
      }

      this.Ori = res.Result[0];
      this.Dto = deepCopy(this.Ori);

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doInit(ref: any) {
    ref.instance.Dto = this.Dto;
    ref.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.doOk(dto);
    });
    ref.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.doCancel();
    });
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case EgyMode.Szallito:
        this.doInit(this.vcr.createComponent(ParticioKibocsatoComponent));
        break;
      case EgyMode.Bizonylat:
        this.doInit(this.vcr.createComponent(ParticioBizonylatComponent));
        break;
      case EgyMode.Projekt:
        this.doInit(this.vcr.createComponent(ParticioProjektiratmintaComponent));
        break;
      case EgyMode.Volume:
        this.doInit(this.vcr.createComponent(ParticioVolumeComponent));
        break;
      case EgyMode.Email:
        this.doInit(this.vcr.createComponent(ParticioEmailComponent));
        break;
    }
  }

  async doOk(modDto: ParticioDto) {
    this.spinner = true;
    try {
      const res = await this.particioservice.Update(modDto);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.particioservice.Get();
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.Ori = res1.Result[0];
      this.Dto = deepCopy(this.Ori);

      this.spinner = false;
      this.doNav(0);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  
  doCancel() {
    this.Dto = deepCopy(this.Ori);
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
