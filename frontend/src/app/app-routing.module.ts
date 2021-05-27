import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AzuriranjePredmetaComponent } from './azuriranje-predmeta/azuriranje-predmeta.component';
import { BiranjeComponent } from './biranje/biranje.component';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { LoginComponent } from './login/login.component';
import { NaukaComponent } from './nauka/nauka.component';
import { OdsekmasterComponent } from './odsekmaster/odsekmaster.component';
import { OdsekostaliComponent } from './odsekostali/odsekostali.component';
import { OdsekrtiComponent } from './odsekrti/odsekrti.component';
import { OdseksiComponent } from './odseksi/odseksi.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PredmetComponent } from './predmet/predmet.component';
import { ProfilComponent } from './profil/profil.component';
import { ProjektiNaukaComponent } from './projekti-nauka/projekti-nauka.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { StudentComponent } from './student/student.component';
import { ZaposlenComponent } from './zaposlen/zaposlen.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';

const routes: Routes = [
  {path:"",component:PocetnaComponent},
  {path:"registracija", component:RegistracijaComponent},
  {path:"admin", component:AdminComponent},
  {path:"zaposleni", component:ZaposleniComponent}, 
  {path:"student", component:PocetnaComponent},
  {path:"promena-lozinke", component:PromenaLozinkeComponent},
  {path:"odsekrti", component:OdsekrtiComponent},
  {path:"odseksi",component:OdseksiComponent},
  {path:"odsekostali", component:OdsekostaliComponent},
  {path:"odsekmaster",component:OdsekmasterComponent},
  {path:"predmet/:sifra", component:PredmetComponent},
  {path:"profil", component:ProfilComponent},
  {path:"kontakt",component:KontaktComponent},
  {path:"nauka",component:NaukaComponent},
  {path:"istrazivanja",component:IstrazivanjaComponent},
  {path:"projekti-nauka",component:ProjektiNaukaComponent},
  {path:"zaposlen/:username",component:ZaposlenComponent},
  {path:"biranje",component:BiranjeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
