import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './tools/menu/menu.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import { FooldalComponent } from './fooldal/fooldal.component';
import { MenunodeComponent } from './tools/menu/menunode/menunode.component';
import { MenuitemComponent } from './tools/menu/menuitem/menuitem.component';
import {LogonService} from './services/logon.service';
import {MenuService} from './services/menu.service';
import {HttpClientModule} from '@angular/common/http';
import { BejelentkezesComponent } from './segedeszkoz/logon/bejelentkezes/bejelentkezes.component';
import { ErrormodalComponent } from './tools/errormodal/errormodal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FelhasznaloComponent } from './torzs/primitiv/felhasznalo/felhasznalo.component';
import {FelhasznaloService} from './services/felhasznalo.service';
import {LoginGuard} from './guards/login.guard';
import {RoleGuard} from './guards/role.guard';
import { SzerepkorvalasztasComponent } from './segedeszkoz/logon/szerepkorvalasztas/szerepkorvalasztas.component';
import { JelszocsereComponent } from './segedeszkoz/logon/jelszocsere/jelszocsere.component';
import { ToolbarComponent } from './tools/toolbar/toolbar.component';
import { ToolbarfooterComponent } from './tools/toolbar/toolbarfooter/toolbarfooter.component';
import {VerzioService} from './services/verzio.service';
import {SessionService} from './services/session.service';
import {DateHunPipe} from './pipes/datehun.pipe';
import {DatetimeHunPipe} from './pipes/datetimehun.pipe';
import { FelhasznaloEgyComponent } from './torzs/primitiv/felhasznalo/felhasznalo-egy/felhasznalo-egy.component';
import { FelhasznaloTorlesComponent } from './torzs/primitiv/felhasznalo/felhasznalo-egy/felhasznalo-torles/felhasznalo-torles.component';
import { FelhasznaloSzerkesztesComponent } from './torzs/primitiv/felhasznalo/felhasznalo-egy/felhasznalo-szerkesztes/felhasznalo-szerkesztes.component';
import { FelhasznaloJelszoComponent } from './torzs/primitiv/felhasznalo/felhasznalo-egy/felhasznalo-jelszo/felhasznalo-jelszo.component';
import { BlankComponent } from './tools/blank/blank.component';
import { ProjektComponent } from './eszkoz/projekt/projekt.component';
import { ProjektegyComponent } from './eszkoz/projekt/projektegy/projektegy.component';
import { ProjektSzerkesztesComponent } from './eszkoz/projekt/projektegy/projekt-szerkesztes/projekt-szerkesztes.component';
import { ProjektTorlesComponent } from './eszkoz/projekt/projektegy/projekt-torles/projekt-torles.component';
import {ProjektToolbarComponent} from './eszkoz/projekt/projekttoolbar/projekttoolbar.component';
import {ProjektService} from './services/projekt.service';
import { ProjektMuszakiallapotComponent } from './eszkoz/projekt/projektegy/projekt-muszakiallapot/projekt-muszakiallapot.component';
import { ProjektInverterComponent } from './eszkoz/projekt/projektegy/projekt-inverter/projekt-inverter.component';
import { ProjektNapelemComponent } from './eszkoz/projekt/projektegy/projekt-napelem/projekt-napelem.component';
import { ProjektExportComponent } from './eszkoz/projekt/projektegy/projekt-export/projekt-export.component';
import { ProjektIratmintaComponent } from './eszkoz/projekt/projektegy/projekt-iratminta/projekt-iratminta.component';
import { ProjektBizonylatesiratComponent } from './eszkoz/projekt/projektegy/projekt-bizonylatesirat/projekt-bizonylatesirat.component';
import { ProjektSzamlazasirendComponent } from './eszkoz/projekt/projektegy/projekt-szamlazasirend/projekt-szamlazasirend.component';
import { ProjektTeendoComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendo.component';
import { IratComponent } from './eszkoz/irat/irat.component';
import { IrategyComponent } from './eszkoz/irat/irategy/irategy.component';
import {IratToolbarComponent} from './eszkoz/irat/irattolbar/irattoolbar.component';
import { IratDokumentumComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentum.component';
import {IratService} from './services/irat.service';
import {DokumentumService} from './services/dokumentum.service';
import { IratDokumentumegyComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentumegy/irat-dokumentumegy.component';
import { IratSzerkesztesComponent } from './eszkoz/irat/irategy/irat-szerkesztes/irat-szerkesztes.component';
import { IratTorlesComponent } from './eszkoz/irat/irategy/irat-torles/irat-torles.component';
import { DokumentumFeltoltesComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentumegy/dokumentum-feltoltes/dokumentum-feltoltes.component';
import { DokumentumLetoltesComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentumegy/dokumentum-letoltes/dokumentum-letoltes.component';
import { DokumentumTorlesComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentumegy/dokumentum-torles/dokumentum-torles.component';
import { IrattipusComponent } from './torzs/primitiv/irattipus/irattipus.component';
import { IrattipusegyComponent } from './torzs/primitiv/irattipus/irattipusegy/irattipusegy.component';
import { IrattipusSzerkesztesComponent } from './torzs/primitiv/irattipus/irattipusegy/irattipus-szerkesztes/irattipus-szerkesztes.component';
import { IrattipusTorlesComponent } from './torzs/primitiv/irattipus/irattipusegy/irattipus-torles/irattipus-torles.component';
import { HelysegComponent } from './torzs/primitiv/helyseg/helyseg.component';
import { HelysegegyComponent } from './torzs/primitiv/helyseg/helysegegy/helysegegy.component';
import { HelysegSzerkesztesComponent } from './torzs/primitiv/helyseg/helysegegy/helyseg-szerkesztes/helyseg-szerkesztes.component';
import { HelysegTorlesComponent } from './torzs/primitiv/helyseg/helysegegy/helyseg-torles/helyseg-torles.component';
import { UgyfelComponent } from './torzs/ugyfel/ugyfel.component';
import { UgyfelegyComponent } from './torzs/ugyfel/ugyfelegy/ugyfelegy.component';
import { UgyfelTorlesComponent } from './torzs/ugyfel/ugyfelegy/ugyfel-torles/ugyfel-torles.component';
import { UgyfelSzerkesztesComponent } from './torzs/ugyfel/ugyfelegy/ugyfel-szerkesztes/ugyfel-szerkesztes.component';
import { CsoportComponent } from './segedeszkoz/csoport/csoport.component';
import { CsoportegyComponent } from './segedeszkoz/csoport/csoportegy/csoportegy.component';
import { CsoportSzerkesztesComponent } from './segedeszkoz/csoport/csoportegy/csoport-szerkesztes/csoport-szerkesztes.component';
import { CsoportTorlesComponent } from './segedeszkoz/csoport/csoportegy/csoport-torles/csoport-torles.component';
import { CsoportFelhasznaloComponent } from './segedeszkoz/csoport/csoportegy/csoport-felhasznalo/csoport-felhasznalo.component';
import { CsoportJogComponent } from './segedeszkoz/csoport/csoportegy/csoport-jog/csoport-jog.component';
import { ParticioComponent } from './segedeszkoz/particio/particio.component';
import { ParticioegyComponent } from './segedeszkoz/particio/particioegy/particioegy.component';
import { ParticioSzerkesztesComponent } from './segedeszkoz/particio/particioegy/particio-szerkesztes/particio-szerkesztes.component';
import { ParticioTorlesComponent } from './segedeszkoz/particio/particioegy/particio-torles/particio-torles.component';
import { VolumeComponent } from './segedeszkoz/volume/volume.component';
import { VolumeegyComponent } from './segedeszkoz/volume/volumeegy/volumeegy.component';
import { VolumeTesztComponent } from './segedeszkoz/volume/volumeegy/volume-teszt/volume-teszt.component';
import { FeliratkozasComponent } from './eszkoz/feliratkozas/feliratkozas.component';
import { FeliratkozasegyComponent } from './eszkoz/feliratkozas/feliratkozasegy/feliratkozasegy.component';
import { FeliratkozasProjektComponent } from './eszkoz/feliratkozas/feliratkozasegy/feliratkozas-projekt/feliratkozas-projekt.component';
import { ProjektTablaComponent } from './eszkoz/projekt/projekt-tabla/projekt-tabla.component';
import { RiportComponent } from './riport/riport.component';
import { KimenoszamlaComponent } from './riport/kimenoszamla/kimenoszamla.component';
import { BejovoszamlaComponent } from './riport/bejovoszamla/bejovoszamla.component';
import { KovetelesComponent } from './riport/koveteles/koveteles.component';
import { TartozasComponent } from './riport/tartozas/tartozas.component';
import { BeszerzesComponent } from './riport/beszerzes/beszerzes.component';
import { KeszletComponent } from './riport/keszlet/keszlet.component';
import { NgmComponent } from './riport/ngm/ngm.component';
import { ParticioSzallitoComponent } from './segedeszkoz/particio/particioegy/particio-szallito/particio-szallito.component';
import { ParticioNavComponent } from './segedeszkoz/particio/particioegy/particio-nav/particio-nav.component';
import { ParticioSmtpComponent } from './segedeszkoz/particio/particioegy/particio-smtp/particio-smtp.component';
import { ParticioBizonylatComponent } from './segedeszkoz/particio/particioegy/particio-bizonylat/particio-bizonylat.component';
import { ParticioProjektComponent } from './segedeszkoz/particio/particioegy/particio-projekt/particio-projekt.component';
import { ParticioVolumeComponent } from './segedeszkoz/particio/particioegy/particio-volume/particio-volume.component';

const routes: Routes = [
  {path: 'fooldal', component: FooldalComponent},

  {path: 'irattipus', component: IrattipusComponent, canActivate: [RoleGuard]},
  {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: IrattipusTorlesComponent},
    {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
  {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: HelysegTorlesComponent},
    {path: 'szerkesztes', component: HelysegSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'ugyfel', component: UgyfelComponent, canActivate: [RoleGuard]},
  {path: 'ugyfeluj', component: UgyfelSzerkesztesComponent, canActivate: [RoleGuard], children: [
    {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
    {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
      {path: 'torles', component: HelysegTorlesComponent},
      {path: 'szerkesztes', component: HelysegSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'ugyfelegy', component: UgyfelegyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: UgyfelTorlesComponent},
    {path: 'szerkesztes', component: UgyfelSzerkesztesComponent, children: [
      {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
      {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
        {path: 'torles', component: HelysegTorlesComponent},
        {path: 'szerkesztes', component: HelysegSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'projekt', component: ProjektComponent, canActivate: [RoleGuard]},
  {path: 'projektuj', component: ProjektSzerkesztesComponent},
  {path: 'projektegy', component: ProjektegyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: ProjektTorlesComponent},
    {path: 'szerkesztes', component: ProjektSzerkesztesComponent},
    {path: 'muszakiallapot', component: ProjektMuszakiallapotComponent},
    {path: 'inverter', component: ProjektInverterComponent},
    {path: 'napelem', component: ProjektNapelemComponent},
    {path: 'iratminta', component: ProjektIratmintaComponent},
    {path: 'export', component: ProjektExportComponent},
    {path: 'bizonylatesirat', component: ProjektBizonylatesiratComponent},
    {path: 'szamlazasirend', component: ProjektSzamlazasirendComponent},
    {path: 'teendo', component: ProjektTeendoComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'irat', component: IratComponent, canActivate: [RoleGuard]},
  {path: 'iratuj', component: IratSzerkesztesComponent, canActivate: [RoleGuard], children: [
    {path: 'irattipus', component: IrattipusComponent, canActivate: [RoleGuard]},
    {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
      {path: 'torles', component: IrattipusTorlesComponent},
      {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
  ]},
  {path: 'irategy', component: IrategyComponent, canActivate: [RoleGuard], children: [
    {path: 'szerkesztes', component: IratSzerkesztesComponent, children: [
      {path: 'irattipus', component: IrattipusComponent},
      {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
        {path: 'torles', component: IrattipusTorlesComponent},
        {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
    ]},
    {path: 'torles', component: IratTorlesComponent},
    {path: 'dokumentum', component: IratDokumentumComponent},
    {path: 'dokumentumfeltoltes', component: DokumentumFeltoltesComponent},
    {path: 'blank', component: BlankComponent},
    {path: 'dokumentumegy', component: IratDokumentumegyComponent, children: [
      {path: 'torles', component: DokumentumTorlesComponent},
      {path: 'letoltes', component: DokumentumLetoltesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
  ]},

  {path: 'feliratkozas', component: FeliratkozasComponent, canActivate: [RoleGuard]},
  {path: 'feliratkozasegy', component: FeliratkozasegyComponent, canActivate: [RoleGuard], children: [
    {path: 'projekt', component: FeliratkozasProjektComponent}
  ]},

  {path: 'riport', component: RiportComponent, canActivate: [RoleGuard], children: [
    {path: 'kimenoszamla', component: KimenoszamlaComponent},
    {path: 'bejovoszamla', component: BejovoszamlaComponent},
    {path: 'koveteles', component: KovetelesComponent},
    {path: 'tartozas', component: TartozasComponent},
    {path: 'beszerzes', component: BeszerzesComponent},
    {path: 'keszlet', component: KeszletComponent},
    {path: 'ngm', component: NgmComponent}
  ]},

  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'szerepkorvalasztas', component: SzerepkorvalasztasComponent, canActivate: [LoginGuard]},
  {path: 'jelszocsere', component: JelszocsereComponent, canActivate: [LoginGuard]},

  {path: 'particio', component: ParticioComponent, canActivate: [RoleGuard]},
  {path: 'particiouj', component: ParticioSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'particioegy', component: ParticioegyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: ParticioTorlesComponent},
    {path: 'szerkesztes', component: ParticioSzerkesztesComponent},
    {path: 'szallito', component: ParticioSzallitoComponent},
    {path: 'nav', component: ParticioNavComponent},
    {path: 'smtp', component: ParticioSmtpComponent},
    {path: 'bizonylat', component: ParticioBizonylatComponent},
    {path: 'projekt', component: ParticioProjektComponent},
    {path: 'volume', component: ParticioVolumeComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'volume', component: VolumeComponent, canActivate: [RoleGuard]},
  {path: 'volumeegy', component: VolumeegyComponent, canActivate: [RoleGuard], children: [
    {path: 'teszt', component: VolumeTesztComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'felhasznalo', component: FelhasznaloComponent, canActivate: [RoleGuard]},
  {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: FelhasznaloTorlesComponent},
    {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
    {path: 'jelszo', component: FelhasznaloJelszoComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'csoport', component: CsoportComponent, canActivate: [RoleGuard]},
  {path: 'csoportuj', component: CsoportSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'csoportegy', component: CsoportegyComponent, canActivate: [RoleGuard], children: [
    {path: 'torles', component: CsoportTorlesComponent},
    {path: 'szerkesztes', component: CsoportSzerkesztesComponent},
    {path: 'felhasznalo', component: CsoportFelhasznaloComponent},
    {path: 'jog', component: CsoportJogComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: '', redirectTo: 'bejelentkezes', pathMatch: 'full'},
  {path: '**', redirectTo: 'fooldal'}
];

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    DatetimeHunPipe,
    DateHunPipe,

    AppComponent,
    MenuComponent,
    FooldalComponent,
    MenunodeComponent,
    MenuitemComponent,
    BejelentkezesComponent,
    ErrormodalComponent,
    FelhasznaloComponent,
    SzerepkorvalasztasComponent,
    JelszocsereComponent,
    ToolbarComponent,
    ToolbarfooterComponent,
    FelhasznaloEgyComponent,
    FelhasznaloTorlesComponent,
    FelhasznaloSzerkesztesComponent,
    FelhasznaloJelszoComponent,
    BlankComponent,
    ProjektComponent,
    ProjektToolbarComponent,
    ProjektegyComponent,
    ProjektSzerkesztesComponent,
    ProjektTorlesComponent,
    ProjektMuszakiallapotComponent,
    ProjektInverterComponent,
    ProjektNapelemComponent,
    ProjektExportComponent,
    ProjektIratmintaComponent,
    ProjektBizonylatesiratComponent,
    ProjektSzamlazasirendComponent,
    ProjektTeendoComponent,
    IratComponent,
    IrategyComponent,
    IratToolbarComponent,
    IratDokumentumComponent,
    IratDokumentumegyComponent,
    IratSzerkesztesComponent,
    IratTorlesComponent,
    DokumentumFeltoltesComponent,
    DokumentumLetoltesComponent,
    DokumentumTorlesComponent,
    IrattipusComponent,
    IrattipusegyComponent,
    IrattipusSzerkesztesComponent,
    IrattipusTorlesComponent,
    HelysegComponent,
    HelysegegyComponent,
    HelysegSzerkesztesComponent,
    HelysegTorlesComponent,
    UgyfelComponent,
    UgyfelegyComponent,
    UgyfelTorlesComponent,
    UgyfelSzerkesztesComponent,
    CsoportComponent,
    CsoportegyComponent,
    CsoportSzerkesztesComponent,
    CsoportTorlesComponent,
    CsoportFelhasznaloComponent,
    CsoportJogComponent,
    ParticioComponent,
    ParticioegyComponent,
    ParticioSzerkesztesComponent,
    ParticioTorlesComponent,
    VolumeComponent,
    VolumeegyComponent,
    VolumeTesztComponent,
    FeliratkozasComponent,
    FeliratkozasegyComponent,
    FeliratkozasProjektComponent,
    ProjektTablaComponent,
    RiportComponent,
    KimenoszamlaComponent,
    BejovoszamlaComponent,
    KovetelesComponent,
    TartozasComponent,
    BeszerzesComponent,
    KeszletComponent,
    NgmComponent,
    ParticioSzallitoComponent,
    ParticioNavComponent,
    ParticioSmtpComponent,
    ParticioBizonylatComponent,
    ParticioProjektComponent,
    ParticioVolumeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DatetimeHunPipe,
    DateHunPipe,
  ],
  providers: [
    LoginGuard,
    RoleGuard,

    LogonService,
    MenuService,
    VerzioService,
    SessionService,
    IratService,
    DokumentumService,
    ProjektService,
    FelhasznaloService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
