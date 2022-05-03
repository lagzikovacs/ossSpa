import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {environment} from '../environments/environment';
import {LogonService} from './05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {MenuService} from './navbar/menu/menu.service';
import {HttpClientModule} from '@angular/common/http';
import { BejelentkezesComponent } from './05 Segedeszkozok/05 Bejelentkezes/bejelentkezes/bejelentkezes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FelhasznaloListComponent } from './05 Segedeszkozok/03 Felhasznalo/felhasznalo-list/felhasznalo-list.component';
import {FelhasznaloService} from './05 Segedeszkozok/03 Felhasznalo/felhasznalo.service';
import {LoginGuard} from './guards/login.guard';
import {RoleGuard} from './guards/role.guard';
import { SzerepkorvalasztasComponent } from './05 Segedeszkozok/06 Szerepkorvalasztas/szerepkorvalasztas/szerepkorvalasztas.component';
import { JelszocsereComponent } from './05 Segedeszkozok/07 Jelszocsere/jelszocsere/jelszocsere.component';
import { ToolbarComponent } from './common/toolbar/toolbar.component';
import { ToolbarfooterComponent } from './common/toolbarfooter/toolbarfooter.component';
import {VerzioService} from './navbar/menu/verzio.service';
import {SessionService} from './session/session.service';
import {DateHunPipe} from './pipes/datehun.pipe';
import {DatetimeHunPipe} from './pipes/datetimehun.pipe';
import { FelhasznaloSzerkesztesComponent } from './05 Segedeszkozok/03 Felhasznalo/felhasznalo-szerkesztes/felhasznalo-szerkesztes.component';
import { FelhasznaloJelszoComponent } from './05 Segedeszkozok/03 Felhasznalo/felhasznalo-jelszo/felhasznalo-jelszo.component';
import { ProjektListComponent } from './projekt/projekt-list/projekt-list.component';
import { ProjektSzerkesztesComponent } from './02 Eszkozok/01 Projekt/projekt/projekt-szerkesztes/projekt-szerkesztes.component';
import {ProjektToolbarComponent} from './projekt/projekttoolbar/projekttoolbar.component';
import {ProjektService} from './02 Eszkozok/01 Projekt/projekt/projekt.service';
import { ProjektMuszakiallapotComponent } from './projekt/projekt-muszakiallapot/projekt-muszakiallapot.component';
import { ProjektIratmintaComponent } from './projekt/projekt-iratminta/projekt-iratminta.component';
import { ProjektkapcsolatListComponent } from './projektkapcsolat/projektkapcsolat-list/projektkapcsolat-list.component';
import { ProjektJegyzetListComponent } from './projektjegyzet/projekt-jegyzet-list/projekt-jegyzet-list.component';
import { IratListComponent } from './irat/irat-list/irat-list.component';
import { IratEgyComponent } from './irat/irat-egy/irat-egy.component';
import {IratToolbarComponent} from './irat/irattolbar/irattoolbar.component';
import { DokumentumListComponent } from './02 Eszkozok/02 Irat/dokumentum/dokumentum-list/dokumentum-list.component';
import {IratService} from './02 Eszkozok/02 Irat/irat/irat.service';
import {DokumentumService} from './02 Eszkozok/02 Irat/dokumentum/dokumentum.service';
import { IratSzerkesztesComponent } from './02 Eszkozok/02 Irat/irat/irat-szerkesztes/irat-szerkesztes.component';
import { DokumentumFeltoltesComponent } from './02 Eszkozok/02 Irat/dokumentum/dokumentum-feltoltes/dokumentum-feltoltes.component';
import { IrattipusListComponent } from './01 Torzsadatok/01 Irattipus/irattipus-list/irattipus-list.component';
import { IrattipusSzerkesztesComponent } from './01 Torzsadatok/01 Irattipus/irattipus-szerkesztes/irattipus-szerkesztes.component';
import { HelysegSzerkesztesComponent } from './01 Torzsadatok/07 Helyseg/helyseg-szerkesztes/helyseg-szerkesztes.component';
import { UgyfelListComponent } from './01 Torzsadatok/09 Ugyfel/ugyfel-list/ugyfel-list.component';
import { UgyfelSzerkesztesComponent } from './01 Torzsadatok/09 Ugyfel/ugyfel-szerkesztes/ugyfel-szerkesztes.component';
import { CsoportListComponent } from './05 Segedeszkozok/04 Csoport/csoport-list/csoport-list.component';
import { CsoportSzerkesztesComponent } from './05 Segedeszkozok/04 Csoport/csoport-szerkesztes/csoport-szerkesztes.component';
import { CsoportFelhasznaloComponent } from './05 Segedeszkozok/04 Csoport/csoport-felhasznalo/csoport-felhasznalo.component';
import { CsoportJogComponent } from './05 Segedeszkozok/04 Csoport/csoport-jog/csoport-jog.component';
import { VolumeTesztComponent } from './05 Segedeszkozok/02 Volume/volume-teszt/volume-teszt.component';
import { AjanlatkeresListComponent } from './02 Eszkozok/04 Ajanlatkeres/ajanlatkeres-list/ajanlatkeres-list.component';
import { ProjektEmailalapjanComponent } from './projekt/projekt-emailalapjan/projekt-emailalapjan.component';
import { ProjektTablaComponent } from './projekt/projekttabla/projekt-tabla.component';
import { RiportComponent } from './04 Riportok/riport/riport.component';
import { KimenoszamlaComponent } from './04 Riportok/01 Kimenoszamla/kimenoszamla.component';
import { BejovoszamlaComponent } from './04 Riportok/02 Bejovoszamla/bejovoszamla.component';
import { KovetelesComponent } from './04 Riportok/03 Kovetelesek/koveteles.component';
import { TartozasComponent } from './04 Riportok/04 Tartozasok/tartozas.component';
import { BeszerzesComponent } from './04 Riportok/05 Beszerzes/beszerzes.component';
import { KeszletComponent } from './04 Riportok/06 Keszlet/keszlet.component';
import { NgmComponent } from './04 Riportok/07 Ngm/ngm.component';
import { ParticioBizonylatComponent } from './05 Segedeszkozok/01 Particio/particio-bizonylatnyomtatas/particio-bizonylatnyomtatas.component';
import { ParticioProjektiratmintaComponent } from './05 Segedeszkozok/01 Particio/particio-projektiratminta/particio-projektiratminta.component';
import { ParticioVolumeComponent } from './05 Segedeszkozok/01 Particio/particio-volume/particio-volume.component';
import { FizetesimodListComponent } from './01 Torzsadatok/02 Fizetesimod/fizetesimod-list/fizetesimod-list.component';
import { PenznemListComponent } from './01 Torzsadatok/03 Penznem/penznem-list/penznem-list.component';
import { CikkListComponent } from './01 Torzsadatok/06 Cikk/cikk-list/cikk-list.component';
import { MeListComponent } from './01 Torzsadatok/04 Mennyisegiegyseg/me-list/me-list.component';
import { AfakulcsListComponent } from './01 Torzsadatok/05 Afakulcs/afakulcs-list/afakulcs-list.component';
import { TermekdijListComponent } from './01 Torzsadatok/051 Termekdij/termekdij-list/termekdij-list.component';
import { TermekdijSzerkesztesComponent } from './01 Torzsadatok/051 Termekdij/termekdij-szerkesztes/termekdij-szerkesztes.component';
import { AfakulcsSzerkesztesComponent } from './01 Torzsadatok/05 Afakulcs/afakulcs-szerkesztes/afakulcs-szerkesztes.component';
import { MeSzerkesztesComponent } from './01 Torzsadatok/04 Mennyisegiegyseg/me-szerkesztes/me-szerkesztes.component';
import { CikkSzerkesztesComponent } from './01 Torzsadatok/06 Cikk/cikk-szerkesztes/cikk-szerkesztes.component';
import { FizetesimodSzerkesztesComponent } from './01 Torzsadatok/02 Fizetesimod/fizetesimod-szerkesztes/fizetesimod-szerkesztes.component';
import { PenznemSzerkesztesComponent } from './01 Torzsadatok/03 Penznem/penznem-szerkesztes/penznem-szerkesztes.component';
import { CikkBeszerzesKivetComponent } from './01 Torzsadatok/06 Cikk/cikk-beszerzes-kivet/cikk-beszerzes-kivet.component';
import { PenztarListComponent } from './02 Eszkozok/03 Penztar/penztar/penztar-list/penztar-list.component';
import {IrattipusService} from './01 Torzsadatok/01 Irattipus/irattipus.service';
import {FizetesimodService} from './01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import {PenznemService} from './01 Torzsadatok/03 Penznem/penznem.service';
import {MeService} from './01 Torzsadatok/04 Mennyisegiegyseg/me.service';
import {AfakulcsService} from './01 Torzsadatok/05 Afakulcs/afakulcs.service';
import {TermekdijService} from './01 Torzsadatok/051 Termekdij/termekdij.service';
import {CikkService} from './01 Torzsadatok/06 Cikk/cikk.service';
import {HelysegService} from './01 Torzsadatok/07 Helyseg/helyseg.service';
import {UgyfelService} from './01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {ParticioService} from './05 Segedeszkozok/01 Particio/particio.service';
import {VolumeService} from './05 Segedeszkozok/02 Volume/volume.service';
import {CsoportService} from './05 Segedeszkozok/04 Csoport/csoport.service';
import {AjanlatkeresService} from './02 Eszkozok/04 Ajanlatkeres/ajanlatkeres.service';
import {PenztarService} from './02 Eszkozok/03 Penztar/penztar/penztar.service';
import { PenztartetelSzerkesztesComponent } from './02 Eszkozok/03 Penztar/penztartetel/penztartetel-szerkesztes/penztartetel-szerkesztes.component';
import { ProjektStatuszComponent } from './projekt/projekt-statusz/projekt-statusz.component';
import { ProjektJegyzetSzerkesztesComponent } from './projektjegyzet/projekt-jegyzet-szerkesztes/projekt-jegyzet-szerkesztes.component';
import { ProjektkapcsolatUjbizonylatComponent } from './projektkapcsolat/projektkapcsolat-ujbizonylat/projektkapcsolat-ujbizonylat.component';
import { AjanlatComponent } from './ajanlat/ajanlat/ajanlat';
import { VolumeListComponent } from './05 Segedeszkozok/02 Volume/volume-list/volume-list.component';
import { ParticioEgyComponent } from './05 Segedeszkozok/01 Particio/particio-egy/particio-egy.component';
import { HelysegListComponent } from './01 Torzsadatok/07 Helyseg/helyseg-list/helyseg-list.component';
import {PenztartetelListComponent} from './02 Eszkozok/03 Penztar/penztartetel/penztartetel-list/penztartetel-list.component';
import {PenztarExportComponent} from './02 Eszkozok/03 Penztar/penztar/penztar-export/penztar-export.component';
import {PenztarSzerkesztesComponent} from './02 Eszkozok/03 Penztar/penztar/penztar-szerkesztes/penztar-szerkesztes.component';
import {PenztartetelService} from './02 Eszkozok/03 Penztar/penztartetel/penztartetel.service';
import {BizonylatService} from './bizonylat/bizonylat.service';
import {RiportService} from './04 Riportok/riport.service';
import { ProjektkapcsolatLevalasztasComponent } from './projektkapcsolat/projektkapcsolat-levalasztas/projektkapcsolat-levalasztas.component';
import { ProjektExportComponent } from './projekt/projekt-export/projekt-export.component';
import { AjanlatTetelComponent } from './ajanlat/ajanlat-tetel/ajanlat-tetel';
import { BizonylatListComponent } from './bizonylat/bizonylat-list/bizonylat-list.component';
import { BizonylatEgyComponent } from './bizonylat/bizonylat-egy/bizonylat-egy.component';
import { BizonylattoolbarComponent } from './bizonylat/bizonylattoolbar/bizonylattoolbar.component';
import { BizonylattablaComponent } from './bizonylat/bizonylattabla/bizonylattabla.component';
import { BizonylatSzerkesztesComponent } from './bizonylat/bizonylat-szerkesztes/bizonylat-szerkesztes.component';
import { KifizetesListComponent } from './kifizetes/kifizetes-list/kifizetes-list.component';
import { KifizetesSzerkesztesComponent } from './kifizetes/kifizetes-szerkesztes/kifizetes-szerkesztes.component';
import { BizonylatNyomtatasComponent } from './bizonylatnyomtatas/bizonylat-nyomtatas/bizonylat-nyomtatas.component';
import { BizonylatReszletekComponent } from './bizonylat/bizonylat-reszletek/bizonylat-reszletek.component';
import { BizonylatkapcsolatListComponent } from './bizonylatkapcsolat/bizonylatkapcsolat-list/bizonylatkapcsolat-list.component';
import { BizonylatkapcsolatLevalasztasComponent } from './bizonylatkapcsolat/bizonylatkapcsolat-levalasztas/bizonylatkapcsolat-levalasztas.component';
import { BizonylatteteltablaComponent } from './bizonylat/bizonylatteteltabla/bizonylatteteltabla.component';
import { BizonylatafatablaComponent } from './bizonylat/bizonylatafatabla/bizonylatafatabla.component';
import { BizonylattermekdijtablaComponent } from './bizonylat/bizonylattermekdijtabla/bizonylattermekdijtabla.component';
import { BizonylatErrolComponent } from './bizonylat/bizonylat-errol/bizonylat-errol.component';
import { BizonylatKibocsatasComponent } from './bizonylat/bizonylat-kibocsatas/bizonylat-kibocsatas.component';
import { BizonylatStornoComponent } from './bizonylat/bizonylat-storno/bizonylat-storno.component';
import { BizonylatPenztarComponent } from './bizonylat/bizonylat-penztar/bizonylat-penztar.component';
import { BizonylatKifizetesrendbenComponent } from './bizonylat/bizonylat-kifizetesrendben/bizonylat-kifizetesrendben.component';
import { BizonylatKiszallitvaComponent } from './bizonylat/bizonylat-kiszallitva/bizonylat-kiszallitva.component';
import { BoolHunPipe } from './pipes/boolhun.pipe';
import { VagolapComponent } from './05 Segedeszkozok/08 Vagolap/vagolap/vagolap.component';
import {VagolapService} from './05 Segedeszkozok/08 Vagolap/vagolap.service';
import { BizonylatkapcsolatVagolaprolComponent } from './bizonylatkapcsolat/bizonylatkapcsolat-vagolaprol/bizonylatkapcsolat-vagolaprol.component';
import { ProjektkapcsolatVagolaprolComponent } from './projektkapcsolat/projektkapcsolat-vagolaprol/projektkapcsolat-vagolaprol.component';
import {AjanlatService} from './02 Eszkozok/01 Projekt/ajanlat/ajanlat.service';
import {IratmintaService} from './projekt/projekt-iratminta/iratminta.service';
import { EsemenynaploComponent } from './05 Segedeszkozok/03 Felhasznalo/esemenynaplo/esemenynaplo.component';
import { UgyfelterComponent } from './ext/ugyfelter/ugyfelter/ugyfelter.component';
import {UgyfelterService} from './ext/ugyfelter/ugyfelter.service';
import { UgyfelProjektComponent } from './01 Torzsadatok/09 Ugyfel/ugyfel-projekt/ugyfel-projekt.component';
import { UgyfelterlogComponent } from './02 Eszkozok/07 Ugyfelterlog/ugyfelterlog/ugyfelterlog.component';
import {UgyfelterlogService} from './02 Eszkozok/07 Ugyfelterlog/ugyfelterlog.service';
import { FotozasComponent } from './ext/fotozas/fotozas/fotozas.component';
import { FotozasLinkComponent } from './02 Eszkozok/02 Irat/fotozas-link/fotozas-link.component';
import { UgyfelterBizonylatesiratComponent } from './ext/ugyfelter/ugyfelter-bizonylatesirat/ugyfelter-bizonylatesirat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UgyfelterDokumentumComponent } from './ext/ugyfelter/ugyfelter-dokumentum/ugyfelter-dokumentum.component';
import { TetelTorlesComponent } from './common/tetel-torles/tetel-torles.component';
import { ReszletekComponent } from './common/reszletek/reszletek.component';
import { UgyfeltoolbarComponent } from './01 Torzsadatok/09 Ugyfel/ugyfeltoolbar/ugyfeltoolbar.component';
import { UgyfelCsoportComponent } from './01 Torzsadatok/09 Ugyfel/ugyfel-csoport/ugyfel-csoport.component';
import { UgyfelVcardComponent } from './01 Torzsadatok/09 Ugyfel/ugyfel-vcard/ugyfel-vcard.component';
import { UgyfelTablaComponent } from './01 Torzsadatok/09 Ugyfel/ugyfel-tabla/ugyfel-tabla.component';
import { TablaComponent } from './common/tabla/tabla.component';
import {StartupService} from './05 Segedeszkozok/06 Szerepkorvalasztas/startup.service';
import {ErrorService} from './common/errorbox/error.service';
import { ErrorboxComponent } from './common/errorbox/errorbox.component';
import { UgyfelterProjektTablaComponent } from './ext/ugyfelter/ugyfelter-projekt-tabla/ugyfelter-projekt-tabla.component';
import { ProjektkapcsolatTablaComponent } from './projektkapcsolat/projektkapcsolat-tabla/projektkapcsolat-tabla.component';
import { BizonylatkapcsolatTablaComponent } from './bizonylatkapcsolat/bizonylatkapcsolat-tabla/bizonylatkapcsolat-tabla.component';
import {BizonylattetelSzerkesztesComponent} from './03 Bizonylatok/bizonylattetel/bizonylattetel-szerkesztes/bizonylattetel-szerkesztes.component';
import { AjanlatTablaComponent } from './ajanlat/ajanlat-tabla/ajanlat-tabla.component';
import { HscrollDirective } from './directives/divhscroll.directive';
import {SpinnerDirective} from './directives/spinner.directive';
import { ParticioEmailComponent } from './05 Segedeszkozok/01 Particio/particio-email/particio-email.component';
import {TevekenysegService} from './01 Torzsadatok/08 Tevekenyseg/tevekenyseg.service';
import {TevekenysegSzerkesztesComponent} from './01 Torzsadatok/08 Tevekenyseg/tevekenyseg-szerkesztes/tevekenyseg-szerkesztes.component';
import {TevekenysegListComponent} from './01 Torzsadatok/08 Tevekenyseg/tevekenyseg-list/tevekenyseg-list.component';
import { BizonylatFuvarszamlaComponent } from './bizonylat/bizonylat-fuvarszamla/bizonylat-fuvarszamla.component';
import { BizonylatFuvarszamlaUjComponent } from './bizonylat/bizonylat-fuvarszamla/bizonylat-fuvarszamla-uj/bizonylat-fuvarszamla-uj.component';
import { BizonylatFuvarszamlaTorlesComponent } from './bizonylat/bizonylat-fuvarszamla/bizonylat-fuvarszamla-torles/bizonylat-fuvarszamla-torles.component';
import { BizonylatZoomComponent } from './bizonylat/bizonylat-zoom/bizonylat-zoom.component';
import { DokumentumLetoltesComponent } from './02 Eszkozok/02 Irat/dokumentum/dokumentum-letoltes/dokumentum-letoltes.component';
import { DokumentumLetoltesPdfComponent } from './02 Eszkozok/02 Irat/dokumentum/dokumentum-letoltes-pdf/dokumentum-letoltes-pdf.component';
import { DokumentumNezetComponent } from './02 Eszkozok/02 Irat/dokumentum/dokumentum-nezet/dokumentum-nezet.component';
import { VagolapIrathozComponent } from './05 Segedeszkozok/08 Vagolap/vagolap-irathoz/vagolap-irathoz.component';
import { VagolapBizonylathozComponent } from './05 Segedeszkozok/08 Vagolap/vagolap-bizonylathoz/vagolap-bizonylathoz.component';
import { IratProjektjeComponent } from './irat/irat-projektje/irat-projektje.component';
import { BizonylatProjektjeComponent } from './bizonylat/bizonylat-projektje/bizonylat-projektje.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import {HibabejelentesListComponent} from './02 Eszkozok/06 Hibabejelentes/hibabejelentes-list/hibabejelentes-list.component';
import { AjanlatkeresSzerkesztesComponent } from './02 Eszkozok/04 Ajanlatkeres/ajanlatkeres-szerkesztes/ajanlatkeres-szerkesztes.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import {FelmeresListComponent} from './02 Eszkozok/05 Felmeres/felmeres-list/felmeres-list.component';
import { HibabejelentesSzerkesztesComponent } from './02 Eszkozok/06 Hibabejelentes/hibabejelentes-szerkesztes/hibabejelentes-szerkesztes.component';
import { FelmeresSzerkesztesComponent } from './02 Eszkozok/05 Felmeres/felmeres-szerkesztes/felmeres-szerkesztes.component';
import {ProjekthezRendelesComponent} from './projekt/projekthez-rendeles/projekthez-rendeles.component';
import { EgyszeruUzenetComponent } from './common/egyszeru-uzenet/egyszeru-uzenet.component';
import { FelmeresJelentesComponent } from './02 Eszkozok/05 Felmeres/felmeres-jelentes/felmeres-jelentes.component';
import { EgyszeruKerdesUzenetComponent } from './common/egyszeru-kerdes-uzenet/egyszeru-kerdes-uzenet.component';
import { HibabejelentesJelentesComponent } from './02 Eszkozok/06 Hibabejelentes/hibabejelentes-jelentes/hibabejelentes-jelentes.component';
import { TelepitesiDokumentumokKivalasztasaComponent } from './02 Eszkozok/06 Hibabejelentes/telepitesi-dokumentumok-kivalasztasa/telepitesi-dokumentumok-kivalasztasa.component';
import { ProjektTelepitesiDokumentumokKivalasztasaComponent } from './02 Eszkozok/06 Hibabejelentes/projekt-telepitesi-dokumentumok-kivalasztasa/projekt-telepitesi-dokumentumok-kivalasztasa.component';
import { SzerelesitervComponent } from './szerelesiterv/szerelesiterv.component';
import {PrimitivEgyToolbarComponent} from './common/primitiv-egy-toolbar/primitiv-egy-toolbar.component';
import {FelhasznaloEgyToolbarComponent} from './05 Segedeszkozok/03 Felhasznalo/felhasznalo-egy-toolbar/felhasznalo-egy-toolbar.component';
import {TablaExComponent} from './common/tabla-ex/tabla-ex.component';
import {FelhasznaloEgyComponent} from './05 Segedeszkozok/03 Felhasznalo/felhasznalo-egy/felhasznalo-egy.component';
import {IrattipusEgyComponent} from './01 Torzsadatok/01 Irattipus/irattipus-egy/irattipus-egy.component';
import {FizetesimodEgyComponent} from './01 Torzsadatok/02 Fizetesimod/fizetesimod-egy/fizetesimod-egy.component';
import {PenznemEgyComponent} from './01 Torzsadatok/03 Penznem/penznem-egy/penznem-egy.component';
import {MeEgyComponent} from './01 Torzsadatok/04 Mennyisegiegyseg/me-egy/me-egy.component';
import {AfakulcsEgyComponent} from './01 Torzsadatok/05 Afakulcs/afakulcs-egy/afakulcs-egy.component';
import {HelysegEgyComponent} from './01 Torzsadatok/07 Helyseg/helyseg-egy/helyseg-egy.component';
import {TevekenysegEgyComponent} from './01 Torzsadatok/08 Tevekenyseg/tevekenyseg-egy/tevekenyseg-egy.component';
import {TermekdijEgyComponent} from './01 Torzsadatok/051 Termekdij/termekdij-egy/termekdij-egy.component';
import {ModalComponent} from './common/modal/modal.component';
import {ModalService} from './common/modal/modal.service';
import {CikkEgyToolbarComponent} from './01 Torzsadatok/06 Cikk/cikk-egy-toolbar/cikk-egy-toolbar.component';
import {CikkEgyComponent} from './01 Torzsadatok/06 Cikk/cikk-egy/cikk-egy.component';
import {UgyfelEgyComponent} from './01 Torzsadatok/09 Ugyfel/ugyfel-egy/ugyfel-egy.component';
import {UgyfelEgyToolbarComponent} from './01 Torzsadatok/09 Ugyfel/ugyfel-egy-toolbar/ugyfel-egy-toolbar.component';
import {UgyfelterLinkComponent} from './01 Torzsadatok/09 Ugyfel/ugyfelter-link/ugyfelter-link.component';
import {BizonylattetelService} from './03 Bizonylatok/bizonylattetel/bizonylattetel.service';
import {ParticioKibocsatoComponent} from "./05 Segedeszkozok/01 Particio/particio-kibocsato/particio-kibocsato.component";
import {VolumeEgyComponent} from "./05 Segedeszkozok/02 Volume/volume-egy/volume-egy.component";
import {CsoportEgyToolbarComponent} from "./05 Segedeszkozok/04 Csoport/csoport-egy-toolbar/csoport-egy-toolbar.component";
import {CsoportEgyComponent} from "./05 Segedeszkozok/04 Csoport/csoport-egy/csoport-egy.component";
import {PenztarEgyToolbarComponent} from "./02 Eszkozok/03 Penztar/penztar/penztar-egy-toolbar/penztar-egy-toolbar.component";
import {PenztarEgyComponent} from "./02 Eszkozok/03 Penztar/penztar/penztar-egy/penztar-egy.component";
import {HibabejelentesEgyComponent} from "./02 Eszkozok/06 Hibabejelentes/hibabejelentes-egy/hibabejelentes-egy.component";
import {HibabejelentesEgyToolbarComponent} from "./02 Eszkozok/06 Hibabejelentes/hibabejelentes-egy-toolbar/hibabejelentes-egy-toolbar.component";
import {DokumentumEgyToolbarComponent} from "./02 Eszkozok/02 Irat/dokumentum/dokumentum-egy-toolbar/dokumentum-egy-toolbar.component";
import {DokumentumEgyComponent} from "./02 Eszkozok/02 Irat/dokumentum/dokumentum-egy/dokumentum-egy.component";
import {AjanlatkeresEgyToolbarComponent} from "./02 Eszkozok/04 Ajanlatkeres/ajanlatkeres-egy-toolbar/ajanlatkeres-egy-toolbar.component";
import {FelmeresEgyToolbarComponent} from "./02 Eszkozok/05 Felmeres/felmeres-egy-toolbar/felmeres-egy-toolbar.component";
import {AjanlatkeresEgyComponent} from "./02 Eszkozok/04 Ajanlatkeres/ajanlatkeres-egy/ajanlatkeres-egy.component";
import {FelmeresEgyComponent} from "./02 Eszkozok/05 Felmeres/felmeres-egy/felmeres-egy.component";

