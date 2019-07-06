import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu/menu.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import { FooldalComponent } from './fooldal/fooldal.component';
import { MenunodeComponent } from './menu/menunode/menunode.component';
import { MenuitemComponent } from './menu/menuitem/menuitem.component';
import {LogonService} from './logon/logon.service';
import {MenuService} from './menu/menu.service';
import {HttpClientModule} from '@angular/common/http';
import { BejelentkezesComponent } from './logon/bejelentkezes/bejelentkezes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FelhasznaloListComponent } from './primitiv/felhasznalo/felhasznalo-list/felhasznalo-list.component';
import {FelhasznaloService} from './primitiv/felhasznalo/felhasznalo.service';
import {LoginGuard} from './guards/login.guard';
import {RoleGuard} from './guards/role.guard';
import { SzerepkorvalasztasComponent } from './logon/szerepkorvalasztas/szerepkorvalasztas.component';
import { JelszocsereComponent } from './logon/jelszocsere/jelszocsere.component';
import { ToolbarComponent } from './tools/toolbar/toolbar.component';
import { ToolbarfooterComponent } from './tools/toolbar/toolbarfooter/toolbarfooter.component';
import {VerzioService} from './menu/verzio.service';
import {SessionService} from './session/session.service';
import {DateHunPipe} from './pipes/datehun.pipe';
import {DatetimeHunPipe} from './pipes/datetimehun.pipe';
import { FelhasznaloSzerkesztesComponent } from './primitiv/felhasznalo/felhasznalo-szerkesztes/felhasznalo-szerkesztes.component';
import { FelhasznaloJelszoComponent } from './primitiv/felhasznalo/felhasznalo-jelszo/felhasznalo-jelszo.component';
import { ProjektListComponent } from './projekt/projekt-list/projekt-list.component';
import { ProjektEgyComponent } from './projekt/projekt-egy/projekt-egy.component';
import { ProjektSzerkesztesComponent } from './projekt/projekt-szerkesztes/projekt-szerkesztes.component';
import {ProjektToolbarComponent} from './projekt/projekttoolbar/projekttoolbar.component';
import {ProjektService} from './projekt/projekt.service';
import { ProjektMuszakiallapotComponent } from './projekt/projekt-muszakiallapot/projekt-muszakiallapot.component';
import { ProjektInverterComponent } from './projekt/projekt-inverter/projekt-inverter.component';
import { ProjektNapelemComponent } from './projekt/projekt-napelem/projekt-napelem.component';
import { ProjektIratmintaComponent } from './iratminta/projekt-iratminta.component';
import { ProjektkapcsolatListComponent } from './projektkapcsolat/projektkapcsolat-list/projektkapcsolat-list.component';
import { SzamlazasirendListComponent } from './szamlazasirend/szamlazasirend-list/szamlazasirend-list.component';
import { ProjektTeendoListComponent } from './projektteendo/projekt-teendo-list/projekt-teendo-list.component';
import { IratListComponent } from './irat/irat-list/irat-list.component';
import { IratEgyComponent } from './irat/irat-egy/irat-egy.component';
import {IratToolbarComponent} from './irat/irattolbar/irattoolbar.component';
import { DokumentumListComponent } from './dokumentum/dokumentum-list/dokumentum-list.component';
import {IratService} from './irat/irat.service';
import {DokumentumService} from './dokumentum/dokumentum.service';
import { DokumentumEgyComponent } from './dokumentum/dokumentum-egy/dokumentum-egy.component';
import { IratSzerkesztesComponent } from './irat/irat-szerkesztes/irat-szerkesztes.component';
import { DokumentumFeltoltesComponent } from './dokumentum/dokumentum-feltoltes/dokumentum-feltoltes.component';
import { IrattipusListComponent } from './primitiv/irattipus/irattipus-list/irattipus-list.component';
import { IrattipusSzerkesztesComponent } from './primitiv/irattipus/irattipus-szerkesztes/irattipus-szerkesztes.component';
import { HelysegSzerkesztesComponent } from './primitiv/helyseg/helyseg-szerkesztes/helyseg-szerkesztes.component';
import { UgyfelListComponent } from './ugyfel/ugyfel-list/ugyfel-list.component';
import { UgyfelSzerkesztesComponent } from './ugyfel/ugyfel-szerkesztes/ugyfel-szerkesztes.component';
import { CsoportListComponent } from './csoport/csoport-list/csoport-list.component';
import { CsoportSzerkesztesComponent } from './csoport/csoport-szerkesztes/csoport-szerkesztes.component';
import { CsoportFelhasznaloComponent } from './csoport/csoport-felhasznalo/csoport-felhasznalo.component';
import { CsoportJogComponent } from './csoport/csoport-jog/csoport-jog.component';
import { VolumeTesztComponent } from './volume/volume-teszt/volume-teszt.component';
import { AjanlatkeresListComponent } from './ajanlatkeres/ajanlatkeres-list/ajanlatkeres-list.component';
import { FeliratkozasEgyComponent } from './ajanlatkeres/ajanlatkeres-egy/ajanlatkeres-egy.component';
import { AjanlatkeresProjektComponent } from './ajanlatkeres/ajanlatkeres-projekt/ajanlatkeres-projekt.component';
import { ProjektTablaComponent } from './projekt/projekttabla/projekt-tabla.component';
import { RiportComponent } from './riport/riport.component';
import { KimenoszamlaComponent } from './riport/kimenoszamla/kimenoszamla.component';
import { BejovoszamlaComponent } from './riport/bejovoszamla/bejovoszamla.component';
import { KovetelesComponent } from './riport/koveteles/koveteles.component';
import { TartozasComponent } from './riport/tartozas/tartozas.component';
import { BeszerzesComponent } from './riport/beszerzes/beszerzes.component';
import { KeszletComponent } from './riport/keszlet/keszlet.component';
import { NgmComponent } from './ngm/ngm.component';
import { ParticioSzallitoComponent } from './particio/particio-szallito/particio-szallito.component';
import { ParticioNavComponent } from './particio/particio-nav/particio-nav.component';
import { ParticioSmtpComponent } from './particio/particio-smtp/particio-smtp.component';
import { ParticioBizonylatComponent } from './particio/particio-bizonylat/particio-bizonylat.component';
import { ParticioProjektComponent } from './particio/particio-projekt/particio-projekt.component';
import { ParticioVolumeComponent } from './particio/particio-volume/particio-volume.component';
import { TeendoListComponent } from './primitiv/teendo/teendo-list/teendo-list.component';
import { FizetesimodListComponent } from './primitiv/fizetesimod/fizetesimod-list/fizetesimod-list.component';
import { PenznemListComponent } from './primitiv/penznem/penznem-list/penznem-list.component';
import { CikkListComponent } from './cikk/cikk-list/cikk-list.component';
import { MeListComponent } from './primitiv/me/me-list/me-list.component';
import { AfakulcsListComponent } from './primitiv/afakulcs/afakulcs-list/afakulcs-list.component';
import { TermekdijListComponent } from './primitiv/termekdij/termekdij-list/termekdij-list.component';
import { CikkEgyComponent } from './cikk/cikk-egy/cikk-egy.component';
import { TermekdijSzerkesztesComponent } from './primitiv/termekdij/termekdij-szerkesztes/termekdij-szerkesztes.component';
import { AfakulcsSzerkesztesComponent } from './primitiv/afakulcs/afakulcs-szerkesztes/afakulcs-szerkesztes.component';
import { MeSzerkesztesComponent } from './primitiv/me/me-szerkesztes/me-szerkesztes.component';
import { CikkSzerkesztesComponent } from './cikk/cikk-szerkesztes/cikk-szerkesztes.component';
import { TeendoSzerkesztesComponent } from './primitiv/teendo/teendo-szerkesztes/teendo-szerkesztes.component';
import { FizetesimodSzerkesztesComponent } from './primitiv/fizetesimod/fizetesimod-szerkesztes/fizetesimod-szerkesztes.component';
import { PenznemSzerkesztesComponent } from './primitiv/penznem/penznem-szerkesztes/penznem-szerkesztes.component';
import { CikkBeszerzesKivetComponent } from './cikk/cikk-beszerzes-kivet/cikk-beszerzes-kivet.component';
import { PenztarListComponent } from './penztar/penztar-list/penztar-list.component';
import { PenztarEgyComponent } from './penztar/penztar-egy/penztar-egy.component';
import {IrattipusService} from './primitiv/irattipus/irattipus.service';
import {TeendoService} from './primitiv/teendo/teendo.service';
import {FizetesimodService} from './primitiv/fizetesimod/fizetesimod.service';
import {PenznemService} from './primitiv/penznem/penznem.service';
import {MeService} from './primitiv/me/me.service';
import {AfakulcsService} from './primitiv/afakulcs/afakulcs.service';
import {TermekdijService} from './primitiv/termekdij/termekdij.service';
import {CikkService} from './cikk/cikk.service';
import {HelysegService} from './primitiv/helyseg/helyseg.service';
import {UgyfelService} from './ugyfel/ugyfel.service';
import {ParticioService} from './particio/particio.service';
import {VolumeService} from './volume/volume.service';
import {CsoportService} from './csoport/csoport.service';
import {AjanlatkeresService} from './ajanlatkeres/ajanlatkeres.service';
import {PenztarService} from './penztar/penztar.service';
import { PenztartetelSzerkesztesComponent } from './penztartetel/penztartetel-szerkesztes/penztartetel-szerkesztes.component';
import { OnlineszamlaellenorzeseComponent } from './onlineszamla/onlineszamlaellenorzese/onlineszamlaellenorzese.component';
import { ProjektStatuszComponent } from './projekt/projekt-statusz/projekt-statusz.component';
import { SzamlazasirendEgyComponent } from './szamlazasirend/szamlazasirend-egy/szamlazasirend-egy.component';
import { SzamlazasirendSzerkesztesComponent } from './szamlazasirend/szamlazasirend-szerkesztes/szamlazasirend-szerkesztes.component';
import { ProjektTeendoEgyComponent } from './projektteendo/projekt-teendo-egy/projekt-teendo-egy.component';
import { ProjektTeendoSzerkesztesComponent } from './projektteendo/projekt-teendo-szerkesztes/projekt-teendo-szerkesztes.component';
import { ProjektTeendoElvegezveComponent } from './projektteendo/projekt-teendo-elvegezve/projekt-teendo-elvegezve.component';
import { ProjektkapcsolatUjbizonylatComponent } from './projektkapcsolat/projektkapcsolat-ujbizonylat/projektkapcsolat-ujbizonylat.component';
import { ProjektkapcsolatUjiratComponent } from './projektkapcsolat/projektkapcsolat-ujirat/projektkapcsolat-ujirat.component';
import { AjanlatComponent } from './ajanlat/ajanlat/ajanlat';
import { VolumeListComponent } from './volume/volume-list/volume-list.component';
import { ParticioEgyComponent } from './particio/particio-egy/particio-egy.component';
import { HelysegListComponent } from './primitiv/helyseg/helyseg-list/helyseg-list.component';
import {UgyfelEgyComponent} from './ugyfel/ugyfel-egy/ugyfel-egy.component';
import {PenztartetelListComponent} from './penztartetel/penztartetel-list/penztartetel-list.component';
import {PenztarExportComponent} from './penztar/penztar-export/penztar-export.component';
import {PenztarSzerkesztesComponent} from './penztar/penztar-szerkesztes/penztar-szerkesztes.component';
import { ProjektkapcsolatContainerComponent } from './projektkapcsolat/projektkapcsolat-container/projektkapcsolat-container.component';
import {PenztartetelService} from './penztartetel/penztartetel.service';
import {BizonylatService} from './bizonylat/bizonylat.service';
import {RiportService} from './riport/riport.service';
import { ProjektkapcsolatLevalasztasComponent } from './projektkapcsolat/projektkapcsolat-levalasztas/projektkapcsolat-levalasztas.component';
import { ProjektExportComponent } from './projekt/projekt-export/projekt-export.component';
import { IratNincsprojektComponent } from './irat/irat-nincsprojekt/irat-nincsprojekt.component';
import { AjanlatTetelComponent } from './ajanlat/ajanlat-tetel/ajanlat-tetel';
import { BizonylatContainerComponent } from './bizonylat/bizonylat-container/bizonylat-container.component';
import { BizonylatListComponent } from './bizonylat/bizonylat-list/bizonylat-list.component';
import { BizonylatEgyComponent } from './bizonylat/bizonylat-egy/bizonylat-egy.component';
import { BizonylattoolbarComponent } from './bizonylat/bizonylattoolbar/bizonylattoolbar.component';
import { BizonylattablaComponent } from './bizonylat/bizonylattabla/bizonylattabla.component';
import { BizonylatSzerkesztesComponent } from './bizonylat/bizonylat-szerkesztes/bizonylat-szerkesztes.component';
import { AdoszamellenorzesComponent } from './onlineszamla/adoszamellenorzes/adoszamellenorzes.component';
import { SzamlalekerdezesComponent } from './onlineszamla/szamlalekerdezes/szamlalekerdezes.component';
import { KifizetesContainerComponent } from './kifizetes/kifizetes-container/kifizetes-container.component';
import { KifizetesListComponent } from './kifizetes/kifizetes-list/kifizetes-list.component';
import { KifizetesEgyComponent } from './kifizetes/kifizetes-egy/kifizetes-egy.component';
import { KifizetesSzerkesztesComponent } from './kifizetes/kifizetes-szerkesztes/kifizetes-szerkesztes.component';
import { BizonylatNyomtatasComponent } from './bizonylatnyomtatas/bizonylat-nyomtatas/bizonylat-nyomtatas.component';
import { ProjektDatumokComponent } from './projekt/projekt-datumok/projekt-datumok.component';
import { BizonylatReszletekComponent } from './bizonylat/bizonylat-reszletek/bizonylat-reszletek.component';
import { BizonylatIratContainerComponent } from './bizonylatkapcsolat/bizonylat-irat-container/bizonylat-irat-container.component';
import { BizonylatIratListComponent } from './bizonylatkapcsolat/bizonylat-irat-list/bizonylat-irat-list.component';
import { BizonylatIratLevalasztasComponent } from './bizonylatkapcsolat/bizonylat-irat-levalasztas/bizonylat-irat-levalasztas.component';
import { BizonylatIratUjComponent } from './bizonylatkapcsolat/bizonylat-irat-uj/bizonylat-irat-uj.component';
import { BizonylatteteltablaComponent } from './bizonylat/bizonylatteteltabla/bizonylatteteltabla.component';
import { BizonylatafatablaComponent } from './bizonylat/bizonylatafatabla/bizonylatafatabla.component';
import { BizonylattermekdijtablaComponent } from './bizonylat/bizonylattermekdijtabla/bizonylattermekdijtabla.component';
import { BizonylatErrolComponent } from './bizonylat/bizonylat-errol/bizonylat-errol.component';
import { BizonylatKibocsatasComponent } from './bizonylat/bizonylat-kibocsatas/bizonylat-kibocsatas.component';
import { BizonylatStornoComponent } from './bizonylat/bizonylat-storno/bizonylat-storno.component';
import { BizonylatPenztarComponent } from './bizonylat/bizonylat-penztar/bizonylat-penztar.component';
import { BizonylatKifizetesrendbenComponent } from './bizonylat/bizonylat-kifizetesrendben/bizonylat-kifizetesrendben.component';
import { BizonylatKiszallitvaComponent } from './bizonylat/bizonylat-kiszallitva/bizonylat-kiszallitva.component';
import { BizonylatFormaiellenorzesComponent } from './bizonylat/bizonylat-formaiellenorzes/bizonylat-formaiellenorzes.component';
import { BizonylatOSNxmlComponent } from './bizonylat/bizonylat-osnxml/bizonylat-osnxml.component';
import { BoolHunPipe } from './pipes/boolhun.pipe';
import { BizonylatTetelSzerkesztesComponent } from './bizonylat/bizonylat-tetel-szerkesztes/bizonylat-tetel-szerkesztes.component';
import { BizonylatTetelTorlesComponent } from './bizonylat/bizonylat-tetel-torles/bizonylat-tetel-torles.component';
import { VagolapComponent } from './vagolap/vagolap.component';
import {VagolapService} from './vagolap/vagolap.service';
import { AbuComponent } from './tools/abu/abu.component';
import { BizonylatIratVagolaprolComponent } from './bizonylatkapcsolat/bizonylat-irat-vagolaprol/bizonylat-irat-vagolaprol.component';
import { ProjektkapcsolatVagolaprolComponent } from './projektkapcsolat/projektkapcsolat-vagolaprol/projektkapcsolat-vagolaprol.component';
import {AjanlatService} from './ajanlat/ajanlat.service';
import {IratmintaService} from './iratminta/iratminta.service';
import { EsemenynaploComponent } from './esemenynaplo/esemenynaplo.component';
import { UgyfelterComponent } from './ugyfelter/ugyfelter/ugyfelter.component';
import { UgyfelTerLinkComponent } from './ugyfelter/ugyfel-ter-link/ugyfel-ter-link.component';
import {UgyfelterService} from './ugyfelter/ugyfelter.service';
import { UgyfelProjektComponent } from './ugyfel/ugyfel-projekt/ugyfel-projekt.component';
import { UgyfelterlogComponent } from './ugyfelterlog/ugyfelterlog.component';
import {UgyfelterlogService} from './ugyfelterlog/ugyfelterlog.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FotozasComponent } from './fotozas/fotozas/fotozas.component';
import { FotozasLinkComponent } from './fotozas/fotozas-link/fotozas-link.component';
import {OnlineszamlaService} from './onlineszamla/onlineszamla.service';
import { UgyfelterBizonylatesiratComponent } from './ugyfelter/ugyfelter-bizonylatesirat/ugyfelter-bizonylatesirat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UgyfelterDokumentumComponent } from './ugyfelter/ugyfelter-dokumentum/ugyfelter-dokumentum.component';
import { TetelTorlesComponent } from './tools/tetel-torles/tetel-torles.component';
import { ReszletekComponent } from './tools/reszletek/reszletek.component';
import { UgyfeltoolbarComponent } from './ugyfel/ugyfeltoolbar/ugyfeltoolbar.component';
import { UgyfelCsoportComponent } from './ugyfel/ugyfel-csoport/ugyfel-csoport.component';
import { UgyfelVcardComponent } from './ugyfel/ugyfel-vcard/ugyfel-vcard.component';
import { UgyfelTablaComponent } from './ugyfel/ugyfel-tabla/ugyfel-tabla.component';
import { TablaComponent } from './tools/tabla/tabla.component';
import {StartupService} from './startup/startup.service';
import {ErrorService} from './tools/errorbox/error.service';
import { ErrorboxComponent } from './tools/errorbox/errorbox.component';
import { GspinnerComponent } from './tools/spinner/spinner.component';
import {SpinnerService} from './tools/spinner/spinner.service';
import { UgyfelterProjektTablaComponent } from './ugyfelter/ugyfelter-projekt-tabla/ugyfelter-projekt-tabla.component';
import { ProjektkapcsolatTablaComponent } from './projektkapcsolat/projektkapcsolat-tabla/projektkapcsolat-tabla.component';

