export class NavfeltoltesDto {
  NAVFELTOLTESKOD: number;
  IDOPONT: Date;
  BIZONYLATKOD: number;
  STATUSZ: number;

  Statuszneve: string;
  TOKEN: string;
  TRANZAKCIOAZONOSITO: string;
  HIBA: string;
  KOVETKEZOTEENDOIDOPONT: Date;
  TOKENKERESSZAMLALO: number;
  FELTOLTESSZAMLALO: number;
  FELTOLTESELLENORZESSZAMLALO: number;
  EMAILSZAMLALO: number;
  DateTime; ELINTEZVE: Date;
  ELINTEZTE: string;

  // kalkulált mezők
  BIZONYLATSZAM: string;
  UGYFELNEV: string;
  BIZONYLATKELTE: Date;

  LETREHOZVA: Date;
  LETREHOZTA: string;
  MODOSITVA: Date;
  MODOSITOTTA: string;
}
