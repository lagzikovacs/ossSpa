export class ParticioDto {
  PARTICIOKOD: number;
  MEGNEVEZES: string;

  SZALLITO_NEV: string;
  SZALLITO_IRANYITOSZAM: string;
  SZALLITO_HELYSEGNEV: string;
  SZALLITO_UTCAHAZSZAM: string;
  SZALLITO_BANKSZAMLA1: string;
  SZALLITO_BANKSZAMLA2: string;
  SZALLITO_ADOTORZSSZAM: string;
  SZALLITO_ADOAFAKOD: string;
  SZALLITO_ADOMEGYEKOD: string;

  NAV_URL: string;
  NAV_FELHASZNALOAZONOSITO: string;
  NAV_FELHASZNALOJELSZO: string;
  NAV_ALAIROKULCS: string;
  NAV_CSEREKULCS: string;

  SMTP_KLIENSTIPUS: string;
  SMTP_FELHASZNALOAZONOSITO: string;
  SMTP_FELHASZNALOJELSZO: string;
  SMTP_KULDONEVE: string;
  SMTP_KULDOEMAILCIME: string;
  SMTP_CUSTOMHOST: string;
  SMTP_CUSTOMPORT: number;
  SMTP_TLS: boolean;
  HIBAERTESITESEMAILCIMEK: string;

  BIZONYLAT_BIZONYLATKEP_IRATKOD: number;
  BIZONYLAT_EREDETIPELDANYOK_SZAMA: number;
  BIZONYLAT_MASOLATOK_SZAMA: number;

  PROJEKT_AJANLAT_IRATKOD: number;
  PROJEKT_ELEGEDETTSEGIFELMERES_IRATKOD: number;
  PROJEKT_KESZREJELENTES_DEMASZ_IRATKOD: number;
  PROJEKT_KESZREJELENTES_ELMUEMASZ_IRATKOD: number;
  PROJEKT_KESZREJELENTES_EON_IRATKOD: number;
  PROJEKT_MUNKALAP_IRATKOD: number;
  PROJEKT_SZALLITASISZERZODES_IRATKOD: number;
  PROJEKT_SZERZODES_IRATKOD: number;

  VOLUME_UJVOLUME_MAXMERET: number;
  VOLUME_UJVOLUME_ELERESIUT: string;

  LETREHOZVA: Date;
  LETREHOZTA: string;
  MODOSITVA: Date;
  MODOSITOTTA: string;
}
