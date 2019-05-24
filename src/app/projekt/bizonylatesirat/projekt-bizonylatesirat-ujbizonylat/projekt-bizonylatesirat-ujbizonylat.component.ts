import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../logon/logon.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {BizonylatTipus} from '../../../bizonylat/bizonylattipus';
import {BizonylatService} from '../../../bizonylat/bizonylat.service';
import {UgyfelService} from '../../../ugyfel/ugyfel.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {UgyfelDto} from '../../../ugyfel/ugyfeldto';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujbizonylat',
  templateUrl: './projekt-bizonylatesirat-ujbizonylat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujbizonylat.component.css']
})
export class ProjektBizonylatesiratUjbizonylatComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;
  entries = [
    ['Díjbekérő', BizonylatTipus.DijBekero],
    ['Előlegszámla', BizonylatTipus.ElolegSzamla],
    ['Megrendelés', BizonylatTipus.Megrendeles],
    ['Szállító', BizonylatTipus.Szallito],
    ['Számla', BizonylatTipus.Szamla],
    ['Bejövő számla', BizonylatTipus.BejovoSzamla]
  ];
  entryindex = 4;

  constructor(private _logonservice: LogonService,
              private _bizonylatservice: BizonylatService,
              private _ugyfelservice: UgyfelService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  change(i) {
    this.entryindex = i;
  }
  onSubmit() {
    let bizonylatDto: any;
    let ugyfelDto: UgyfelDto;

    this.eppFrissit = true;
    this._bizonylatservice.CreateNewComplex()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        bizonylatDto = res.Result[0].Dto;
        return this._ugyfelservice.Get(this.projektkapcsolatservice.UgyfelKod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        ugyfelDto = res1.Result[0];

        bizonylatDto.Bizonylattipuskod = this.entries[this.entryindex][1];
        bizonylatDto.Ugyfelkod = ugyfelDto.Ugyfelkod;
        bizonylatDto.Ugyfelnev = ugyfelDto.Nev;
        bizonylatDto.Ugyfeladoszam = ugyfelDto.Adoszam;

        bizonylatDto.Ugyfeliranyitoszam = ugyfelDto.Iranyitoszam;
        bizonylatDto.Ugyfelhelysegkod = ugyfelDto.Helysegkod;
        bizonylatDto.Ugyfelhelysegnev = ugyfelDto.Helysegnev;
        bizonylatDto.Ugyfelkozterulet = ugyfelDto.Kozterulet;
        bizonylatDto.Ugyfelkozterulettipus = ugyfelDto.Kozterulettipus;
        bizonylatDto.Ugyfelhazszam = ugyfelDto.Hazszam;

        return this.projektkapcsolatservice.UjBizonylatToProjekt(new ProjektKapcsolatParameter(
          this.projektkapcsolatservice.ProjektKod,
          0,
          0,
          bizonylatDto
        ));
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this.projektkapcsolatservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        this.projektkapcsolatservice.Dto.unshift(res3.Result[0]);
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
