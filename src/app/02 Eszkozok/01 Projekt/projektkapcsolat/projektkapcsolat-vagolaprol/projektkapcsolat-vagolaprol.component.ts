import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ProjektKapcsolatParam} from '../projektkapcsolatparam';
import {VagolapService} from '../../../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {NumberResult} from '../../../../common/dtos/numberresult';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-vagolaprol',
  templateUrl: './projektkapcsolat-vagolaprol.component.html'
})
export class ProjektkapcsolatVagolaprolComponent implements OnDestroy {
  @Input() Projektkod = -1;
  @Output() eventEgytetel = new EventEmitter<ProjektKapcsolatDto>();
  @Output() eventMegsem = new EventEmitter<void>();
  @Output() eventVege = new EventEmitter<void>();

  ci = 0;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  onSubmit() {
    if (this._vagolapservice.kijeloltekszama() === 0) {
      this._errorservice.Error = 'Nincs kijelölt tétel!';
      return;
    }

    this.ci = 0;
    this.ciklus();
  }

  async add(): Promise<ProjektKapcsolatDto> {
    let res: NumberResult;

    if (this._vagolapservice.Dto[this.ci].tipus === 0) {
      res = await this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParam(
        this.Projektkod, 0, this._vagolapservice.Dto[this.ci].iratkod,  null));
    } else {
      res = await this.projektkapcsolatservice.AddBizonylatToProjekt(new ProjektKapcsolatParam(
        this.Projektkod, this._vagolapservice.Dto[this.ci].bizonylatkod, 0, null));
    }
    if (res.Error != null) {
      throw res.Error;
    }

    const res1 = await this.projektkapcsolatservice.Get(res.Result);
    if (res1.Error != null) {
      throw res1.Error;
    }

    return res1.Result[0];
  }

  async ciklus() {
    this.spinner = true;
    if (this.ci < this._vagolapservice.Dto.length) {
      if (this._vagolapservice.Dto[this.ci].selected) {
        try {
          const pkDto = await this.add();

          this.eventEgytetel.emit(pkDto);

          ++this.ci;
          await this.ciklus();
        } catch (err) {
          this.spinner = false;
          this._errorservice.Error = err;
        }
      } else {
        ++this.ci;
        await this.ciklus();
      }
    } else {
      this.spinner = false;
      this.eventVege.emit();
    }
  }

  onCancel() {
    this.eventMegsem.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
