export class AngularmenuDto {
  Title: string = '';
  RouterLink: string = '';
  Enabled: boolean = false;

  Sub: AngularmenuDto[] = new Array<AngularmenuDto>();
}