const routes: Routes = [
  {path: 'irattipus', component: IrattipusListComponent, canActivate: [RoleGuard]},
  {path: 'fizetesimod', component: FizetesimodListComponent, canActivate: [RoleGuard]},
  {path: 'penznem', component: PenznemListComponent, canActivate: [RoleGuard]},
  {path: 'me', component: MeListComponent, canActivate: [RoleGuard]},
  {path: 'afakulcs', component: AfakulcsListComponent, canActivate: [RoleGuard]},
  {path: 'termekdij', component: TermekdijListComponent, canActivate: [RoleGuard]},
  {path: 'cikk', component: CikkListComponent, canActivate: [RoleGuard]},
  {path: 'helyseg', component: HelysegListComponent, canActivate: [RoleGuard]},
  {path: 'tevekenyseg', component: TevekenysegListComponent, canActivate: [RoleGuard]},
  {path: 'ugyfel', component: UgyfelListComponent, canActivate: [RoleGuard]},

  {path: 'ajanlatkeres', component: AjanlatkeresListComponent, canActivate: [RoleGuard]},
  {path: 'felmeres', component: FelmeresListComponent, canActivate: [RoleGuard]},
  {path: 'projekt', component: ProjektListComponent, canActivate: [RoleGuard]},
  {path: 'szerelesiterv', component: SzerelesitervComponent, canActivate: [RoleGuard]},
  {path: 'penztar', component: PenztarListComponent, canActivate: [RoleGuard]},
  {path: 'hibabejelentes', component: HibabejelentesListComponent, canActivate: [RoleGuard]},
  {path: 'irat', component: IratListComponent, canActivate: [RoleGuard]},
  {path: 'ugyfelterlog', component: UgyfelterlogComponent, canActivate: [RoleGuard]},

  {path: 'bizonylat', children: [
    {path: 'dijbekero', component: BizonylatListComponent, canActivate: [RoleGuard]},
    {path: 'elolegszamla', component: BizonylatListComponent, canActivate: [RoleGuard]},

    {path: 'szallito', component: BizonylatListComponent, canActivate: [RoleGuard]},
    {path: 'szamla', component: BizonylatListComponent, canActivate: [RoleGuard]},
    {path: 'megrendeles', component: BizonylatListComponent, canActivate: [RoleGuard]},
    {path: 'bejovoszamla', component: BizonylatListComponent, canActivate: [RoleGuard]},
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

  {path: 'particio', component: ParticioEgyComponent, canActivate: [RoleGuard]},
  {path: 'volume', component: VolumeListComponent, canActivate: [RoleGuard]},
  {path: 'felhasznalo', component: FelhasznaloListComponent, canActivate: [RoleGuard]},
  {path: 'csoport', component: CsoportListComponent, canActivate: [RoleGuard]},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'szerepkorvalasztas', component: SzerepkorvalasztasComponent, canActivate: [LoginGuard]},
  {path: 'jelszocsere', component: JelszocsereComponent, canActivate: [LoginGuard]},
  {path: 'vagolap', component: VagolapComponent, canActivate: [RoleGuard]},

  {path: 'fooldal', component: FooldalComponent, canActivate: [LoginGuard]},

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
    BoolHunPipe,

    AppComponent,
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
    ProjektSzerkesztesComponent,
    ProjektMuszakiallapotComponent,
    ProjektIratmintaComponent,
    ProjektkapcsolatListComponent,
    ProjektJegyzetListComponent,
    IratListComponent,
    IratEgyComponent,
    IratToolbarComponent,
    DokumentumListComponent,
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
    ProjektEmailalapjanComponent,
    ProjektTablaComponent,
    RiportComponent,
    KimenoszamlaComponent,
    BejovoszamlaComponent,
    KovetelesComponent,
    TartozasComponent,
    BeszerzesComponent,
    KeszletComponent,
    NgmComponent,
    ParticioKibocsatoComponent,
    ParticioBizonylatComponent,
    ParticioProjektiratmintaComponent,
    ParticioVolumeComponent,
    FizetesimodListComponent,
    PenznemListComponent,
    CikkListComponent,
    MeListComponent,
    AfakulcsListComponent,
    TermekdijListComponent,
    TermekdijSzerkesztesComponent,
    TevekenysegListComponent,
    TevekenysegSzerkesztesComponent,
    AfakulcsSzerkesztesComponent,
    MeSzerkesztesComponent,
    CikkSzerkesztesComponent,
    FizetesimodSzerkesztesComponent,
    PenznemSzerkesztesComponent,
    CikkBeszerzesKivetComponent,
    PenztarListComponent,
    PenztarSzerkesztesComponent,
    PenztarExportComponent,
    PenztartetelListComponent,
    PenztartetelSzerkesztesComponent,
    ProjektStatuszComponent,
    ProjektJegyzetSzerkesztesComponent,
    ProjektkapcsolatUjbizonylatComponent,
    AjanlatComponent,
    VolumeListComponent,
    ParticioEgyComponent,
    HelysegListComponent,
    UgyfelListComponent,
    ProjektkapcsolatLevalasztasComponent,
    ProjektExportComponent,
    AjanlatTetelComponent,
    BizonylatListComponent,
    BizonylatEgyComponent,
    BizonylattoolbarComponent,
    BizonylattablaComponent,
    BizonylatSzerkesztesComponent,
    KifizetesListComponent,
    KifizetesSzerkesztesComponent,
    BizonylatNyomtatasComponent,
    BizonylatReszletekComponent,
    BizonylatkapcsolatListComponent,
    BizonylatkapcsolatLevalasztasComponent,
    BizonylatteteltablaComponent,
    BizonylatafatablaComponent,
    BizonylattermekdijtablaComponent,
    BizonylatErrolComponent,
    BizonylatKibocsatasComponent,
    BizonylatStornoComponent,
    BizonylatPenztarComponent,
    BizonylatKifizetesrendbenComponent,
    BizonylatKiszallitvaComponent,
    BizonylattetelSzerkesztesComponent,
    VagolapComponent,
    BizonylatkapcsolatVagolaprolComponent,
    ProjektkapcsolatVagolaprolComponent,
    EsemenynaploComponent,
    UgyfelterComponent,
    UgyfelterLinkComponent,
    UgyfelProjektComponent,
    UgyfelterlogComponent,
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
    UgyfelterProjektTablaComponent,
    ProjektkapcsolatTablaComponent,
    BizonylatkapcsolatTablaComponent,
    AjanlatTablaComponent,
    HscrollDirective,
    SpinnerDirective,
    AutofocusDirective,
    ParticioEmailComponent,
    BizonylatFuvarszamlaComponent,
    BizonylatFuvarszamlaUjComponent,
    BizonylatFuvarszamlaTorlesComponent,
    BizonylatZoomComponent,
    DokumentumLetoltesComponent,
    DokumentumLetoltesPdfComponent,
    DokumentumNezetComponent,
    VagolapIrathozComponent,
    VagolapBizonylathozComponent,
    IratProjektjeComponent,
    BizonylatProjektjeComponent,
    FooldalComponent,
    NavbarComponent,
    HibabejelentesListComponent,
    AjanlatkeresSzerkesztesComponent,
    FelmeresListComponent,
    HibabejelentesSzerkesztesComponent,
    FelmeresSzerkesztesComponent,
    ProjekthezRendelesComponent,
    EgyszeruUzenetComponent,
    FelmeresJelentesComponent,
    EgyszeruKerdesUzenetComponent,
    HibabejelentesJelentesComponent,
    TelepitesiDokumentumokKivalasztasaComponent,
    ProjektTelepitesiDokumentumokKivalasztasaComponent,
    SzerelesitervComponent,
    PrimitivEgyToolbarComponent,
    FelhasznaloEgyToolbarComponent,
    TablaExComponent,
    FelhasznaloEgyComponent,
    IrattipusEgyComponent,
    FizetesimodEgyComponent,
    PenznemEgyComponent,
    MeEgyComponent,
    AfakulcsEgyComponent,
    HelysegEgyComponent,
    TevekenysegEgyComponent,
    TermekdijEgyComponent,
    ModalComponent,
    CikkEgyToolbarComponent,
    CikkEgyComponent,
    UgyfelEgyComponent,
    UgyfelEgyToolbarComponent,
    VolumeEgyComponent,
    CsoportEgyToolbarComponent,
    CsoportEgyComponent,
    PenztarEgyToolbarComponent,
    PenztarEgyComponent,
    HibabejelentesEgyComponent,
    HibabejelentesEgyToolbarComponent,
    DokumentumEgyToolbarComponent,
    DokumentumEgyComponent,
    AjanlatkeresEgyToolbarComponent,
    FelmeresEgyToolbarComponent,
    AjanlatkeresEgyComponent,
    FelmeresEgyToolbarComponent,
    FelmeresEgyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
  ],
  exports: [
    DatetimeHunPipe,
    DateHunPipe,
  ],
  providers: [
    LoginGuard,
    RoleGuard,

    IrattipusService,
    FizetesimodService,
    PenznemService,
    MeService,
    AfakulcsService,
    TermekdijService,
    TevekenysegService,
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
    BizonylattetelService,
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

    ModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
