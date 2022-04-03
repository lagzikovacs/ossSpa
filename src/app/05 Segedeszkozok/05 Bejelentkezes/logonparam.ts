export class LogonParam {
  Azonosito: string;
  Jelszo: string;

  Ip: string = '';
  Host: string = '';
  OsUser: string = '';

  constructor(Azonosito: string, Jelszo: string) {
    this.Azonosito = Azonosito;
    this.Jelszo = Jelszo;
  }
}