const routes: Routes = [
  {path: 'irattipus', component: IrattipusListComponent, canActivate: [RoleGuard]},
  {path: 'teendo', component: TeendoListComponent, canActivate: [RoleGuard]},
  {path: 'fizetesimod', component: FizetesimodListComponent, canActivate: [RoleGuard]},
  {path: 'penznem', component: PenznemListComponent, canActivate: [RoleGuard]},
  {path: 'me', component: MeListComponent, canActivate: [RoleGuard]},
  {path: 'afakulcs', component: AfakulcsListComponent, canActivate: [RoleGuard]},
  {path: 'termekdij', component: TermekdijListComponent, canActivate: [RoleGuard]},
  {path: 'cikk', component: CikkListComponent, canActivate: [RoleGuard]},
  {path: 'helyseg', component: HelysegListComponent, canActivate: [RoleGuard]},
  {path: 'ugyfel', component: UgyfelListComponent, canActivate: [RoleGuard]},

  {path: 'projekt', component: ProjektListComponent, canActivate: [RoleGuard]},
  {path: 'irat', component: IratListComponent, canActivate: [RoleGuard]},
  {path: 'penztar', component: PenztarListComponent, canActivate: [RoleGuard]},
  {path: 'ajanlatkeres', component: AjanlatkeresListComponent, canActivate: [RoleGuard]},
  {path: 'ugyfelterlog', component: UgyfelterlogComponent, canActivate: [RoleGuard]},

  {path: 'bizonylat', children: [
    {path: 'dijbekero', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'elolegszamla', component: BizonylatContainerComponent, canActivate: [RoleGuard]},

    {path: 'szallito', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'szamla', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'megrendeles', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'bejovoszamla', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
  ]},
  {path: 'adoszamellenorzes', component: AdoszamellenorzesComponent, canActivate: [RoleGuard]},
  {path: 'navfeltoltesellenorzese', component: OnlineszamlaellenorzeseComponent, canActivate: [RoleGuard]},
  {path: 'szamlalekerdezes', component: SzamlalekerdezesComponent, canActivate: [RoleGuard]},

  {path: 'riport', component: RiportComponent, canActivate: [RoleGuard], children: [
    {path: 'kimenoszamla', component: KimenoszamlaComponent},
    {path: 'bejovoszamla', component: BejovoszamlaComponent},
    {path: 'koveteles', component: KovetelesComponent},
    {path: 'tartozas', component: TartozasComponent},
    {path: 'doBeszerzes', component: BeszerzesComponent},
    {path: 'keszlet', component: KeszletComponent},
    {path: 'ngm', component: NgmComponent}
  ]},

  {path: 'particio', component: ParticioEgyComponent, canActivate: [RoleGuard]},
  {path: 'volume', component: VolumeListComponent, canActivate: [RoleGuard]},
  {path: 'felhasznalo', component: FelhasznaloListComponent, canActivate: [RoleGuard]},
  {path: 'csoport', component: CsoportListComponent, canActivate: [RoleGuard]},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'szerepkorvalasztas', component: SzerepkorvalasztasComponent, canActivate: [LoginGuard]},
  {path: 'jelszocsere', component: JelszocsereComponent, canActivate: [LoginGuard]},
  {path: 'vagolap', component: VagolapComponent, canActivate: [RoleGuard]},

  {path: 'fooldal', component: FooldalComponent},
  {path: 'ugyfelter', component: UgyfelterComponent},
  {path: 'fotozas', component: FotozasComponent},

  {path: 'ugyfelter', redirectTo: 'ugyfelter', pathMatch: 'full'},
  {path: 'fotozas', redirectTo: 'fotozas', pathMatch: 'full'},
  {path: '**', redirectTo: 'bejelentkezes'}
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
    FelhasznaloListComponent,
    SzerepkorvalasztasComponent,
    JelszocsereComponent,
    ToolbarComponent,
    ToolbarfooterComponent,
    FelhasznaloSzerkesztesComponent,
    FelhasznaloJelszoComponent,
    ProjektListComponent,
    ProjektToolbarComponent,
    ProjektEgyComponent,
    ProjektSzerkesztesComponent,
    ProjektMuszakiallapotComponent,
    ProjektInverterComponent,
    ProjektNapelemComponent,
    ProjektIratmintaComponent,
    ProjektkapcsolatListComponent,
    SzamlazasirendListComponent,
    ProjektTeendoListComponent,
    IratListComponent,
    IratEgyComponent,
    IratToolbarComponent,
    DokumentumListComponent,
    DokumentumEgyComponent,
    IratSzerkesztesComponent,
    DokumentumFeltoltesComponent,
    IrattipusListComponent,
    IrattipusSzerkesztesComponent,
    HelysegSzerkesztesComponent,
    UgyfelSzerkesztesComponent,
    CsoportListComponent,
    CsoportSzerkesztesComponent,
    CsoportFelhasznaloComponent,
    CsoportJogComponent,
    VolumeTesztComponent,
    AjanlatkeresListComponent,
    FeliratkozasEgyComponent,
    AjanlatkeresProjektComponent,
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
    ParticioVolumeComponent,
    TeendoListComponent,
    FizetesimodListComponent,
    PenznemListComponent,
    CikkListComponent,
    MeListComponent,
    AfakulcsListComponent,
    TermekdijListComponent,
    CikkEgyComponent,
    TermekdijSzerkesztesComponent,
    AfakulcsSzerkesztesComponent,
    MeSzerkesztesComponent,
    CikkSzerkesztesComponent,
    TeendoSzerkesztesComponent,
    FizetesimodSzerkesztesComponent,
    PenznemSzerkesztesComponent,
    CikkBeszerzesKivetComponent,
    PenztarListComponent,
    PenztarEgyComponent,
    PenztarSzerkesztesComponent,
    PenztarExportComponent,
    PenztartetelListComponent,
    PenztartetelSzerkesztesComponent,
    OnlineszamlaellenorzeseComponent,
    ProjektStatuszComponent,
    SzamlazasirendEgyComponent,
    SzamlazasirendSzerkesztesComponent,
    ProjektTeendoEgyComponent,
    ProjektTeendoSzerkesztesComponent,
    ProjektTeendoElvegezveComponent,
    ProjektkapcsolatUjbizonylatComponent,
    ProjektkapcsolatUjiratComponent,
    AjanlatComponent,
    VolumeListComponent,
    ParticioEgyComponent,
    HelysegListComponent,
    UgyfelListComponent,
    UgyfelEgyComponent,
    ProjektkapcsolatContainerComponent,
    ProjektkapcsolatLevalasztasComponent,
    ProjektExportComponent,
    IratNincsprojektComponent,
    AjanlatTetelComponent,
    BizonylatContainerComponent,
    BizonylatListComponent,
    BizonylatEgyComponent,
    BizonylattoolbarComponent,
    BizonylattablaComponent,
    BizonylatSzerkesztesComponent,
    AdoszamellenorzesComponent,
    SzamlalekerdezesComponent,
    KifizetesContainerComponent,
    KifizetesListComponent,
    KifizetesEgyComponent,
    KifizetesSzerkesztesComponent,
    BizonylatNyomtatasComponent,
    ProjektDatumokComponent,
    BizonylatReszletekComponent,
    BizonylatIratContainerComponent,
    BizonylatIratListComponent,
    BizonylatIratLevalasztasComponent,
    BizonylatIratUjComponent,
    BizonylatteteltablaComponent,
    BizonylatafatablaComponent,
    BizonylattermekdijtablaComponent,
    BizonylatErrolComponent,
    BizonylatKibocsatasComponent,
    BizonylatStornoComponent,
    BizonylatPenztarComponent,
    BizonylatKifizetesrendbenComponent,
    BizonylatKiszallitvaComponent,
    BizonylatFormaiellenorzesComponent,
    BizonylatOSNxmlComponent,
    BoolHunPipe,
    BizonylatTetelSzerkesztesComponent,
    BizonylatTetelTorlesComponent,
    VagolapComponent,
    AbuComponent,
    BizonylatIratVagolaprolComponent,
    ProjektkapcsolatVagolaprolComponent,
    EsemenynaploComponent,
    UgyfelterComponent,
    UgyfelTerLinkComponent,
    UgyfelProjektComponent,
    UgyfelterlogComponent,
    DashboardComponent,
    FotozasComponent,
    FotozasLinkComponent,
    UgyfelterBizonylatesiratComponent,
    UgyfelterDokumentumComponent,
    TetelTorlesComponent,
    ReszletekComponent,
    UgyfeltoolbarComponent,
    UgyfelCsoportComponent,
    UgyfelVcardComponent,
    UgyfelTablaComponent,
    TablaComponent,
    ErrorboxComponent,
    GspinnerComponent,
    UgyfelterProjektTablaComponent,
    ProjektkapcsolatTablaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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

    IrattipusService,
    TeendoService,
    FizetesimodService,
    PenznemService,
    MeService,
    AfakulcsService,
    TermekdijService,
    CikkService,
    HelysegService,
    UgyfelService,
    UgyfelterService,
    UgyfelterlogService,

    ProjektService,
    AjanlatService,
    IratmintaService,
    IratService,
    DokumentumService,
    PenztarService,
    PenztartetelService,
    AjanlatkeresService,

    BizonylatService,
    OnlineszamlaService,
    RiportService,

    ParticioService,
    VolumeService,
    FelhasznaloService,
    CsoportService,
    LogonService,

    StartupService,

    MenuService,
    VerzioService,
    SessionService,
    VagolapService,
    ErrorService,
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
