import {Component, Input, OnDestroy} from '@angular/core';
import {BizonylatnyomtatasService} from '../bizonylatnyomtatas.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {BizonylatNyomtatasTipus} from '../bizonylatnyomtatastipus';
import {ErrorService} from '../../tools/errorbox/error.service';
import {Bizonylatnyomtatasciklus} from '../bizonylatnyomtatasciklus';
import {BizonylatService} from '../../bizonylat/bizonylat.service';

@Component({
  selector: 'app-bizonylat-nyomtatas',
  templateUrl: './bizonylat-nyomtatas.component.html'
})
export class BizonylatNyomtatasComponent implements OnDestroy {
  bc: Bizonylatnyomtatasciklus;

  @Input() Bizonylatkod = -1;

  entries = ['Minta', 'Eredeti', 'Másolat'];
  entriest = [BizonylatNyomtatasTipus.Minta, BizonylatNyomtatasTipus.Eredeti, BizonylatNyomtatasTipus.Masolat];
  selectedi = 0;
  eppFrissit = false;

  constructor(private _bizonylatservice: BizonylatService,
              private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _errorservice: ErrorService) {

    this.bc = new Bizonylatnyomtatasciklus(_errorservice, _bizonylatnyomtatasservice);
    this.bc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
    });
  }

  change(i) {
    this.selectedi = i;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.bc.megszakitani = false;
    this.bc.fajlnev = '';

    const fi = [
      new SzMT(Szempont.BizonylatKod, this.Bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, this.entriest[this.selectedi])
    ];

    this._bizonylatservice.Get(this.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bc.fajlnev = res.Result[0].Bizonylatszam + ' ';
        return this._bizonylatservice.BizonylatLeiro(res.Result[0].Bizonylattipuskod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.bc.fajlnev += res1.Result.BizonylatNev + '.pdf';
        return this._bizonylatnyomtatasservice.TaskStart(fi);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bc.tasktoken = res2.Result;
        this.bc.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.bc.megszakitani = true;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
