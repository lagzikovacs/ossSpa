import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './tools/menu/menu.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import { FooldalComponent } from './fooldal/fooldal.component';
import { MenunodeComponent } from './tools/menu/menunode/menunode.component';
import { MenuitemComponent } from './tools/menu/menuitem/menuitem.component';
import {LogonService} from './services/segedeszkosz/logon.service';
import {MenuService} from './services/menu.service';
import {HttpClientModule} from '@angular/common/http';
import { BejelentkezesComponent } from './segedeszkoz/logon/bejelentkezes/bejelentkezes.component';
import { ErrormodalComponent } from './tools/errormodal/errormodal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FelhasznaloComponent } from './torzs/felhasznalo/felhasznalo.component';
import {FelhasznaloService} from './services/torzs/primitiv/felhasznalo.service';
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
import { FelhasznaloEgyComponent } from './torzs/felhasznalo/felhasznalo-egy/felhasznalo-egy.component';
import { FelhasznaloTorlesComponent } from './torzs/felhasznalo/felhasznalo-egy/felhasznalo-torles/felhasznalo-torles.component';
import { FelhasznaloSzerkesztesComponent } from './torzs/felhasznalo/felhasznalo-egy/felhasznalo-szerkesztes/felhasznalo-szerkesztes.component';
import { FelhasznaloJelszoComponent } from './torzs/felhasznalo/felhasznalo-egy/felhasznalo-jelszo/felhasznalo-jelszo.component';
import { BlankComponent } from './tools/blank/blank.component';
import { ProjektComponent } from './eszkoz/projekt/projekt.component';
import { ProjektegyComponent } from './eszkoz/projekt/projektegy/projektegy.component';
import { ProjektSzerkesztesComponent } from './eszkoz/projekt/projektegy/projekt-szerkesztes/projekt-szerkesztes.component';
import { ProjektTorlesComponent } from './eszkoz/projekt/projektegy/projekt-torles/projekt-torles.component';
import {ProjektToolbarComponent} from './eszkoz/projekt/projekttoolbar/projekttoolbar.component';
import {ProjektService} from './services/eszkoz/projekt/projekt.service';
import { ProjektMuszakiallapotComponent } from './eszkoz/projekt/projektegy/projekt-muszakiallapot/projekt-muszakiallapot.component';
import { ProjektInverterComponent } from './eszkoz/projekt/projektegy/projekt-inverter/projekt-inverter.component';
import { ProjektNapelemComponent } from './eszkoz/projekt/projektegy/projekt-napelem/projekt-napelem.component';
import { ProjektIratmintaComponent } from './eszkoz/projekt/projektegy/projekt-iratminta/projekt-iratminta.component';
import { ProjektBizonylatesiratComponent } from './eszkoz/projekt/projektegy/projekt-bizonylatesirat/projekt-bizonylatesirat.component';
import { ProjektSzamlazasirendComponent } from './eszkoz/projekt/projektegy/projekt-szamlazasirend/projekt-szamlazasirend.component';
import { ProjektTeendoComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendo.component';
import { IratComponent } from './eszkoz/irat/irat.component';
import { IrategyComponent } from './eszkoz/irat/irategy/irategy.component';
import {IratToolbarComponent} from './eszkoz/irat/irattolbar/irattoolbar.component';
import { IratDokumentumComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentum.component';
import {IratService} from './services/eszkoz/irat/irat.service';
import {DokumentumService} from './services/eszkoz/irat/dokumentum.service';
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
import { ParticioSzallitoComponent } from './segedeszkoz/particio/particio-szallito/particio-szallito.component';
import { ParticioNavComponent } from './segedeszkoz/particio/particio-nav/particio-nav.component';
import { ParticioSmtpComponent } from './segedeszkoz/particio/particio-smtp/particio-smtp.component';
import { ParticioBizonylatComponent } from './segedeszkoz/particio/particio-bizonylat/particio-bizonylat.component';
import { ParticioProjektComponent } from './segedeszkoz/particio/particio-projekt/particio-projekt.component';
import { ParticioVolumeComponent } from './segedeszkoz/particio/particio-volume/particio-volume.component';
import { TeendoComponent } from './torzs/primitiv/teendo/teendo.component';
import { FizetesimodComponent } from './torzs/primitiv/fizetesimod/fizetesimod.component';
import { PenznemComponent } from './torzs/primitiv/penznem/penznem.component';
import { CikkComponent } from './torzs/cikk/cikk.component';
import { MeComponent } from './torzs/primitiv/me/me.component';
import { AfakulcsComponent } from './torzs/primitiv/afakulcs/afakulcs.component';
import { TermekdijComponent } from './torzs/primitiv/termekdij/termekdij.component';
import { AfakulcsegyComponent } from './torzs/primitiv/afakulcs/afakulcsegy/afakulcsegy.component';
import { TermekdijegyComponent } from './torzs/primitiv/termekdij/termekdijegy/termekdijegy.component';
import { MeegyComponent } from './torzs/primitiv/me/meegy/meegy.component';
import { CikkegyComponent } from './torzs/cikk/cikkegy/cikkegy.component';
import { PenznemegyComponent } from './torzs/primitiv/penznem/penznemegy/penznemegy.component';
import { FizetesimodegyComponent } from './torzs/primitiv/fizetesimod/fizetesimodegy/fizetesimodegy.component';
import { TeendoegyComponent } from './torzs/primitiv/teendo/teendoegy/teendoegy.component';
import { TermekdijSzerkesztesComponent } from './torzs/primitiv/termekdij/termekdijegy/termekdij-szerkesztes/termekdij-szerkesztes.component';
import { TermekdijTorlesComponent } from './torzs/primitiv/termekdij/termekdijegy/termekdij-torles/termekdij-torles.component';
import { AfakulcsSzerkesztesComponent } from './torzs/primitiv/afakulcs/afakulcsegy/afakulcs-szerkesztes/afakulcs-szerkesztes.component';
import { AfakulcsTorlesComponent } from './torzs/primitiv/afakulcs/afakulcsegy/afakulcs-torles/afakulcs-torles.component';
import { MeSzerkesztesComponent } from './torzs/primitiv/me/meegy/me-szerkesztes/me-szerkesztes.component';
import { MeTorlesComponent } from './torzs/primitiv/me/meegy/me-torles/me-torles.component';
import { CikkSzerkesztesComponent } from './torzs/cikk/cikkegy/cikk-szerkesztes/cikk-szerkesztes.component';
import { CikkTorlesComponent } from './torzs/cikk/cikkegy/cikk-torles/cikk-torles.component';
import { TeendoSzerkesztesComponent } from './torzs/primitiv/teendo/teendoegy/teendo-szerkesztes/teendo-szerkesztes.component';
import { TeendoTorlesComponent } from './torzs/primitiv/teendo/teendoegy/teendo-torles/teendo-torles.component';
import { FizetesimodSzerkesztesComponent } from './torzs/primitiv/fizetesimod/fizetesimodegy/fizetesimod-szerkesztes/fizetesimod-szerkesztes.component';
import { FizetesimodTorlesComponent } from './torzs/primitiv/fizetesimod/fizetesimodegy/fizetesimod-torles/fizetesimod-torles.component';
import { PenznemSzerkesztesComponent } from './torzs/primitiv/penznem/penznemegy/penznem-szerkesztes/penznem-szerkesztes.component';
import { PenznemTorlesComponent } from './torzs/primitiv/penznem/penznemegy/penznem-torles/penznem-torles.component';
import { CikkBeszerzesKivetComponent } from './torzs/cikk/cikkegy/cikk-beszerzes-kivet/cikk-beszerzes-kivet.component';
import { PenztarComponent } from './eszkoz/penztar/penztar.component';
import { PenztaregyComponent } from './eszkoz/penztar/penztaregy/penztaregy.component';
import { PenztarTorlesComponent } from './eszkoz/penztar/penztaregy/penztar-torles/penztar-torles.component';
import { PenztarSzerkesztesComponent } from './eszkoz/penztar/penztaregy/penztar-szerkesztes/penztar-szerkesztes.component';
import { FelhasznaloReszletekComponent } from './torzs/felhasznalo/felhasznalo-egy/felhasznalo-reszletek/felhasznalo-reszletek.component';
import { CsoportReszletekComponent } from './segedeszkoz/csoport/csoportegy/csoport-reszletek/csoport-reszletek.component';
import { FelhasznaloTevekenysegComponent } from './torzs/felhasznalo/felhasznalo-egy/felhasznalo-tevekenyseg/felhasznalo-tevekenyseg.component';
import {IrattipusService} from './services/torzs/primitiv/irattipus.service';
import {TeendoService} from './services/torzs/primitiv/teendo.service';
import {FizetesimodService} from './services/torzs/primitiv/fizetesimod.service';
import {PenznemService} from './services/torzs/primitiv/penznem.service';
import {MeService} from './services/torzs/primitiv/me.service';
import {AfakulcsService} from './services/torzs/primitiv/afakulcs.service';
import {TermekdijService} from './services/torzs/primitiv/termekdij.service';
import {CikkService} from './services/torzs/cikk.service';
import {HelysegService} from './services/torzs/primitiv/helyseg.service';
import {UgyfelService} from './services/torzs/ugyfel.service';
import {ParticioService} from './services/segedeszkosz/particio.service';
import {VolumeService} from './services/segedeszkosz/volume.service';
import {CsoportService} from './services/segedeszkosz/csoport.service';
import {FeliratkozasService} from './services/eszkoz/feliratkozas.service';
import {PenztarService} from './services/eszkoz/penztar/penztar.service';
import { PenztarReszletekComponent } from './eszkoz/penztar/penztaregy/penztar-reszletek/penztar-reszletek.component';
import { PenztarExportComponent } from './eszkoz/penztar/penztaregy/penztar-export/penztar-export.component';
import { PenztartetelComponent } from './eszkoz/penztar/penztaregy/penztartetel/penztartetel.component';
import { AfakulcsReszletekComponent } from './torzs/primitiv/afakulcs/afakulcsegy/afakulcs-reszletek/afakulcs-reszletek.component';
import { TeendoReszletekComponent } from './torzs/primitiv/teendo/teendoegy/teendo-reszletek/teendo-reszletek.component';
import { FizetesimodReszletekComponent } from './torzs/primitiv/fizetesimod/fizetesimodegy/fizetesimod-reszletek/fizetesimod-reszletek.component';
import { HelysegReszletekComponent } from './torzs/primitiv/helyseg/helysegegy/helyseg-reszletek/helyseg-reszletek.component';
import { IrattipusReszletekComponent } from './torzs/primitiv/irattipus/irattipusegy/irattipus-reszletek/irattipus-reszletek.component';
import { MeReszletekComponent } from './torzs/primitiv/me/meegy/me-reszletek/me-reszletek.component';
import { PenznemReszletekComponent } from './torzs/primitiv/penznem/penznemegy/penznem-reszletek/penznem-reszletek.component';
import { TermekdijReszletekComponent } from './torzs/primitiv/termekdij/termekdijegy/termekdij-reszletek/termekdij-reszletek.component';
import { CikkReszletekComponent } from './torzs/cikk/cikkegy/cikk-reszletek/cikk-reszletek.component';
import { UgyfelReszletekComponent } from './torzs/ugyfel/ugyfelegy/ugyfel-reszletek/ugyfel-reszletek.component';
import { PenztartetelSzerkesztesComponent } from './eszkoz/penztar/penztaregy/penztartetel/penztartetel-szerkesztes/penztartetel-szerkesztes.component';
import { FeliratkozasReszletekComponent } from './eszkoz/feliratkozas/feliratkozasegy/feliratkozas-reszletek/feliratkozas-reszletek.component';
import { NavexportellenorzesComponent } from './bizonylat/navexportellenorzes/navexportellenorzes.component';
import { IratReszletekComponent } from './eszkoz/irat/irategy/irat-reszletek/irat-reszletek.component';
import { DokumentumReszletekComponent } from './eszkoz/irat/irategy/irat-dokumentum/irat-dokumentumegy/dokumentum-reszletek/dokumentum-reszletek.component';
import { VolumeReszletekComponent } from './segedeszkoz/volume/volumeegy/volume-reszletek/volume-reszletek.component';
import { ProjektReszletekComponent } from './eszkoz/projekt/projektegy/projekt-reszletek/projekt-reszletek.component';
import { ProjektStatuszComponent } from './eszkoz/projekt/projektegy/projekt-statusz/projekt-statusz.component';
import { ProjektSzamlazasirendegyComponent } from './eszkoz/projekt/projektegy/projekt-szamlazasirend/projekt-szamlazasirendegy/projekt-szamlazasirendegy.component';
import { ProjektSzamlazasirendSzerkesztesComponent } from './eszkoz/projekt/projektegy/projekt-szamlazasirend/projekt-szamlazasirendegy/projekt-szamlazasirend-szerkesztes/projekt-szamlazasirend-szerkesztes.component';
import { ProjektSzamlazasirendTorlesComponent } from './eszkoz/projekt/projektegy/projekt-szamlazasirend/projekt-szamlazasirendegy/projekt-szamlazasirend-torles/projekt-szamlazasirend-torles.component';
import { ProjektSzamlazasirendReszletekComponent } from './eszkoz/projekt/projektegy/projekt-szamlazasirend/projekt-szamlazasirendegy/projekt-szamlazasirend-reszletek/projekt-szamlazasirend-reszletek.component';
import { ProjektTeendoegyComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendoegy/projekt-teendoegy.component';
import { ProjektTeendoSzerkesztesComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendoegy/projekt-teendo-szerkesztes/projekt-teendo-szerkesztes.component';
import { ProjektTeendoTorlesComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendoegy/projekt-teendo-torles/projekt-teendo-torles.component';
import { ProjektTeendoReszletekComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendoegy/projekt-teendo-reszletek/projekt-teendo-reszletek.component';
import { ProjektTeendoElvegezveComponent } from './eszkoz/projekt/projektegy/projekt-teendo/projekt-teendoegy/projekt-teendo-elvegezve/projekt-teendo-elvegezve.component';
import { ProjektBizonylatesiratUjbizonylatComponent } from './eszkoz/projekt/projektegy/projekt-bizonylatesirat/projekt-bizonylatesirat-ujbizonylat/projekt-bizonylatesirat-ujbizonylat.component';
import { ProjektBizonylatesiratUjiratComponent } from './eszkoz/projekt/projektegy/projekt-bizonylatesirat/projekt-bizonylatesirat-ujirat/projekt-bizonylatesirat-ujirat.component';
import { ProjektBizonylatesiratUjajanlatComponent } from './eszkoz/projekt/projektegy/projekt-bizonylatesirat/projekt-bizonylatesirat-ujajanlat/projekt-bizonylatesirat-ujajanlat.component';

const routes: Routes = [
  {path: 'fooldal', component: FooldalComponent},

  {path: 'irattipus', component: IrattipusComponent, canActivate: [RoleGuard]},
  {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: IrattipusReszletekComponent},
    {path: 'torles', component: IrattipusTorlesComponent},
    {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},


  {path: 'teendo', component: TeendoComponent, canActivate: [RoleGuard]},
  {path: 'teendouj', component: TeendoSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'teendoegy', component: TeendoegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: TeendoReszletekComponent},
    {path: 'torles', component: TeendoTorlesComponent},
    {path: 'szerkesztes', component: TeendoSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'fizetesimod', component: FizetesimodComponent, canActivate: [RoleGuard]},
  {path: 'fizetesimoduj', component: FizetesimodSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'fizetesimodegy', component: FizetesimodegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: FizetesimodReszletekComponent},
    {path: 'torles', component: FizetesimodTorlesComponent},
    {path: 'szerkesztes', component: FizetesimodSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'penznem', component: PenznemComponent, canActivate: [RoleGuard]},
  {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'penznemegy', component: PenznemegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: PenznemReszletekComponent},
    {path: 'torles', component: PenznemTorlesComponent},
    {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'cikk', component: CikkComponent, canActivate: [RoleGuard]},
  {path: 'cikkuj', component: CikkSzerkesztesComponent, canActivate: [RoleGuard], children: [
    {path: 'me', component: MeComponent, canActivate: [RoleGuard]},
    {path: 'meuj', component: MeSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'meegy', component: MeegyComponent, canActivate: [RoleGuard], children: [
      {path: 'torles', component: MeTorlesComponent},
      {path: 'szerkesztes', component: MeSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'afakulcs', component: AfakulcsComponent, canActivate: [RoleGuard]},
    {path: 'afakulcsuj', component: AfakulcsSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'afakulcsegy', component: AfakulcsegyComponent, canActivate: [RoleGuard], children: [
      {path: 'reszletek', component: AfakulcsReszletekComponent},
      {path: 'torles', component: AfakulcsTorlesComponent},
      {path: 'szerkesztes', component: AfakulcsSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'termekdij', component: TermekdijComponent, canActivate: [RoleGuard]},
    {path: 'termekdijuj', component: TermekdijSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'termekdijegy', component: TermekdijegyComponent, canActivate: [RoleGuard], children: [
      {path: 'reszletek', component: TermekdijReszletekComponent},
      {path: 'torles', component: TermekdijTorlesComponent},
      {path: 'szerkesztes', component: TermekdijSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'cikkegy', component: CikkegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: CikkReszletekComponent},
    {path: 'torles', component: CikkTorlesComponent},
    {path: 'szerkesztes', component: CikkSzerkesztesComponent, children: [
      {path: 'me', component: MeComponent, canActivate: [RoleGuard]},
      {path: 'meuj', component: MeSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'meegy', component: MeegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: MeReszletekComponent},
        {path: 'torles', component: MeTorlesComponent},
        {path: 'szerkesztes', component: MeSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'afakulcs', component: AfakulcsComponent, canActivate: [RoleGuard]},
      {path: 'afakulcsuj', component: AfakulcsSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'afakulcsegy', component: AfakulcsegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: AfakulcsReszletekComponent},
        {path: 'torles', component: AfakulcsTorlesComponent},
        {path: 'szerkesztes', component: AfakulcsSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'termekdij', component: TermekdijComponent, canActivate: [RoleGuard]},
      {path: 'termekdijuj', component: TermekdijSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'termekdijegy', component: TermekdijegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: TermekdijReszletekComponent},
        {path: 'torles', component: TermekdijTorlesComponent},
        {path: 'szerkesztes', component: TermekdijSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'beszerzeskivet', component: CikkBeszerzesKivetComponent},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'me', component: MeComponent, canActivate: [RoleGuard]},
  {path: 'meuj', component: MeSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'meegy', component: MeegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: MeReszletekComponent},
    {path: 'torles', component: MeTorlesComponent},
    {path: 'szerkesztes', component: MeSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'afakulcs', component: AfakulcsComponent, canActivate: [RoleGuard]},
  {path: 'afakulcsuj', component: AfakulcsSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'afakulcsegy', component: AfakulcsegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: AfakulcsReszletekComponent},
    {path: 'torles', component: AfakulcsTorlesComponent},
    {path: 'szerkesztes', component: AfakulcsSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'termekdij', component: TermekdijComponent, canActivate: [RoleGuard]},
  {path: 'termekdijuj', component: TermekdijSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'termekdijegy', component: TermekdijegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: TermekdijReszletekComponent},
    {path: 'torles', component: TermekdijTorlesComponent},
    {path: 'szerkesztes', component: TermekdijSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},


  {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
  {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: HelysegReszletekComponent},
    {path: 'torles', component: HelysegTorlesComponent},
    {path: 'szerkesztes', component: HelysegSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'ugyfel', component: UgyfelComponent, canActivate: [RoleGuard]},
  {path: 'ugyfeluj', component: UgyfelSzerkesztesComponent, canActivate: [RoleGuard], children: [
    {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
    {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
      {path: 'reszletek', component: HelysegReszletekComponent},
      {path: 'torles', component: HelysegTorlesComponent},
      {path: 'szerkesztes', component: HelysegSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'blank', component: BlankComponent}
  ]},
  {path: 'ugyfelegy', component: UgyfelegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: UgyfelReszletekComponent},
    {path: 'torles', component: UgyfelTorlesComponent},
    {path: 'szerkesztes', component: UgyfelSzerkesztesComponent, children: [
      {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
      {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: HelysegReszletekComponent},
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
    {path: 'reszletek', component: ProjektReszletekComponent},
    {path: 'torles', component: ProjektTorlesComponent},
    {path: 'szerkesztes', component: ProjektSzerkesztesComponent},
    {path: 'stsz', component: ProjektStatuszComponent},
    {path: 'muszakiallapot', component: ProjektMuszakiallapotComponent},
    {path: 'inverter', component: ProjektInverterComponent},
    {path: 'napelem', component: ProjektNapelemComponent},
    {path: 'iratminta', component: ProjektIratmintaComponent},
    {path: 'bizonylatesirat', component: ProjektBizonylatesiratComponent},
    {path: 'bizonylatesiratujbizonylat', component: ProjektBizonylatesiratUjbizonylatComponent},
    {path: 'bizonylatesiratujirat', component: ProjektBizonylatesiratUjiratComponent, children: [
      {path: 'irattipus', component: IrattipusComponent, canActivate: [RoleGuard]},
      {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: IrattipusReszletekComponent},
        {path: 'torles', component: IrattipusTorlesComponent},
        {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'bizonylatesiratujajanlat', component: ProjektBizonylatesiratUjajanlatComponent},
    ///////////////////////////////
    {path: 'szamlazasirend', component: ProjektSzamlazasirendComponent},
    {path: 'szamlazasirenduj', component: ProjektSzamlazasirendSzerkesztesComponent, children: [
      {path: 'penznem', component: PenznemComponent, canActivate: [RoleGuard]},
      {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'penznemegy', component: PenznemegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: PenznemReszletekComponent},
        {path: 'torles', component: PenznemTorlesComponent},
        {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'blank', component: BlankComponent},
    ]},
    {path: 'szamlazasirendegy', component: ProjektSzamlazasirendegyComponent, children: [
      {path: 'reszletek', component: ProjektSzamlazasirendReszletekComponent},
      {path: 'torles', component: ProjektSzamlazasirendTorlesComponent},
      {path: 'szerkesztes', component: ProjektSzamlazasirendSzerkesztesComponent, children: [
        {path: 'penznem', component: PenznemComponent, canActivate: [RoleGuard]},
        {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
        {path: 'penznemegy', component: PenznemegyComponent, canActivate: [RoleGuard], children: [
          {path: 'reszletek', component: PenznemReszletekComponent},
          {path: 'torles', component: PenznemTorlesComponent},
          {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
          {path: 'blank', component: BlankComponent}
        ]},
        {path: 'blank', component: BlankComponent},
      ]},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'projektteendo', component: ProjektTeendoComponent},
    {path: 'projektteendouj', component: ProjektTeendoSzerkesztesComponent, children: [
//itt
      {path: 'felhasznalo', component: FelhasznaloComponent, canActivate: [RoleGuard]},
      {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: FelhasznaloReszletekComponent},
        {path: 'torles', component: FelhasznaloTorlesComponent},
        {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
        {path: 'jelszo', component: FelhasznaloJelszoComponent},
        {path: 'tevekenyseg', component: FelhasznaloTevekenysegComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'teendo', component: TeendoComponent, canActivate: [RoleGuard]},
      {path: 'teendouj', component: TeendoSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'teendoegy', component: TeendoegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: TeendoReszletekComponent},
        {path: 'torles', component: TeendoTorlesComponent},
        {path: 'szerkesztes', component: TeendoSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'blank', component: BlankComponent}
//itt
    ]},
    {path: 'blank', component: BlankComponent},
    {path: 'projektteendoegy', component: ProjektTeendoegyComponent, children: [
      {path: 'reszletek', component: ProjektTeendoReszletekComponent},
      {path: 'torles', component: ProjektTeendoTorlesComponent},
      {path: 'szerkesztes', component: ProjektTeendoSzerkesztesComponent, children: [
//itt
        {path: 'felhasznalo', component: FelhasznaloComponent, canActivate: [RoleGuard]},
        {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
        {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
          {path: 'reszletek', component: FelhasznaloReszletekComponent},
          {path: 'torles', component: FelhasznaloTorlesComponent},
          {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
          {path: 'jelszo', component: FelhasznaloJelszoComponent},
          {path: 'tevekenyseg', component: FelhasznaloTevekenysegComponent},
          {path: 'blank', component: BlankComponent}
        ]},
        {path: 'teendo', component: TeendoComponent, canActivate: [RoleGuard]},
        {path: 'teendouj', component: TeendoSzerkesztesComponent, canActivate: [RoleGuard]},
        {path: 'teendoegy', component: TeendoegyComponent, canActivate: [RoleGuard], children: [
          {path: 'reszletek', component: TeendoReszletekComponent},
          {path: 'torles', component: TeendoTorlesComponent},
          {path: 'szerkesztes', component: TeendoSzerkesztesComponent},
          {path: 'blank', component: BlankComponent}
        ]},
        {path: 'blank', component: BlankComponent}
//itt
      ]},
      {path: 'elvegezve', component: ProjektTeendoElvegezveComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'irat', component: IratComponent, canActivate: [RoleGuard]},
  {path: 'iratuj', component: IratSzerkesztesComponent, canActivate: [RoleGuard], children: [
    {path: 'irattipus', component: IrattipusComponent, canActivate: [RoleGuard]},
    {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
      {path: 'reszletek', component: IrattipusReszletekComponent},
      {path: 'torles', component: IrattipusTorlesComponent},
      {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
  ]},
  {path: 'irategy', component: IrategyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: IratReszletekComponent},
    {path: 'torles', component: IratTorlesComponent},
    {path: 'szerkesztes', component: IratSzerkesztesComponent, children: [
      {path: 'irattipus', component: IrattipusComponent},
      {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'irattipusegy', component: IrattipusegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: IrattipusReszletekComponent},
        {path: 'torles', component: IrattipusTorlesComponent},
        {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
    ]},
    {path: 'dokumentum', component: IratDokumentumComponent},
    {path: 'dokumentumfeltoltes', component: DokumentumFeltoltesComponent},
    {path: 'blank', component: BlankComponent},
    {path: 'dokumentumegy', component: IratDokumentumegyComponent, children: [
      {path: 'torles', component: DokumentumTorlesComponent},
      {path: 'letoltes', component: DokumentumLetoltesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
  ]},

  {path: 'penztar', component: PenztarComponent, canActivate: [RoleGuard]},
  {path: 'penztaruj', component: PenztarSzerkesztesComponent, canActivate: [RoleGuard], children: [
    {path: 'penznem', component: PenznemComponent, canActivate: [RoleGuard]},
    {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
    {path: 'penznemegy', component: PenznemegyComponent, canActivate: [RoleGuard], children: [
      {path: 'reszletek', component: PenznemReszletekComponent},
      {path: 'torles', component: PenznemTorlesComponent},
      {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
      {path: 'blank', component: BlankComponent}
    ]},
    {path: 'blank', component: BlankComponent},
  ]},
  {path: 'penztaregy', component: PenztaregyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: PenztarReszletekComponent},
    {path: 'torles', component: PenztarTorlesComponent},
    {path: 'szerkesztes', component: PenztarSzerkesztesComponent, children: [
      {path: 'penznem', component: PenznemComponent, canActivate: [RoleGuard]},
      {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
      {path: 'penznemegy', component: PenznemegyComponent, canActivate: [RoleGuard], children: [
        {path: 'reszletek', component: PenznemReszletekComponent},
        {path: 'torles', component: PenznemTorlesComponent},
        {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
        {path: 'blank', component: BlankComponent}
      ]},
      {path: 'blank', component: BlankComponent},
    ]},
    {path: 'tetelek', component: PenztartetelComponent},
    {path: 'export', component: PenztarExportComponent},
    {path: 'tetelszerkesztes', component: PenztartetelSzerkesztesComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'feliratkozas', component: FeliratkozasComponent, canActivate: [RoleGuard]},
  {path: 'feliratkozasegy', component: FeliratkozasegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: FeliratkozasReszletekComponent},
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

  {path: 'navexportellenorzese', component: NavexportellenorzesComponent, canActivate: [RoleGuard]},

  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'szerepkorvalasztas', component: SzerepkorvalasztasComponent, canActivate: [LoginGuard]},
  {path: 'jelszocsere', component: JelszocsereComponent, canActivate: [LoginGuard]},

  {path: 'particio', component: ParticioComponent, canActivate: [RoleGuard], children: [
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
    {path: 'reszletek', component: VolumeReszletekComponent},
    {path: 'teszt', component: VolumeTesztComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'felhasznalo', component: FelhasznaloComponent, canActivate: [RoleGuard]},
  {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: FelhasznaloReszletekComponent},
    {path: 'torles', component: FelhasznaloTorlesComponent},
    {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
    {path: 'jelszo', component: FelhasznaloJelszoComponent},
    {path: 'tevekenyseg', component: FelhasznaloTevekenysegComponent},
    {path: 'blank', component: BlankComponent}
  ]},

  {path: 'csoport', component: CsoportComponent, canActivate: [RoleGuard]},
  {path: 'csoportuj', component: CsoportSzerkesztesComponent, canActivate: [RoleGuard]},
  {path: 'csoportegy', component: CsoportegyComponent, canActivate: [RoleGuard], children: [
    {path: 'reszletek', component: CsoportReszletekComponent},
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
    ParticioVolumeComponent,
    TeendoComponent,
    FizetesimodComponent,
    PenznemComponent,
    CikkComponent,
    MeComponent,
    AfakulcsComponent,
    TermekdijComponent,
    AfakulcsegyComponent,
    TermekdijegyComponent,
    MeegyComponent,
    CikkegyComponent,
    PenznemegyComponent,
    FizetesimodegyComponent,
    TeendoegyComponent,
    TermekdijSzerkesztesComponent,
    TermekdijTorlesComponent,
    AfakulcsSzerkesztesComponent,
    AfakulcsTorlesComponent,
    MeSzerkesztesComponent,
    MeTorlesComponent,
    CikkSzerkesztesComponent,
    CikkTorlesComponent,
    TeendoSzerkesztesComponent,
    TeendoTorlesComponent,
    FizetesimodSzerkesztesComponent,
    FizetesimodTorlesComponent,
    PenznemSzerkesztesComponent,
    PenznemTorlesComponent,
    CikkBeszerzesKivetComponent,
    PenztarComponent,
    PenztaregyComponent,
    PenztarTorlesComponent,
    PenztarSzerkesztesComponent,
    FelhasznaloReszletekComponent,
    CsoportReszletekComponent,
    FelhasznaloTevekenysegComponent,
    PenztarReszletekComponent,
    PenztarExportComponent,
    PenztartetelComponent,
    AfakulcsReszletekComponent,
    TeendoReszletekComponent,
    FizetesimodReszletekComponent,
    HelysegReszletekComponent,
    IrattipusReszletekComponent,
    MeReszletekComponent,
    PenznemReszletekComponent,
    TermekdijReszletekComponent,
    CikkReszletekComponent,
    UgyfelReszletekComponent,
    PenztartetelSzerkesztesComponent,
    FeliratkozasReszletekComponent,
    NavexportellenorzesComponent,
    IratReszletekComponent,
    DokumentumReszletekComponent,
    VolumeReszletekComponent,
    ProjektReszletekComponent,
    ProjektStatuszComponent,
    ProjektSzamlazasirendegyComponent,
    ProjektSzamlazasirendSzerkesztesComponent,
    ProjektSzamlazasirendTorlesComponent,
    ProjektSzamlazasirendReszletekComponent,
    ProjektTeendoegyComponent,
    ProjektTeendoSzerkesztesComponent,
    ProjektTeendoTorlesComponent,
    ProjektTeendoReszletekComponent,
    ProjektTeendoElvegezveComponent,
    ProjektBizonylatesiratUjbizonylatComponent,
    ProjektBizonylatesiratUjiratComponent,
    ProjektBizonylatesiratUjajanlatComponent
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

    ProjektService,
    IratService,
    DokumentumService,
    PenztarService,
    FeliratkozasService,

    ParticioService,
    VolumeService,
    FelhasznaloService,
    CsoportService,
    LogonService,

    MenuService,
    VerzioService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
