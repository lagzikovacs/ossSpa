import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {RiportService} from '../../riport/riport.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../projekt.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {Riportciklus} from '../../riport/riportciklus';

@Component({
  selector: 'app-projekt-export',
  templateUrl: './projekt-export.component.html'
})
export class ProjektExportComponent implements OnDestroy {
  rc: Riportciklus;

  @Input() statuszszempont = -1;
  @Input() projektcsoport = '';
  @Output() eventBezar = new EventEmitter<void>();

  projektservice: ProjektService;
  spinnerservice: SpinnerService;
  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              projektservice: ProjektService,
              riportservice: RiportService) {
    this.projektservice = projektservice,
    this.spinnerservice = spinnerservice;
    this.riportservice = riportservice;

    this.rc = new Riportciklus(_errorservice, spinnerservice, riportservice, 'Projekt.xls');
    this.rc.eventCiklusutan.on(() => {
      this.eventBezar.emit();
    });
  }

  onSubmit() {
    this.spinnerservice.eppFrissit = true;
    this.rc.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, this.statuszszempont.toString()),
      new SzMT(Szempont.Null, this.projektcsoport)
    ];

    this.riportservice.ProjektTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.rc.tasktoken = res.Result;
        this.rc.ciklus();
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
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
