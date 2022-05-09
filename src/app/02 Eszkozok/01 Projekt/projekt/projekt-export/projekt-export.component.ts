import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {RiportService} from '../../../../04 Riportok/riport.service';
import {Szempont} from '../../../../common/enums/szempont';
import {SzMT} from '../../../../common/dtos/szmt';
import {ProjektService} from '../projekt.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {Riportciklus} from '../../../../04 Riportok/riportciklus';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-export',
  templateUrl: './projekt-export.component.html'
})
export class ProjektExportComponent implements OnDestroy {
  rc: Riportciklus;

  @Input() statuszszempont = -1;
  @Input() projektcsoport = '';
  @Output() eventBezar = new EventEmitter<void>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektservice: ProjektService;
  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService,
              riportservice: RiportService) {
    this.projektservice = projektservice,
    this.riportservice = riportservice;

    this.rc = new Riportciklus(_errorservice, riportservice, 'Projekt.xls');
    this.rc.eventCiklusutan.on(() => {
      this.eventBezar.emit();
    });
    this.rc.eventSpinnervege.on(() => {
      this.spinner = false;
    });
  }

  async onSubmit() {
    this.rc.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, this.statuszszempont),
      new SzMT(Szempont.Null, this.projektcsoport)
    ];

    this.spinner = true;
    try {
      const res = await this.riportservice.ProjektTaskStart(fi);
      if (res.Error != null) {
        throw res.Error;
      }

      this.rc.tasktoken = res.Result;
      this.rc.ciklus();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }


  onCancel() {
    this.eventBezar.emit();
  }

  ngOnDestroy() {
    this.rc.eventCiklusutan.off(() => {});

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}