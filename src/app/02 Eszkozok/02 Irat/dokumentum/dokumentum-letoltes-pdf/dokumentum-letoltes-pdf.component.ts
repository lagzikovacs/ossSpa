import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {DokumentumDto} from '../dokumentumdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dokumentum-letoltes-pdf',
  templateUrl: './dokumentum-letoltes-pdf.component.html'})
export class DokumentumLetoltesPdfComponent implements OnInit, OnDestroy {
  @Input() item: DokumentumDto;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  kesz = false;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      await this.dokumentumservice.KimentesPDF(this.item);

      this.kesz = true;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
