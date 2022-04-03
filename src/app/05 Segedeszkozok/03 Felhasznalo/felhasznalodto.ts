export class FelhasznaloDto {
  Felhasznalokod: number = 0;
  Azonosito: string = '';
  Nev: string = '';
  Telefon: string = '';
  Email: string = '';
  Statusz: string = '';
  Statuszkelte: Date = new Date();
  Csoporttag: boolean = false;
  Logonlog: boolean = false;
  Letrehozva: Date = new Date();
  Letrehozta: string = '';
  Modositva: Date = new Date();
  Modositotta: string = '';
}
