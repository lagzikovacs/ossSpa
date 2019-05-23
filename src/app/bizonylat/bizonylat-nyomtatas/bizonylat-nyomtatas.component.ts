import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatnyomtatasService} from '../bizonylatnyomtatas.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {BizonylatNyomtatasTipus} from '../bizonylatnyomtatastipus';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../tools/b64toBlob';

@Component({
  selector: 'app-bizonylat-nyomtatas',
  templateUrl: './bizonylat-nyomtatas.component.html',
  styleUrls: ['./bizonylat-nyomtatas.component.css']
})
export class BizonylatNyomtatasComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  entries = ['Minta', 'Eredeti', 'Másolat'];
  entriest = [BizonylatNyomtatasTipus.Minta, BizonylatNyomtatasTipus.Eredeti, BizonylatNyomtatasTipus.Masolat];
  selectedi = 0;
  eppFrissit = false;
  megszakitani = false;
  tasktoken = '';
  szamlalo: any;

  constructor(private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _bizonylatservice: BizonylatService) {
  }

  change(i) {
    this.selectedi = i;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.megszakitani = false;

    const fi = [
      new SzMT(Szempont.BizonylatKod, this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, this.entriest[this.selectedi])
    ];

    this._bizonylatnyomtatasservice.TaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.ciklus();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  ciklus() {
    this._bizonylatnyomtatasservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Status === 'Cancelled') {
          throw new Error('Felhasználói megszakítás!');
        }
        if (res.Status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.Status === 'Queued' || res.Status === 'Running') {
          this.szamlalo = setInterval(() => { this.next(); }, 1000);
        }

        if (res.Status === 'Completed') {
          const blob = b64toBlob(res.Riport);
          FileSaver.saveAs(blob, 'Bizonylat.pdf');
          this.eppFrissit = false;
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  next() {
    clearInterval(this.szamlalo);

    if (this.megszakitani) {
      this._bizonylatnyomtatasservice.TaskCancel(this.tasktoken)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this.errormodal.show(err);
        });
    } else {
      this.ciklus();
    }
  }

  megsem() {
    this.megszakitani = true;
  }
  ngOnDestroy() {
    clearInterval(this.szamlalo);

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
