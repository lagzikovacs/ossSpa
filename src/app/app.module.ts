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
import { ProjektTeendoListComponent } from './projekt/projektteendo/projekt-teendo-list/projekt-teendo-list.component';
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
import { NavexportellenorzesComponent } from './navexportellenorzes/navexportellenorzes.component';
import { IratReszletekComponent } from './irat/irat/irat-reszletek/irat-reszletek.component';
import { DokumentumReszletekComponent } from './irat/dokumentum/dokumentum-reszletek/dokumentum-reszletek.component';
import { VolumeReszletekComponent } from './volume/volume-reszletek/volume-reszletek.component';
import { ProjektReszletekComponent } from './projekt/projekt/projekt-reszletek/projekt-reszletek.component';
import { ProjektStatuszComponent } from './projekt/projekt/projekt-statusz/projekt-statusz.component';
import { ProjektSzamlazasirendEgyComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-egy/projekt-szamlazasirend-egy.component';
import { ProjektSzamlazasirendSzerkesztesComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-szerkesztes/projekt-szamlazasirend-szerkesztes.component';
import { ProjektSzamlazasirendTorlesComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-torles/projekt-szamlazasirend-torles.component';
import { ProjektSzamlazasirendReszletekComponent } from './projekt/szamlazasirend/projekt-szamlazasirend-reszletek/projekt-szamlazasirend-reszletek.component';
import { ProjektTeendoEgyComponent } from './projekt/projektteendo/projekt-teendo-egy/projekt-teendo-egy.component';
import { ProjektTeendoSzerkesztesComponent } from './projekt/projektteendo/projekt-teendo-szerkesztes/projekt-teendo-szerkesztes.component';
import { ProjektTeendoTorlesComponent } from './projekt/projektteendo/projekt-teendo-torles/projekt-teendo-torles.component';
import { ProjektTeendoReszletekComponent } from './projekt/projektteendo/projekt-teendo-reszletek/projekt-teendo-reszletek.component';
import { ProjektTeendoElvegezveComponent } from './projekt/projektteendo/projekt-teendo-elvegezve/projekt-teendo-elvegezve.component';
import { ProjektBizonylatesiratUjbizonylatComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-ujbizonylat/projekt-bizonylatesirat-ujbizonylat.component';
import { ProjektBizonylatesiratUjiratComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-ujirat/projekt-bizonylatesirat-ujirat.component';
import { AjanlatComponent } from './projekt/ajanlat/ajanlat/ajanlat';
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
import { ProjektTeendoContainerComponent } from './projekt/projektteendo/projekt-teendo-container/projekt-teendo-container.component';
import { ProjektBizonylatesiratContainerComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-container/projekt-bizonylatesirat-container.component';
import {PenztartetelService} from './penztar/penztartetel/penztartetel.service';
import {BizonylatService} from './bizonylat/bizonylat.service';
import {RiportService} from './riport/riport.service';
import { ProjektBizonylatesiratLevalasztasComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-levalasztas/projekt-bizonylatesirat-levalasztas.component';
import { ProjektExportComponent } from './projekt/projekt/projekt-export/projekt-export.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { IratNincsprojektComponent } from './irat/irat/irat-nincsprojekt/irat-nincsprojekt.component';
import { AjanlatTetelComponent } from './projekt/ajanlat/ajanlat-tetel/ajanlat-tetel';
import { BizonylatContainerComponent } from './bizonylat/bizonylat-container/bizonylat-container.component';
import { BizonylatListComponent } from './bizonylat/bizonylat-list/bizonylat-list.component';
import { BizonylatEgyComponent } from './bizonylat/bizonylat-egy/bizonylat-egy.component';
import { BizonylattoolbarComponent } from './bizonylat/bizonylattoolbar/bizonylattoolbar.component';
import { BizonylattablaComponent } from './bizonylat/bizonylattabla/bizonylattabla.component';
import { BizonylatSzerkesztesComponent } from './bizonylat/bizonylat-szerkesztes/bizonylat-szerkesztes.component';
import { AdoszamellenorzesComponent } from './navexportellenorzes/adoszamellenorzes/adoszamellenorzes.component';
import { SzamlalekerdezesComponent } from './navexportellenorzes/szamlalekerdezes/szamlalekerdezes.component';
import { BizonylatKifizetesContainerComponent } from './bizonylat/bizonylatkifizetes/bizonylat-kifizetes-container/bizonylat-kifizetes-container.component';
import { BizonylatKifizetesListComponent } from './bizonylat/bizonylatkifizetes/bizonylat-kifizetes-list/bizonylat-kifizetes-list.component';
import { BizonylatKifizetesEgyComponent } from './bizonylat/bizonylatkifizetes/bizonylat-kifizetes-egy/bizonylat-kifizetes-egy.component';
import { BizonylatKifizetesSzerkesztesComponent } from './bizonylat/bizonylatkifizetes/bizonylat-kifizetes-szerkesztes/bizonylat-kifizetes-szerkesztes.component';
import { BizonylatNyomtatasComponent } from './bizonylat/bizonylat-nyomtatas/bizonylat-nyomtatas.component';
import { ProjektDatumokComponent } from './projekt/projekt/projekt-datumok/projekt-datumok.component';
import { BizonylatReszletekComponent } from './bizonylat/bizonylat-reszletek/bizonylat-reszletek.component';
import { BizonylatIratContainerComponent } from './bizonylat/bizonylatirat/bizonylat-irat-container/bizonylat-irat-container.component';
import { BizonylatIratListComponent } from './bizonylat/bizonylatirat/bizonylat-irat-list/bizonylat-irat-list.component';
import { BizonylatTorlesComponent } from './bizonylat/bizonylat-torles/bizonylat-torles.component';
import { BizonylatIratLevalasztasComponent } from './bizonylat/bizonylatirat/bizonylat-irat-levalasztas/bizonylat-irat-levalasztas.component';
import { BizonylatIratUjComponent } from './bizonylat/bizonylatirat/bizonylat-irat-uj/bizonylat-irat-uj.component';
import { BizonylatteteltablaComponent } from './bizonylat/bizonylatteteltabla/bizonylatteteltabla.component';
import { BizonylatafatablaComponent } from './bizonylat/bizonylatafatabla/bizonylatafatabla.component';
import { BizonylattermekdijtablaComponent } from './bizonylat/bizonylattermekdijtabla/bizonylattermekdijtabla.component';
import { BizonylatErrolComponent } from './bizonylat/bizonylat-errol/bizonylat-errol.component';
import { BizonylatKibocsatasComponent } from './bizonylat/bizonylat-kibocsatas/bizonylat-kibocsatas.component';
import { BizonylatStornoComponent } from './bizonylat/bizonylat-storno/bizonylat-storno.component';
import { BizonylatPenztarComponent } from './bizonylat/bizonylat-penztar/bizonylat-penztar.component';
import { BizonylatKifizetesrendbenComponent } from './bizonylat/bizonylat-kifizetesrendben/bizonylat-kifizetesrendben.component';
import { BizonylatKiszallitvaComponent } from './bizonylat/bizonylat-kiszallitva/bizonylat-kiszallitva.component';
import { BizonylatKifizetesReszletekComponent } from './bizonylat/bizonylatkifizetes/bizonylat-kifizetes-reszletek/bizonylat-kifizetes-reszletek.component';
import { BizonylatKifizetesTorlesComponent } from './bizonylat/bizonylatkifizetes/bizonylat-kifizetes-torles/bizonylat-kifizetes-torles.component';
import { BizonylatFormaiellenorzesComponent } from './bizonylat/bizonylat-formaiellenorzes/bizonylat-formaiellenorzes.component';
import { BizonylatOSNxmlComponent } from './bizonylat/bizonylat-osnxml/bizonylat-osnxml.component';
import { BoolHunPipe } from './pipes/boolhun.pipe';
import { BizonylatTetelSzerkesztesComponent } from './bizonylat/bizonylat-tetel-szerkesztes/bizonylat-tetel-szerkesztes.component';
import { BizonylatTetelTorlesComponent } from './bizonylat/bizonylat-tetel-torles/bizonylat-tetel-torles.component';
import { VagolapComponent } from './vagolap/vagolap.component';
import {VagolapService} from './vagolap/vagolap.service';
import { AbuComponent } from './tools/abu/abu.component';
import { BizonylatIratVagolaprolComponent } from './bizonylat/bizonylatirat/bizonylat-irat-vagolaprol/bizonylat-irat-vagolaprol.component';
import { ProjektBizonylatesiratVagolaprolComponent } from './projekt/bizonylatesirat/projekt-bizonylatesirat-vagolaprol/projekt-bizonylatesirat-vagolaprol.component';
import {AjanlatService} from './projekt/ajanlat/ajanlat.service';
import {IratmintaService} from './projekt/projekt/projekt-iratminta/iratminta.service';
import { EsemenynaploComponent } from './esemenynaplo/esemenynaplo.component';
import { UgyfelTerComponent } from './ugyfelter/ugyfel-ter/ugyfel-ter.component';
import { UgyfelTerLinkComponent } from './ugyfelter/ugyfel-ter-link/ugyfel-ter-link.component';
import {UgyfelterService} from "./ugyfelter/ugyfelter.service";
import { UgyfelProjektComponent } from './ugyfel/ugyfel-projekt/ugyfel-projekt.component';

const routes: Routes = [
  {path: 'fooldal', component: FooldalComponent},

  {path: 'irattipus', component: IrattipusContainerComponent, canActivate: [RoleGuard]},
  {path: 'teendo', component: TeendoContainerComponent, canActivate: [RoleGuard]},
  {path: 'fizetesimod', component: FizetesimodContainerComponent, canActivate: [RoleGuard]},
  {path: 'penznem', component: PenznemContainerComponent, canActivate: [RoleGuard]},
  {path: 'me', component: MeContainerComponent, canActivate: [RoleGuard]},
  {path: 'afakulcs', component: AfakulcsContainerComponent, canActivate: [RoleGuard]},
  {path: 'termekdij', component: TermekdijContainerComponent, canActivate: [RoleGuard]},
  {path: 'cikk', component: CikkContainerComponent, canActivate: [RoleGuard]},
  {path: 'helyseg', component: HelysegContainerComponent, canActivate: [RoleGuard]},
  {path: 'ugyfel', component: UgyfelContainerComponent, canActivate: [RoleGuard]},

  {path: 'projekt', component: ProjektContainerComponent, canActivate: [RoleGuard]},
  {path: 'irat', component: IratContainerComponent, canActivate: [RoleGuard]},
  {path: 'penztar', component: PenztarContainerComponent, canActivate: [RoleGuard]},
  {path: 'feliratkozas', component: FeliratkozasContainerComponent, canActivate: [RoleGuard]},

  {path: 'adoszamellenorzes', component: AdoszamellenorzesComponent, canActivate: [RoleGuard]},
  {path: 'bizonylat', children: [
    {path: 'dijbekero', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'elolegszamla', component: BizonylatContainerComponent, canActivate: [RoleGuard]},

    {path: 'szallito', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'szamla', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'megrendeles', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
    {path: 'bejovoszamla', component: BizonylatContainerComponent, canActivate: [RoleGuard]},
  ]},
  {path: 'navexportellenorzese', component: NavexportellenorzesComponent, canActivate: [RoleGuard]},
  {path: 'szamlalekerdezes', component: SzamlalekerdezesComponent, canActivate: [RoleGuard]},

  {path: 'riport', component: RiportComponent, canActivate: [RoleGuard], children: [
    {path: 'kimenoszamla', component: KimenoszamlaComponent},
    {path: 'bejovoszamla', component: BejovoszamlaComponent},
    {path: 'koveteles', component: KovetelesComponent},
    {path: 'tartozas', component: TartozasComponent},
    {path: 'beszerzes', component: BeszerzesComponent},
    {path: 'keszlet', component: KeszletComponent},
    {path: 'ngm', component: NgmComponent}
  ]},

  {path: 'particio', component: ParticioEgyComponent, canActivate: [RoleGuard]},
  {path: 'volume', component: VolumeContainerComponent, canActivate: [RoleGuard]},
  {path: 'felhasznalo', component: FelhasznaloContainerComponent, canActivate: [RoleGuard]},
  {path: 'csoport', component: CsoportContainerComponent, canActivate: [RoleGuard]},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'szerepkorvalasztas', component: SzerepkorvalasztasComponent, canActivate: [LoginGuard]},
  {path: 'jelszocsere', component: JelszocsereComponent, canActivate: [LoginGuard]},
  {path: 'vagolap', component: VagolapComponent, canActivate: [RoleGuard]},

  {path: 'ugyfelter', component: UgyfelTerComponent},

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
    AjanlatComponent,
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
    ProjektExportComponent,
    SpinnerComponent,
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
    BizonylatKifizetesContainerComponent,
    BizonylatKifizetesListComponent,
    BizonylatKifizetesEgyComponent,
    BizonylatKifizetesSzerkesztesComponent,
    BizonylatNyomtatasComponent,
    ProjektDatumokComponent,
    BizonylatReszletekComponent,
    BizonylatIratContainerComponent,
    BizonylatIratListComponent,
    BizonylatTorlesComponent,
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
    BizonylatKifizetesReszletekComponent,
    BizonylatKifizetesTorlesComponent,
    BizonylatFormaiellenorzesComponent,
    BizonylatOSNxmlComponent,
    BoolHunPipe,
    BizonylatTetelSzerkesztesComponent,
    BizonylatTetelTorlesComponent,
    VagolapComponent,
    AbuComponent,
    BizonylatIratVagolaprolComponent,
    ProjektBizonylatesiratVagolaprolComponent,
    EsemenynaploComponent,
    UgyfelTerComponent,
    UgyfelTerLinkComponent,
    UgyfelProjektComponent,
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
    UgyfelterService,

    ProjektService,
    AjanlatService,
    IratmintaService,
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
    VagolapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
