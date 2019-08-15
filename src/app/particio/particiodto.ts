export class ParticioDto {
  Particiokod: number;
  Megnevezes: string;

  SzallitoNev: string;
  SzallitoIranyitoszam: string;
  SzallitoHelysegnev: string;
  SzallitoUtcahazszam: string;
  SzallitoBankszamla1: string;
  SzallitoBankszamla2: string;
  SzallitoAdotorzsszam: string;
  SzallitoAdoafakod: string;
  SzallitoAdomegyekod: string;

  NavUrl: string;
  NavFelhasznaloazonosito: string;
  NavFelhasznalojelszo: string;
  NavAlairokulcs: string;
  NavCserekulcs: string;

  SmtpKlienstipus: string;
  SmtpFelhasznaloazonosito: string;
  SmtpFelhasznalojelszo: string;
  SmtpKuldoneve: string;
  SmtpKuldoemailcime: string;
  SmtpCustomhost: string;
  SmtpCustomport: number;
  SmtpTls: boolean;
  Hibaertesitesemailcimek: string;

  BizonylatBizonylatkepIratkod: number;
  BizonylatEredetipeldanyokSzama: number;
  BizonylatMasolatokSzama: number;

  ProjektAjanlatIratkod: number;
  ProjektElegedettsegifelmeresIratkod: number;
  ProjektKeszrejelentesDemaszIratkod: number;
  ProjektKeszrejelentesElmuemaszIratkod: number;
  ProjektKeszrejelentesEonIratkod: number;
  ProjektMunkalapIratkod: number;
  ProjektSzallitasiszerzodesIratkod: number;
  ProjektSzerzodesIratkod: number;
  ProjektFeltetelesszerzodesIratkod: number;

  VolumeUjvolumeMaxmeret: number;
  VolumeUjvolumeEleresiut: string;

  Szallito: string;
  Navonlineszamla: string;
  Bizonylat: string;
  Projekt: string;
  Volume: string;
  Emails: string;

  Letrehozva: Date;
  Letrehozta: string;
  Modositva: Date;
  Modositotta: string;
}
