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
import { ErrormodalComponent } from './errormodal/errormodal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FelhasznaloListComponent } from './felhasznalo/felhasznalo-list/felhasznalo-list.component';
import {FelhasznaloService} from './felhasznalo/felhasznalo.service';
import {LoginGuard} from './guards/login.guard';
import {RoleGuard} from './guards/role.guard';
import { SzerepkorvalasztasComponent } from './logon/szerepkorvalasztas/szerepkorvalasztas.component';
import { JelszocsereComponent } from './logon/jelszocsere/jelszocsere.component';
import { ToolbarComponent } from './tools/toolbar/toolbar.component';
import { ToolbarfooterComponent } from './tools/toolbar/toolbarfooter/toolbarfooter.component';
import {VerzioService} from './menu/verzio.service';
import {SessionService} from './fooldal/session.service';
import {DateHunPipe} from './pipes/datehun.pipe';
import {DatetimeHunPipe} from './pipes/datetimehun.pipe';
import { FelhasznaloEgyComponent } from './felhasznalo/felhasznalo-egy/felhasznalo-egy.component';
import { FelhasznaloTorlesComponent } from './felhasznalo/felhasznalo-torles/felhasznalo-torles.component';
import { FelhasznaloSzerkesztesComponent } from './felhasznalo/felhasznalo-szerkesztes/felhasznalo-szerkesztes.component';
import { FelhasznaloJelszoComponent } from './felhasznalo/felhasznalo-jelszo/felhasznalo-jelszo.component';
import { BlankComponent } from './blank/blank.component';
import { ProjektListComponent } from './projekt/projekt/projekt-list/projekt-list.component';
import { ProjektEgyComponent } from './projekt/projekt/projekt-egy/projekt-egy.component';
import { ProjektSzerkesztesComponent } from './projekt/projekt/projekt-szerkesztes/projekt-szerkesztes.component';
import { ProjektTorlesComponent } from './projekt/projekt/projekt-torles/projekt-torles.component';
import {ProjektToolbarComponent} from './projekt/projekttoolbar/projekttoolbar.component';
import {ProjektService} from './projekt/projekt/projekt.service';
import { ProjektMuszakiallapotComponent } from './projekt/projekt/projekt-muszakiallapot/projekt-muszakiallapot.component';
import { ProjektInverterComponent } from './projekt/projekt/projekt-inverter/projekt-inverter.component';
import { ProjektNapelemComponent } from './projekt/projekt/projekt-napelem/projekt-napelem.component';
import { ProjektIratmintaComponent } from './projekt/projekt/projekt-iratminta/projekt-iratminta.component';
import { ProjektBizonylatesiratListComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-list/projekt-bizonylatesirat-list.component';
import { ProjektSzamlazasirendListComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-list/projekt-szamlazasirend-list.component';
import { ProjektTeendoListComponent } from './projekt/teendo/projekt-teendo-list/projekt-teendo-list.component';
import { IratListComponent } from './irat/irat/irat-list/irat-list.component';
import { IratEgyComponent } from './irat/irat/irat-egy/irat-egy.component';
import {IratToolbarComponent} from './irat/irat/irattolbar/irattoolbar.component';
import { DokumentumListComponent } from './irat/dokumentum/dokumentum-list/dokumentum-list.component';
import {IratService} from './irat/irat/irat.service';
import {DokumentumService} from './irat/dokumentum/dokumentum.service';
import { DokumentumEgyComponent } from './irat/dokumentum/dokumentum-egy/dokumentum-egy.component';
import { IratSzerkesztesComponent } from './irat/irat/irat-szerkesztes/irat-szerkesztes.component';
import { IratTorlesComponent } from './irat/irat/irat-torles/irat-torles.component';
import { DokumentumFeltoltesComponent } from './irat/dokumentum/dokumentum-feltoltes/dokumentum-feltoltes.component';
import { DokumentumLetoltesComponent } from './irat/dokumentum/dokumentum-letoltes/dokumentum-letoltes.component';
import { DokumentumTorlesComponent } from './irat/dokumentum/dokumentum-torles/dokumentum-torles.component';
import { IrattipusListComponent } from './irattipus/irattipus-list/irattipus-list.component';
import { IrattipusEgyComponent } from './irattipus/irattipus-egy/irattipus-egy.component';
import { IrattipusSzerkesztesComponent } from './irattipus/irattipus-szerkesztes/irattipus-szerkesztes.component';
import { IrattipusTorlesComponent } from './irattipus/irattipus-torles/irattipus-torles.component';
import { HelysegSzerkesztesComponent } from './helyseg/helyseg-szerkesztes/helyseg-szerkesztes.component';
import { HelysegTorlesComponent } from './helyseg/helyseg-torles/helyseg-torles.component';
import { UgyfelListComponent } from './ugyfel/ugyfel-list/ugyfel-list.component';
import { UgyfelTorlesComponent } from './ugyfel/ugyfel-torles/ugyfel-torles.component';
import { UgyfelSzerkesztesComponent } from './ugyfel/ugyfel-szerkesztes/ugyfel-szerkesztes.component';
import { CsoportListComponent } from './csoport/csoport-list/csoport-list.component';
import { CsoportEgyComponent } from './csoport/csoport-egy/csoport-egy.component';
import { CsoportSzerkesztesComponent } from './csoport/csoport-szerkesztes/csoport-szerkesztes.component';
import { CsoportTorlesComponent } from './csoport/csoport-torles/csoport-torles.component';
import { CsoportFelhasznaloComponent } from './csoport/csoport-felhasznalo/csoport-felhasznalo.component';
import { CsoportJogComponent } from './csoport/csoport-jog/csoport-jog.component';
import { VolumeTesztComponent } from './volume/volume-teszt/volume-teszt.component';
import { FeliratkozasListComponent } from './feliratkozas/feliratkozas-list/feliratkozas-list.component';
import { FeliratkozasEgyComponent } from './feliratkozas/feliratkozas-egy/feliratkozas-egy.component';
import { FeliratkozasProjektComponent } from './feliratkozas/feliratkozas-projekt/feliratkozas-projekt.component';
import { ProjektTablaComponent } from './projekt/projekt/projekt-tabla/projekt-tabla.component';
import { RiportComponent } from './riport/riport.component';
import { KimenoszamlaComponent } from './riport/kimenoszamla/kimenoszamla.component';
import { BejovoszamlaComponent } from './riport/bejovoszamla/bejovoszamla.component';
import { KovetelesComponent } from './riport/koveteles/koveteles.component';
import { TartozasComponent } from './riport/tartozas/tartozas.component';
import { BeszerzesComponent } from './riport/beszerzes/beszerzes.component';
import { KeszletComponent } from './riport/keszlet/keszlet.component';
import { NgmComponent } from './riport/ngm/ngm.component';
import { ParticioSzallitoComponent } from './particio/particio-szallito/particio-szallito.component';
import { ParticioNavComponent } from './particio/particio-nav/particio-nav.component';
import { ParticioSmtpComponent } from './particio/particio-smtp/particio-smtp.component';
import { ParticioBizonylatComponent } from './particio/particio-bizonylat/particio-bizonylat.component';
import { ParticioProjektComponent } from './particio/particio-projekt/particio-projekt.component';
import { ParticioVolumeComponent } from './particio/particio-volume/particio-volume.component';
import { TeendoListComponent } from './teendo/teendo-list/teendo-list.component';
import { FizetesimodListComponent } from './fizetesimod/fizetesimod-list/fizetesimod-list.component';
import { PenznemListComponent } from './penznem/penznem-list/penznem-list.component';
import { CikkListComponent } from './cikk/cikk-list/cikk-list.component';
import { MeListComponent } from './me/me-list/me-list.component';
import { AfakulcsListComponent } from './afakulcs/afakulcs-list/afakulcs-list.component';
import { TermekdijListComponent } from './termekdij/termekdij-list/termekdij-list.component';
import { AfakulcsEgyComponent } from './afakulcs/afakulcs-egy/afakulcs-egy.component';
import { TermekdijEgyComponent } from './termekdij/termekdij-egy/termekdij-egy.component';
import { MeEgyComponent } from './me/me-egy/me-egy.component';
import { CikkEgyComponent } from './cikk/cikk-egy/cikk-egy.component';
import { PenznemEgyComponent } from './penznem/penznem-egy/penznem-egy.component';
import { FizetesimodEgyComponent } from './fizetesimod/fizetesimod-egy/fizetesimod-egy.component';
import { TeendoEgyComponent } from './teendo/teendo-egy/teendo-egy.component';
import { TermekdijSzerkesztesComponent } from './termekdij/termekdij-szerkesztes/termekdij-szerkesztes.component';
import { TermekdijTorlesComponent } from './termekdij/termekdij-torles/termekdij-torles.component';
import { AfakulcsSzerkesztesComponent } from './afakulcs/afakulcs-szerkesztes/afakulcs-szerkesztes.component';
import { AfakulcsTorlesComponent } from './afakulcs/afakulcs-torles/afakulcs-torles.component';
import { MeSzerkesztesComponent } from './me/me-szerkesztes/me-szerkesztes.component';
import { MeTorlesComponent } from './me/me-torles/me-torles.component';
import { CikkSzerkesztesComponent } from './cikk/cikk-szerkesztes/cikk-szerkesztes.component';
import { CikkTorlesComponent } from './cikk/cikk-torles/cikk-torles.component';
import { TeendoSzerkesztesComponent } from './teendo/teendo-szerkesztes/teendo-szerkesztes.component';
import { TeendoTorlesComponent } from './teendo/teendo-torles/teendo-torles.component';
import { FizetesimodSzerkesztesComponent } from './fizetesimod/fizetesimod-szerkesztes/fizetesimod-szerkesztes.component';
import { FizetesimodTorlesComponent } from './fizetesimod/fizetesimod-torles/fizetesimod-torles.component';
import { PenznemSzerkesztesComponent } from './penznem/penznem-szerkesztes/penznem-szerkesztes.component';
import { PenznemTorlesComponent } from './penznem/penznem-torles/penznem-torles.component';
import { CikkBeszerzesKivetComponent } from './cikk/cikk-beszerzes-kivet/cikk-beszerzes-kivet.component';
import { PenztarListComponent } from './penztar/penztar-list/penztar-list.component';
import { PenztarEgyComponent } from './penztar/penztar-egy/penztar-egy.component';
import { FelhasznaloReszletekComponent } from './felhasznalo/felhasznalo-reszletek/felhasznalo-reszletek.component';
import { CsoportReszletekComponent } from './csoport/csoport-reszletek/csoport-reszletek.component';
import { FelhasznaloTevekenysegComponent } from './felhasznalo/felhasznalo-tevekenyseg/felhasznalo-tevekenyseg.component';
import {IrattipusService} from './irattipus/irattipus.service';
import {TeendoService} from './teendo/teendo.service';
import {FizetesimodService} from './fizetesimod/fizetesimod.service';
import {PenznemService} from './penznem/penznem.service';
import {MeService} from './me/me.service';
import {AfakulcsService} from './afakulcs/afakulcs.service';
import {TermekdijService} from './termekdij/termekdij.service';
import {CikkService} from './cikk/cikk.service';
import {HelysegService} from './helyseg/helyseg.service';
import {UgyfelService} from './ugyfel/ugyfel.service';
import {ParticioService} from './particio/particio.service';
import {VolumeService} from './volume/volume.service';
import {CsoportService} from './csoport/csoport.service';
import {FeliratkozasService} from './feliratkozas/feliratkozas.service';
import {PenztarService} from './penztar/penztar.service';
import { AfakulcsReszletekComponent } from './afakulcs/afakulcs-reszletek/afakulcs-reszletek.component';
import { TeendoReszletekComponent } from './teendo/teendo-reszletek/teendo-reszletek.component';
import { FizetesimodReszletekComponent } from './fizetesimod/fizetesimod-reszletek/fizetesimod-reszletek.component';
import { HelysegReszletekComponent } from './helyseg/helyseg-reszletek/helyseg-reszletek.component';
import { IrattipusReszletekComponent } from './irattipus/irattipus-reszletek/irattipus-reszletek.component';
import { MeReszletekComponent } from './me/me-reszletek/me-reszletek.component';
import { PenznemReszletekComponent } from './penznem/penznem-reszletek/penznem-reszletek.component';
import { TermekdijReszletekComponent } from './termekdij/termekdij-reszletek/termekdij-reszletek.component';
import { CikkReszletekComponent } from './cikk/cikk-reszletek/cikk-reszletek.component';
import { UgyfelReszletekComponent } from './ugyfel/ugyfel-reszletek/ugyfel-reszletek.component';
import { PenztartetelSzerkesztesComponent } from './penztar/penztartetel/penztartetel-szerkesztes/penztartetel-szerkesztes.component';
import { FeliratkozasReszletekComponent } from './feliratkozas/feliratkozas-reszletek/feliratkozas-reszletek.component';
import { NavexportellenorzesComponent } from './bizonylat/navexportellenorzes/navexportellenorzes.component';
import { IratReszletekComponent } from './irat/irat/irat-reszletek/irat-reszletek.component';
import { DokumentumReszletekComponent } from './irat/dokumentum/dokumentum-reszletek/dokumentum-reszletek.component';
import { VolumeReszletekComponent } from './volume/volume-reszletek/volume-reszletek.component';
import { ProjektReszletekComponent } from './projekt/projekt/projekt-reszletek/projekt-reszletek.component';
import { ProjektStatuszComponent } from './projekt/projekt/projekt-statusz/projekt-statusz.component';
import { ProjektSzamlazasirendEgyComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-egy/projekt-szamlazasirend-egy.component';
import { ProjektSzamlazasirendSzerkesztesComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-szerkesztes/projekt-szamlazasirend-szerkesztes.component';
import { ProjektSzamlazasirendTorlesComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-torles/projekt-szamlazasirend-torles.component';
import { ProjektSzamlazasirendReszletekComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-reszletek/projekt-szamlazasirend-reszletek.component';
import { ProjektTeendoEgyComponent } from './projekt/teendo/projekt-teendo-egy/projekt-teendo-egy.component';
import { ProjektTeendoSzerkesztesComponent } from './projekt/teendo/projekt-teendo-szerkesztes/projekt-teendo-szerkesztes.component';
import { ProjektTeendoTorlesComponent } from './projekt/teendo/projekt-teendo-torles/projekt-teendo-torles.component';
import { ProjektTeendoReszletekComponent } from './projekt/teendo/projekt-teendo-reszletek/projekt-teendo-reszletek.component';
import { ProjektTeendoElvegezveComponent } from './projekt/teendo/projekt-teendo-elvegezve/projekt-teendo-elvegezve.component';
import { ProjektBizonylatesiratUjbizonylatComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-ujbizonylat/projekt-bizonylatesirat-ujbizonylat.component';
import { ProjektBizonylatesiratUjiratComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-ujirat/projekt-bizonylatesirat-ujirat.component';
import { ProjektBizonylatesiratUjajanlatComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-ujajanlat/projekt-bizonylatesirat-ujajanlat.component';
import { VolumeContainerComponent } from './volume/volume-container/volume-container.component';
import { VolumeEgyComponent } from './volume/volume-egy/volume-egy.component';
import { VolumeListComponent } from './volume/volume-list/volume-list.component';
import { ParticioEgyComponent } from './particio/particio-egy/particio-egy.component';
import { HelysegContainerComponent } from './helyseg/helyseg-container/helyseg-container.component';
import { HelysegEgyComponent } from './helyseg/helyseg-egy/helyseg-egy.component';
import { HelysegListComponent } from './helyseg/helyseg-list/helyseg-list.component';
import { UgyfelContainerComponent } from './ugyfel/ugyfel-container/ugyfel-container.component';
import {UgyfelEgyComponent} from './ugyfel/ugyfel-egy/ugyfel-egy.component';
import { AfakulcsContainerComponent } from './afakulcs/afakulcs-container/afakulcs-container.component';
import { CikkContainerComponent } from './cikk/cikk-container/cikk-container.component';
import { MeContainerComponent } from './me/me-container/me-container.component';
import { TermekdijContainerComponent } from './termekdij/termekdij-container/termekdij-container.component';
import { FelhasznaloContainerComponent } from './felhasznalo/felhasznalo-container/felhasznalo-container.component';
import { FizetesimodContainerComponent } from './fizetesimod/fizetesimod-container/fizetesimod-container.component';
import { IrattipusContainerComponent } from './irattipus/irattipus-container/irattipus-container.component';
import { PenznemContainerComponent } from './penznem/penznem-container/penznem-container.component';
import { TeendoContainerComponent } from './teendo/teendo-container/teendo-container.component';
import { CsoportContainerComponent } from './csoport/csoport-container/csoport-container.component';
import { FeliratkozasContainerComponent } from './feliratkozas/feliratkozas-container/feliratkozas-container.component';
import {PenztartetelListComponent} from './penztar/penztartetel/penztartetel-list/penztartetel-list.component';
import {PenztarExportComponent} from './penztar/penztar-export/penztar-export.component';
import {PenztarReszletekComponent} from './penztar/penztar-reszletek/penztar-reszletek.component';
import {PenztarTorlesComponent} from './penztar/penztar-torles/penztar-torles.component';
import {PenztarSzerkesztesComponent} from './penztar/penztar-szerkesztes/penztar-szerkesztes.component';
import { PenztarContainerComponent } from './penztar/penztar-container/penztar-container.component';
import { PenztartetelContainerComponent } from './penztar/penztartetel/penztartetel-container/penztartetel-container.component';
import { IratContainerComponent } from './irat/irat/irat-container/irat-container.component';
import { DokumentumContainerComponent } from './irat/dokumentum/dokumentum-container/dokumentum-container.component';
import { ProjektContainerComponent } from './projekt/projekt/projekt-container/projekt-container.component';
import { ProjektSzamlazasirendContainerComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-container/projekt-szamlazasirend-container.component';
import { ProjektTeendoContainerComponent } from './projekt/teendo/projekt-teendo-container/projekt-teendo-container.component';
import { ProjektBizonylatesiratContainerComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-container/projekt-bizonylatesirat-container.component';
import {PenztartetelService} from './penztar/penztartetel/penztartetel.service';
import {BizonylatService} from './bizonylat/bizonylat.service';
import {RiportService} from './riport/riport.service';
import { ProjektBizonylatesiratLevalasztasComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-levalasztas/projekt-bizonylatesirat-levalasztas.component';

const routes: Routes = [
  {path: 'fooldal', component: FooldalComponent},

  // {path: 'irattipus-list', component: IrattipusListComponent, canActivate: [RoleGuard]},
  // {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'irattipus-egy', component: IrattipusEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: IrattipusReszletekComponent},
  //   {path: 'torles', component: IrattipusTorlesComponent},
  //   {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'irattipus', component: IrattipusContainerComponent, canActivate: [RoleGuard]},
  {path: 'teendo', component: TeendoContainerComponent, canActivate: [RoleGuard]},

  // {path: 'fizetesimod-list', component: FizetesimodListComponent, canActivate: [RoleGuard]},
  // {path: 'fizetesimoduj', component: FizetesimodSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'fizetesimod-egy', component: FizetesimodEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: FizetesimodReszletekComponent},
  //   {path: 'torles', component: FizetesimodTorlesComponent},
  //   {path: 'szerkesztes', component: FizetesimodSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'fizetesimod', component: FizetesimodContainerComponent, canActivate: [RoleGuard]},

  // {path: 'penznem-list', component: PenznemListComponent, canActivate: [RoleGuard]},
  // {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'penznem-egy', component: PenznemEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: PenznemReszletekComponent},
  //   {path: 'torles', component: PenznemTorlesComponent},
  //   {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'penznem', component: PenznemContainerComponent, canActivate: [RoleGuard]},

  // {path: 'cikk', component: CikkListComponent, canActivate: [RoleGuard]},
  // {path: 'cikkuj', component: CikkSzerkesztesComponent, canActivate: [RoleGuard], children: [
  //   {path: 'me', component: MeListComponent, canActivate: [RoleGuard]},
  //   {path: 'meuj', component: MeSzerkesztesComponent, canActivate: [RoleGuard]},
  //   {path: 'me-list-egy', component: MeEgyComponent, canActivate: [RoleGuard], children: [
  //     {path: 'torles', component: MeTorlesComponent},
  //     {path: 'szerkesztes', component: MeSzerkesztesComponent},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  //   {path: 'afakulcs', component: AfakulcsListComponent, canActivate: [RoleGuard]},
  //   {path: 'afakulcsuj', component: AfakulcsSzerkesztesComponent, canActivate: [RoleGuard]},
  //   {path: 'afakulcs-list-egy', component: AfakulcsEgyComponent, canActivate: [RoleGuard], children: [
  //     {path: 'reszletek', component: AfakulcsReszletekComponent},
  //     {path: 'torles', component: AfakulcsTorlesComponent},
  //     {path: 'szerkesztes', component: AfakulcsSzerkesztesComponent},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  //   {path: 'termekdij-list', component: TermekdijListComponent, canActivate: [RoleGuard]},
  //   {path: 'termekdijuj', component: TermekdijSzerkesztesComponent, canActivate: [RoleGuard]},
  //   {path: 'termekdij-list-egy', component: TermekdijEgyComponent, canActivate: [RoleGuard], children: [
  //     {path: 'reszletek', component: TermekdijReszletekComponent},
  //     {path: 'torles', component: TermekdijTorlesComponent},
  //     {path: 'szerkesztes', component: TermekdijSzerkesztesComponent},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  // {path: 'cikk-list-egy', component: CikkEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: CikkReszletekComponent},
  //   {path: 'torles', component: CikkTorlesComponent},
  //   {path: 'szerkesztes', component: CikkSzerkesztesComponent, children: [
  //     {path: 'me', component: MeListComponent, canActivate: [RoleGuard]},
  //     {path: 'meuj', component: MeSzerkesztesComponent, canActivate: [RoleGuard]},
  //     {path: 'me-list-egy', component: MeEgyComponent, canActivate: [RoleGuard], children: [
  //       {path: 'reszletek', component: MeReszletekComponent},
  //       {path: 'torles', component: MeTorlesComponent},
  //       {path: 'szerkesztes', component: MeSzerkesztesComponent},
  //       {path: 'blank', component: BlankComponent}
  //     ]},
  //     {path: 'afakulcs', component: AfakulcsListComponent, canActivate: [RoleGuard]},
  //     {path: 'afakulcsuj', component: AfakulcsSzerkesztesComponent, canActivate: [RoleGuard]},
  //     {path: 'afakulcs-list-egy', component: AfakulcsEgyComponent, canActivate: [RoleGuard], children: [
  //       {path: 'reszletek', component: AfakulcsReszletekComponent},
  //       {path: 'torles', component: AfakulcsTorlesComponent},
  //       {path: 'szerkesztes', component: AfakulcsSzerkesztesComponent},
  //       {path: 'blank', component: BlankComponent}
  //     ]},
  //     {path: 'termekdij-list', component: TermekdijListComponent, canActivate: [RoleGuard]},
  //     {path: 'termekdijuj', component: TermekdijSzerkesztesComponent, canActivate: [RoleGuard]},
  //     {path: 'termekdij-list-egy', component: TermekdijEgyComponent, canActivate: [RoleGuard], children: [
  //       {path: 'reszletek', component: TermekdijReszletekComponent},
  //       {path: 'torles', component: TermekdijTorlesComponent},
  //       {path: 'szerkesztes', component: TermekdijSzerkesztesComponent},
  //       {path: 'blank', component: BlankComponent}
  //     ]},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  //   {path: 'beszerzeskivet', component: CikkBeszerzesKivetComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'cikk', component: CikkContainerComponent, canActivate: [RoleGuard]},

  // {path: 'me', component: MeListComponent, canActivate: [RoleGuard]},
  // {path: 'meuj', component: MeSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'me-list-egy', component: MeEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: MeReszletekComponent},
  //   {path: 'torles', component: MeTorlesComponent},
  //   {path: 'szerkesztes', component: MeSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'me', component: MeContainerComponent, canActivate: [RoleGuard]},

  // {path: 'afakulcs', component: AfakulcsListComponent, canActivate: [RoleGuard]},
  // {path: 'afakulcsuj', component: AfakulcsSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'afakulcs-list-egy', component: AfakulcsEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: AfakulcsReszletekComponent},
  //   {path: 'torles', component: AfakulcsTorlesComponent},
  //   {path: 'szerkesztes', component: AfakulcsSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'afakulcs', component: AfakulcsContainerComponent, canActivate: [RoleGuard]},

  // {path: 'termekdij', component: TermekdijListComponent, canActivate: [RoleGuard]},
  // {path: 'termekdijuj', component: TermekdijSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'termekdij-list-egy', component: TermekdijEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: TermekdijReszletekComponent},
  //   {path: 'torles', component: TermekdijTorlesComponent},
  //   {path: 'szerkesztes', component: TermekdijSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'termekdij', component: TermekdijContainerComponent, canActivate: [RoleGuard]},


  // {path: 'helyseg', component: HelysegComponent, canActivate: [RoleGuard]},
  // {path: 'helyseguj', component: HelysegSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'helysegegy', component: HelysegegyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: HelysegReszletekComponent},
  //   {path: 'torles', component: HelysegTorlesComponent},
  //   {path: 'szerkesztes', component: HelysegSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'helyseg', component: HelysegContainerComponent, canActivate: [RoleGuard]},

  // {path: 'ugyfel-list', component: UgyfelComponent, canActivate: [RoleGuard]},
  // {path: 'ugyfeluj', component: UgyfelSzerkesztesComponent, canActivate: [RoleGuard], children: [
  //
  // ]},
  // {path: 'ugyfel-list-egy', component: UgyfelegyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: UgyfelReszletekComponent},
  //   {path: 'torles', component: UgyfelTorlesComponent},
  //   {path: 'szerkesztes', component: UgyfelSzerkesztesComponent, children: [
  //
  //   ]},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'ugyfel', component: UgyfelContainerComponent, canActivate: [RoleGuard]},

//   {path: 'projekt', component: ProjektListComponent, canActivate: [RoleGuard]},
//   {path: 'projektuj', component: ProjektSzerkesztesComponent},
//   {path: 'projekt-egy', component: ProjektEgyComponent, canActivate: [RoleGuard], children: [
//     {path: 'reszletek', component: ProjektReszletekComponent},
//     {path: 'torles', component: ProjektTorlesComponent},
//     {path: 'szerkesztes', component: ProjektSzerkesztesComponent},
//     {path: 'stsz', component: ProjektStatuszComponent},
//     {path: 'muszakiallapot', component: ProjektMuszakiallapotComponent},
//     {path: 'inverter', component: ProjektInverterComponent},
//     {path: 'napelem', component: ProjektNapelemComponent},
//     {path: 'iratminta', component: ProjektIratmintaComponent},
//     {path: 'bizonylatesirat', component: ProjektBizonylatesiratListComponent},
//     {path: 'bizonylatesiratujbizonylat', component: ProjektBizonylatesiratUjbizonylatComponent},
//     {path: 'bizonylatesiratujirat', component: ProjektBizonylatesiratUjiratComponent, children: [
//       {path: 'irattipus-list', component: IrattipusListComponent, canActivate: [RoleGuard]},
//       {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
//       {path: 'irattipus-egy', component: IrattipusEgyComponent, canActivate: [RoleGuard], children: [
//         {path: 'reszletek', component: IrattipusReszletekComponent},
//         {path: 'torles', component: IrattipusTorlesComponent},
//         {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
//         {path: 'blank', component: BlankComponent}
//       ]},
//       {path: 'blank', component: BlankComponent}
//     ]},
//     {path: 'bizonylatesiratujajanlat', component: ProjektBizonylatesiratUjajanlatComponent},
//     ///////////////////////////////
//     {path: 'szamlazasirend', component: ProjektSzamlazasirendListComponent},
//     {path: 'szamlazasirenduj', component: ProjektSzamlazasirendSzerkesztesComponent, children: [
//       {path: 'penznem', component: PenznemListComponent, canActivate: [RoleGuard]},
//       {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
//       {path: 'penznem-egy', component: PenznemEgyComponent, canActivate: [RoleGuard], children: [
//         {path: 'reszletek', component: PenznemReszletekComponent},
//         {path: 'torles', component: PenznemTorlesComponent},
//         {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
//         {path: 'blank', component: BlankComponent}
//       ]},
//       {path: 'blank', component: BlankComponent},
//     ]},
//     {path: 'szamlazasirendegy', component: ProjektSzamlazasirendEgyComponent, children: [
//       {path: 'reszletek', component: ProjektSzamlazasirendReszletekComponent},
//       {path: 'torles', component: ProjektSzamlazasirendTorlesComponent},
//       {path: 'szerkesztes', component: ProjektSzamlazasirendSzerkesztesComponent, children: [
//         {path: 'penznem', component: PenznemListComponent, canActivate: [RoleGuard]},
//         {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
//         {path: 'penznem-egy', component: PenznemEgyComponent, canActivate: [RoleGuard], children: [
//           {path: 'reszletek', component: PenznemReszletekComponent},
//           {path: 'torles', component: PenznemTorlesComponent},
//           {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
//           {path: 'blank', component: BlankComponent}
//         ]},
//         {path: 'blank', component: BlankComponent},
//       ]},
//       {path: 'blank', component: BlankComponent}
//     ]},
//     {path: 'projektteendo', component: ProjektTeendoListComponent},
//     {path: 'projektteendouj', component: ProjektTeendoSzerkesztesComponent, children: [
// //itt
//       {path: 'felhasznalo', component: FelhasznaloListComponent, canActivate: [RoleGuard]},
//       {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
//       {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
//         {path: 'reszletek', component: FelhasznaloReszletekComponent},
//         {path: 'torles', component: FelhasznaloTorlesComponent},
//         {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
//         {path: 'jelszo', component: FelhasznaloJelszoComponent},
//         {path: 'tevekenyseg', component: FelhasznaloTevekenysegComponent},
//         {path: 'blank', component: BlankComponent}
//       ]},
//       {path: 'teendo', component: TeendoListComponent, canActivate: [RoleGuard]},
//       {path: 'teendouj', component: TeendoSzerkesztesComponent, canActivate: [RoleGuard]},
//       {path: 'teendo-egy', component: TeendoEgyComponent, canActivate: [RoleGuard], children: [
//         {path: 'reszletek', component: TeendoReszletekComponent},
//         {path: 'torles', component: TeendoTorlesComponent},
//         {path: 'szerkesztes', component: TeendoSzerkesztesComponent},
//         {path: 'blank', component: BlankComponent}
//       ]},
//       {path: 'blank', component: BlankComponent}
// //itt
//     ]},
//     {path: 'blank', component: BlankComponent},
//     {path: 'projektteendoegy', component: ProjektTeendoEgyComponent, children: [
//       {path: 'reszletek', component: ProjektTeendoReszletekComponent},
//       {path: 'torles', component: ProjektTeendoTorlesComponent},
//       {path: 'szerkesztes', component: ProjektTeendoSzerkesztesComponent, children: [
// //itt
//         {path: 'felhasznalo', component: FelhasznaloListComponent, canActivate: [RoleGuard]},
//         {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
//         {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
//           {path: 'reszletek', component: FelhasznaloReszletekComponent},
//           {path: 'torles', component: FelhasznaloTorlesComponent},
//           {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
//           {path: 'jelszo', component: FelhasznaloJelszoComponent},
//           {path: 'tevekenyseg', component: FelhasznaloTevekenysegComponent},
//           {path: 'blank', component: BlankComponent}
//         ]},
//         {path: 'teendo', component: TeendoListComponent, canActivate: [RoleGuard]},
//         {path: 'teendouj', component: TeendoSzerkesztesComponent, canActivate: [RoleGuard]},
//         {path: 'teendo-egy', component: TeendoEgyComponent, canActivate: [RoleGuard], children: [
//           {path: 'reszletek', component: TeendoReszletekComponent},
//           {path: 'torles', component: TeendoTorlesComponent},
//           {path: 'szerkesztes', component: TeendoSzerkesztesComponent},
//           {path: 'blank', component: BlankComponent}
//         ]},
//         {path: 'blank', component: BlankComponent}
// //itt
//       ]},
//       {path: 'elvegezve', component: ProjektTeendoElvegezveComponent},
//       {path: 'blank', component: BlankComponent}
//     ]},
//     {path: 'blank', component: BlankComponent}
//   ]},
  {path: 'projekt', component: ProjektContainerComponent, canActivate: [RoleGuard]},

  // {path: 'irat-list', component: IratListComponent, canActivate: [RoleGuard]},
  // {path: 'iratuj', component: IratSzerkesztesComponent, canActivate: [RoleGuard], children: [
  //   {path: 'irattipus-list', component: IrattipusListComponent, canActivate: [RoleGuard]},
  //   {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
  //   {path: 'irattipus-egy', component: IrattipusEgyComponent, canActivate: [RoleGuard], children: [
  //     {path: 'reszletek', component: IrattipusReszletekComponent},
  //     {path: 'torles', component: IrattipusTorlesComponent},
  //     {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  // ]},
  // {path: 'irat-egy', component: IratEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: IratReszletekComponent},
  //   {path: 'torles', component: IratTorlesComponent},
  //   {path: 'szerkesztes', component: IratSzerkesztesComponent, children: [
  //     {path: 'irattipus-list', component: IrattipusListComponent},
  //     {path: 'irattipusuj', component: IrattipusSzerkesztesComponent, canActivate: [RoleGuard]},
  //     {path: 'irattipus-egy', component: IrattipusEgyComponent, canActivate: [RoleGuard], children: [
  //       {path: 'reszletek', component: IrattipusReszletekComponent},
  //       {path: 'torles', component: IrattipusTorlesComponent},
  //       {path: 'szerkesztes', component: IrattipusSzerkesztesComponent},
  //       {path: 'blank', component: BlankComponent}
  //     ]},
  //   ]},
  //   {path: 'dokumentum', component: DokumentumListComponent},
  //   {path: 'dokumentumfeltoltes', component: DokumentumFeltoltesComponent},
  //   {path: 'blank', component: BlankComponent},
  //   {path: 'dokumentumegy', component: DokumentumEgyComponent, children: [
  //     {path: 'torles', component: DokumentumTorlesComponent},
  //     {path: 'letoltes', component: DokumentumLetoltesComponent},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  // ]},
  {path: 'irat', component: IratContainerComponent, canActivate: [RoleGuard]},

  // {path: 'penztar-list', component: PenztarListComponent, canActivate: [RoleGuard]},
  // {path: 'penztaruj', component: PenztarSzerkesztesComponent, canActivate: [RoleGuard], children: [
  //   {path: 'penznem', component: PenznemListComponent, canActivate: [RoleGuard]},
  //   {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
  //   {path: 'penznem-egy', component: PenznemEgyComponent, canActivate: [RoleGuard], children: [
  //     {path: 'reszletek', component: PenznemReszletekComponent},
  //     {path: 'torles', component: PenznemTorlesComponent},
  //     {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
  //     {path: 'blank', component: BlankComponent}
  //   ]},
  //   {path: 'blank', component: BlankComponent},
  // ]},
  // {path: 'penztar-egy', component: PenztarEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: PenztarReszletekComponent},
  //   {path: 'torles', component: PenztarTorlesComponent},
  //   {path: 'szerkesztes', component: PenztarSzerkesztesComponent, children: [
  //     {path: 'penznem', component: PenznemListComponent, canActivate: [RoleGuard]},
  //     {path: 'penznemuj', component: PenznemSzerkesztesComponent, canActivate: [RoleGuard]},
  //     {path: 'penznem-egy', component: PenznemEgyComponent, canActivate: [RoleGuard], children: [
  //       {path: 'reszletek', component: PenznemReszletekComponent},
  //       {path: 'torles', component: PenznemTorlesComponent},
  //       {path: 'szerkesztes', component: PenznemSzerkesztesComponent},
  //       {path: 'blank', component: BlankComponent}
  //     ]},
  //     {path: 'blank', component: BlankComponent},
  //   ]},
  //   {path: 'tetelek', component: PenztartetelListComponent},
  //   {path: 'export', component: PenztarExportComponent},
  //   {path: 'tetelszerkesztes', component: PenztartetelSzerkesztesComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'penztar', component: PenztarContainerComponent, canActivate: [RoleGuard]},

  // {path: 'feliratkozas-list', component: FeliratkozasListComponent, canActivate: [RoleGuard]},
  // {path: 'feliratkozas-egy', component: FeliratkozasEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: FeliratkozasReszletekComponent},
  //   {path: 'projekt-list', component: FeliratkozasProjektComponent}
  // ]},
  {path: 'feliratkozas', component: FeliratkozasContainerComponent, canActivate: [RoleGuard]},

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

  // {path: 'particio', component: ParticioComponent, canActivate: [RoleGuard], children: [
  //   {path: 'szallito', component: ParticioSzallitoComponent},
  //   {path: 'nav', component: ParticioNavComponent},
  //   {path: 'smtp', component: ParticioSmtpComponent},
  //   {path: 'bizonylat', component: ParticioBizonylatComponent},
  //   {path: 'projekt-list', component: ParticioProjektComponent},
  //   {path: 'volume', component: ParticioVolumeComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},

  // {path: 'volume', component: VolumeComponent, canActivate: [RoleGuard]},
  // {path: 'volumeegy', component: VolumeegyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: VolumeReszletekComponent},
  //   {path: 'teszt', component: VolumeTesztComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},

  {path: 'particio', component: ParticioEgyComponent, canActivate: [RoleGuard]},
  {path: 'volume', component: VolumeContainerComponent, canActivate: [RoleGuard]},

  // {path: 'felhasznalo-list', component: FelhasznaloListComponent, canActivate: [RoleGuard]},
  // {path: 'felhasznalouj', component: FelhasznaloSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'felhasznaloegy', component: FelhasznaloEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: FelhasznaloReszletekComponent},
  //   {path: 'torles', component: FelhasznaloTorlesComponent},
  //   {path: 'szerkesztes', component: FelhasznaloSzerkesztesComponent},
  //   {path: 'jelszo', component: FelhasznaloJelszoComponent},
  //   {path: 'tevekenyseg', component: FelhasznaloTevekenysegComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'felhasznalo', component: FelhasznaloContainerComponent, canActivate: [RoleGuard]},

  // {path: 'csoport-list', component: CsoportListComponent, canActivate: [RoleGuard]},
  // {path: 'csoportuj', component: CsoportSzerkesztesComponent, canActivate: [RoleGuard]},
  // {path: 'csoport-egy', component: CsoportEgyComponent, canActivate: [RoleGuard], children: [
  //   {path: 'reszletek', component: CsoportReszletekComponent},
  //   {path: 'torles', component: CsoportTorlesComponent},
  //   {path: 'szerkesztes', component: CsoportSzerkesztesComponent},
  //   {path: 'felhasznalo', component: CsoportFelhasznaloComponent},
  //   {path: 'jog', component: CsoportJogComponent},
  //   {path: 'blank', component: BlankComponent}
  // ]},
  {path: 'csoport', component: CsoportContainerComponent, canActivate: [RoleGuard]},

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
    FelhasznaloListComponent,
    SzerepkorvalasztasComponent,
    JelszocsereComponent,
    ToolbarComponent,
    ToolbarfooterComponent,
    FelhasznaloEgyComponent,
    FelhasznaloTorlesComponent,
    FelhasznaloSzerkesztesComponent,
    FelhasznaloJelszoComponent,
    BlankComponent,
    ProjektListComponent,
    ProjektToolbarComponent,
    ProjektEgyComponent,
    ProjektSzerkesztesComponent,
    ProjektTorlesComponent,
    ProjektMuszakiallapotComponent,
    ProjektInverterComponent,
    ProjektNapelemComponent,
    ProjektIratmintaComponent,
    ProjektBizonylatesiratListComponent,
    ProjektSzamlazasirendListComponent,
    ProjektTeendoListComponent,
    IratListComponent,
    IratEgyComponent,
    IratToolbarComponent,
    DokumentumListComponent,
    DokumentumEgyComponent,
    IratSzerkesztesComponent,
    IratTorlesComponent,
    DokumentumFeltoltesComponent,
    DokumentumLetoltesComponent,
    DokumentumTorlesComponent,
    IrattipusListComponent,
    IrattipusEgyComponent,
    IrattipusSzerkesztesComponent,
    IrattipusTorlesComponent,
    HelysegSzerkesztesComponent,
    HelysegTorlesComponent,
    UgyfelTorlesComponent,
    UgyfelSzerkesztesComponent,
    CsoportListComponent,
    CsoportEgyComponent,
    CsoportSzerkesztesComponent,
    CsoportTorlesComponent,
    CsoportFelhasznaloComponent,
    CsoportJogComponent,
    VolumeTesztComponent,
    FeliratkozasListComponent,
    FeliratkozasEgyComponent,
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
    TeendoListComponent,
    FizetesimodListComponent,
    PenznemListComponent,
    CikkListComponent,
    MeListComponent,
    AfakulcsListComponent,
    TermekdijListComponent,
    AfakulcsEgyComponent,
    TermekdijEgyComponent,
    MeEgyComponent,
    CikkEgyComponent,
    PenznemEgyComponent,
    FizetesimodEgyComponent,
    TeendoEgyComponent,
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
    PenztarListComponent,
    PenztarEgyComponent,
    PenztarTorlesComponent,
    PenztarSzerkesztesComponent,
    FelhasznaloReszletekComponent,
    CsoportReszletekComponent,
    FelhasznaloTevekenysegComponent,
    PenztarReszletekComponent,
    PenztarExportComponent,
    PenztartetelListComponent,
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
    ProjektSzamlazasirendEgyComponent,
    ProjektSzamlazasirendSzerkesztesComponent,
    ProjektSzamlazasirendTorlesComponent,
    ProjektSzamlazasirendReszletekComponent,
    ProjektTeendoEgyComponent,
    ProjektTeendoSzerkesztesComponent,
    ProjektTeendoTorlesComponent,
    ProjektTeendoReszletekComponent,
    ProjektTeendoElvegezveComponent,
    ProjektBizonylatesiratUjbizonylatComponent,
    ProjektBizonylatesiratUjiratComponent,
    ProjektBizonylatesiratUjajanlatComponent,
    VolumeContainerComponent,
    VolumeEgyComponent,
    VolumeListComponent,
    ParticioEgyComponent,
    HelysegContainerComponent,
    HelysegEgyComponent,
    HelysegListComponent,
    UgyfelContainerComponent,
    UgyfelListComponent,
    UgyfelEgyComponent,
    AfakulcsContainerComponent,
    CikkContainerComponent,
    MeContainerComponent,
    TermekdijContainerComponent,
    FelhasznaloContainerComponent,
    FizetesimodContainerComponent,
    IrattipusContainerComponent,
    PenznemContainerComponent,
    TeendoContainerComponent,
    CsoportContainerComponent,
    FeliratkozasContainerComponent,
    PenztarContainerComponent,
    PenztartetelContainerComponent,
    IratContainerComponent,
    DokumentumContainerComponent,
    ProjektContainerComponent,
    ProjektSzamlazasirendContainerComponent,
    ProjektTeendoContainerComponent,
    ProjektBizonylatesiratContainerComponent,
    ProjektBizonylatesiratLevalasztasComponent,
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
    PenztartetelService,
    FeliratkozasService,

    BizonylatService,
    RiportService,

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
