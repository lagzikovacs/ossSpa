export class JelszocsereParam {
  felhasznalokod: number;
  regijelszo: string;
  ujjelszo: string;
  utolsomodositas: Date;

  constructor(felhasznalokod: number, regijelszo: string, ujjelszo: string, utolsomodositas: Date) {
    this.felhasznalokod = felhasznalokod;
    this.regijelszo = regijelszo;
    this.ujjelszo = ujjelszo;
    this.utolsomodositas = utolsomodositas;
  }
}
