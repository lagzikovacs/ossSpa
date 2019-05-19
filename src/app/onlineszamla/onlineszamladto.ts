export class OnlineszamlaDto {
  Navfeltolteskod: number;
  Idopont: Date;
  Bizonylatkod: number;

  Statuszneve: string;
  Tranzakcioazonosito: string;
  Hiba: string;

  // kalkulált mezők
  Bizonylatszam: string;
  Ugyfelnev: string;
  Bizonylatkelte: Date;
}
