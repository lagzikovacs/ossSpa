export class BizonylatDto {
  Bizonylatkod: number;
  Bizonylattipuskod: number;
  Bizonylatszam: string;
  Szallitonev: string;
  Szallitoiranyitoszam: string;
  Szallitohelysegnev: string;
  Szallitoutcahazszam: string;
  Szallitobankszamla1: string;
  Szallitobankszamla2: string;
  Szallitoadotorzsszam: string;
  Szallitoadoafakod: string;
  Szallitoadomegyekod: string;
  Ugyfelkod: number;
  Ugyfelnev: string;
  Ugyfeliranyitoszam: string;
  Ugyfelhelysegkod: number;
  Ugyfelhelysegnev: string;
  Ugyfelkozterulet: string;
  Ugyfelkozterulettipus: string;
  Ugyfelhazszam: string;
  Ugyfelcim: string;
  Ugyfeladoszam: string;
  Bizonylatkelte: any;
  Teljesiteskelte: any;
  Fizetesimodkod: number;
  Fizetesimod: string;
  Fizetesihatarido: any;
  Szallitasihatarido: any;
  Kifizetesrendben: boolean;
  Kiszallitva: boolean;
  Megjegyzesfej: string;
  Netto: number;
  Afa: number;
  Brutto: number;
  Termekdij: number;
  Penznemkod: number;
  Penznem: string;
  Arfolyam: number;
  Nyomtatottpeldanyokszama: number;
  Ezstornozo: boolean;
  Ezstornozott: boolean;
  Stornozobizonylatkod: number;
  Stornozottbizonylatkod: number;
  Letrehozva: any;
  Letrehozta: string;
  Modositva: any;
  Modositotta: string;

  constructor() {
    this.Bizonylatszam = '';
  }
}
