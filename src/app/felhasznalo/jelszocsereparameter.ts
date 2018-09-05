export class JelszocsereParameter {
  felhasznalokod: number;
  regijelszo: string;
  ujjelszo: string;
  utolsomodositas: string;

  constructor(felhasznalokod: number, regijelszo: string, ujjelszo: string, utolsomodositas: string) {
    this.felhasznalokod = felhasznalokod;
    this.regijelszo = regijelszo;
    this.ujjelszo = ujjelszo;
    this.utolsomodositas = utolsomodositas;
  }
}
