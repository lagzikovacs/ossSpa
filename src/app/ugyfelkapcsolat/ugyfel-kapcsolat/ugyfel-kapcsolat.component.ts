import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Szempont} from '../../enums/szempont';
import {environment} from '../../../environments/environment';
import {UgyfelkapcsolatParam} from '../ugyfelkapcsolatparam';
import {UgyfelkapcsolatDto} from '../ugyfelkapcsolatdto';
import {SzMT} from '../../dtos/szmt';
import {UgyfelkapcsolatService} from '../ugyfelkapcsolat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {UgyfelkapcsolatTablaComponent} from '../ugyfelkapcsolat-tabla/ugyfelkapcsolat-tabla.component';
import {EgyMode} from '../../enums/egymode';
import {propCopy} from '../../tools/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-ugyfel-kapcsolat',
  templateUrl: './ugyfel-kapcsolat.component.html',
  animations: [rowanimation]
})
export class UgyfelKapcsolatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('Fromtoszempont', {static: true}) FromtoszempontCombobox: ElementRef;
  @ViewChild('Szempont', {static: true}) SzempontCombobox: ElementRef;
  @ViewChild('Minta', {static: true}) MintaTextBox: ElementRef;
  @ViewChild('tabla', {static: true}) tabla: UgyfelkapcsolatTablaComponent;

  @Input() Ugyfelkod = -1;

  fromtoszempont = 0;
  fromtoszurok = ['Ettől az ügyféltől', 'Eddig az ügyfélig'];

  szurok = ['Név', 'Cég', 'Beosztás', 'Helységnév', 'Telefon', 'Email', 'Egyéb link', 'Ajánlotta', 'Id'];
  szempont = 0;
  minta = '';
  up = new UgyfelkapcsolatParam(0, environment.lapmeret);
  szempontok = [
    Szempont.Nev, Szempont.Ceg, Szempont.Beosztas, Szempont.Telepules, Szempont.UgyfelTelefonszam, Szempont.UgyfelEmail,
    Szempont.Egyeblink, Szempont.Ajanlo, Szempont.Kod
  ];
  elsokereses = true;
  osszesrekord = 0;
  jog = false;
  zoom = false;
  eppFrissit = false;

  Dto = new Array<UgyfelkapcsolatDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  ugyfelkapcsolatservice: UgyfelkapcsolatService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              ugyfelkapcsolatservice: UgyfelkapcsolatService  ) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);

    this.ugyfelkapcsolatservice = ugyfelkapcsolatservice;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.FromtoszempontCombobox.nativeElement.addEventListener('change', (event) => {
      this.fromtoszempont = event.target.value;
    });
    this.SzempontCombobox.nativeElement.addEventListener('change', (event) => {
      this.szempont = event.target.value;
    });
    this.MintaTextBox.nativeElement.addEventListener('keyup', () => {
      this.minta = this.MintaTextBox.nativeElement.value;
    });
  }

  onKereses() {
    this.Dto = new Array<UgyfelkapcsolatDto>();
    this.DtoSelectedIndex = -1;
    this.osszesrekord = 0;

    this.elsokereses = true;
    this.up.rekordtol = 0;
    this.up.ugyfelkod = this.Ugyfelkod
    this.up.fi = new Array<SzMT>();
    this.up.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));
    this.up.FromTo = this.fromtoszempont;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.ugyfelkapcsolatservice.Select(this.up)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.Dto = buf;
        }
        this.osszesrekord = res.OsszesRekord;

        this.up.rekordtol += this.up.lapmeret;
        this.eppFrissit = false;

        // if (this.ugyfelservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: UgyfelkapcsolatDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: UgyfelkapcsolatDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.ugyfelkapcsolatservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
