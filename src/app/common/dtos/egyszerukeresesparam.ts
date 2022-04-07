export class EgyszeruKeresesParam {
    szempont: number;
    minta: string;
    rekordtol: number;
    lapmeret: number;

    constructor (szempont: number, minta: string, lapmeret: number) {
        this.szempont = szempont;
        this.minta = minta;
        this.rekordtol = 0;
        this.lapmeret = lapmeret;
    }
}
