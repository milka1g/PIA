import { Component, OnInit } from '@angular/core';
import { PlanAng } from '../model/planAng.model';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { PlanAngService } from '../services/plan-ang.service';
import { PredmetiService } from '../services/predmeti.service';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import {saveAs} from "file-saver";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(
    private userServis:UserService,
    private planAngServis:PlanAngService,
    private predmetiServis:PredmetiService,
    private uploadServis:UploadService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik

    if(this.tip!="Z")
    this.router.navigate(['']);

    //da dohvatis sve predmete na kojima je ang nastavnik da bi mogao da radis azuriranje za njih
    this.planAngServis.dohvatiSveZaNastavnika(this.user.username).subscribe((sve:PlanAng[])=>{
      this.planAngSvi = sve;

      //dohvatis sve predmete te fino i onda mozes lepo radis ko covek
      for(let i = 0; i<this.planAngSvi.length;i++){
        this.predmetiServis.dohvatiPredmetPoSifri(this.planAngSvi[i].sifra).subscribe((p:Predmet)=>{
          this.sviPredmeti[i] = p;
        // this.sviPredmetiZap.push(p); OVO NIJE ATOMICNO NE MOZE
          //alert("AAA");
        });

      }
    });
    this.uploadServis.downloadFile(this.user.username+".jpg").subscribe(blob=>{
      //saveAs(blob, this.user.username+".jpg");
      this.createImageFromBlob(blob);
      //this.slika = blob;
    })

  }

  loggedIn:boolean = false;
  tip:string;
  user:User;
  msgUpd:string;
  planAngSvi:PlanAng[];
  sviPredmeti:Predmet[] = [];
  slika:any;

  azurirajPodatke(){
    this.userServis.azurirajKorisnika(
      this.user.username, this.user.mail, this.user.password, this.user.pwchg, this.user.name,
      this.user.lastname, this.user.address, this.user.phone, this.user.title,
      this.user.office,this.user.status, this.user.picture, this.user.bio,
      this.user.website,this.user.type
      ).subscribe((ret)=>{
        this.msgUpd = "Uspesno ste izmenili podatke";
        this.userServis.dohvatiKorisnikaPoUsername(this.user.username).subscribe((u:User)=>{
          this.user = u;
          localStorage.setItem("user",JSON.stringify(u));
        })
        setTimeout(()=>{
          this.msgUpd = "";
        },2000)
      }) 
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.slika = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

 


}
