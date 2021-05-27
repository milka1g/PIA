import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AdminComponent } from './admin/admin.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { StudentComponent } from './student/student.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { OdsekrtiComponent } from './odsekrti/odsekrti.component';
import { OdseksiComponent } from './odseksi/odseksi.component';
import { OdsekostaliComponent } from './odsekostali/odsekostali.component';
import { OdsekmasterComponent } from './odsekmaster/odsekmaster.component'
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UploadComponent } from './upload/upload.component';
import { PredmetComponent } from './predmet/predmet.component';
import { ProfilComponent } from './profil/profil.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { NaukaComponent } from './nauka/nauka.component';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { ProjektiNaukaComponent } from './projekti-nauka/projekti-nauka.component';
import { AzuriranjePredmetaComponent } from './azuriranje-predmeta/azuriranje-predmeta.component';
import { ZaposlenComponent } from './zaposlen/zaposlen.component';
import { BiranjeComponent } from './biranje/biranje.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { AzuriranjeObavestenjaComponent } from './azuriranje-obavestenja/azuriranje-obavestenja.component';
import { BrisanjeObavestenjaComponent } from './brisanje-obavestenja/brisanje-obavestenja.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PocetnaComponent,
    RegistracijaComponent,
    AdminComponent,
    ZaposleniComponent,
    StudentComponent,
    PromenaLozinkeComponent,
    OdsekrtiComponent,
    OdseksiComponent,
    OdsekostaliComponent,
    OdsekmasterComponent,
    UploadComponent,
    PredmetComponent,
    ProfilComponent,
    KontaktComponent,
    NaukaComponent,
    IstrazivanjaComponent,
    ProjektiNaukaComponent,
    AzuriranjePredmetaComponent,
    ZaposlenComponent,
    BiranjeComponent,
    ObavestenjaComponent,
    AzuriranjeObavestenjaComponent,
    BrisanjeObavestenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
