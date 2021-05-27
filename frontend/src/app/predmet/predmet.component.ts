import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fajl } from '../model/file.model';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { FileService } from '../services/file.service';
import { PredmetiService } from '../services/predmeti.service';
import { UploadService } from '../services/upload.service';
import {saveAs as importedSaveAs} from "file-saver";
import { PlanAngService } from '../services/plan-ang.service';
import { PlanAng } from '../model/planAng.model';
import { UserService } from '../services/user.service';
import { ObavestenjeService } from '../services/obavestenje.service';
import { Obavestenje } from '../model/obavestenje.model';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit {

  //@Input() predmet:Predmet;

  constructor(
    private predmetService:PredmetiService,
    private route:ActivatedRoute,
    private fileServis:FileService,
    private uploadServis:UploadService,
    private planAngServis:PlanAngService,
    private userServis:UserService,
    private obavestenjaServis:ObavestenjeService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.sifra = this.route.snapshot.paramMap.get('sifra');
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
     if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik

    if(this.tip=="N"){
      this.router.navigate(['']);
    }

    this.predmetService.dohvatiPredmetPoSifri(this.sifra).subscribe((p:Predmet)=>{
      this.predmet = p;

      //dohvatanje fajlova u nizove sa materijalima
      this.predavanjaFajlovi = [];
      for(let i = 0; i<this.predmet.predavanjaMat.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.predmet.predavanjaMat[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.predavanjaFajlovi[i] = f;
          }
        })
      }

      this.vezbeFajlovi = [];
      for(let i = 0; i<this.predmet.vezbeMat.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.predmet.vezbeMat[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.vezbeFajlovi[i] = f;
          }
        })
      }
      this.rokoviFajlovi = [];
      for(let i = 0; i<this.predmet.ispitniRokovi.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.predmet.ispitniRokovi[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.rokoviFajlovi[i] = f;
          }
        })
      }

      this.labFajlovi = [];
      for(let i = 0; i<this.predmet.laboratorija.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.predmet.laboratorija[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.labFajlovi[i] = f;
          }
        })
      }

      this.domaciFajlovi = [];
      for(let i = 0; i<this.predmet.domaci.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.predmet.domaci[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.domaciFajlovi[i] = f;
          }
        })
      }
    })

    //da iz plana angazovanja dovuces za ovaj predmet sve usernameove profesora pa onda iz users da dovuces ime i prezime
    this.planAngServis.dohvatiSveZaPredmet(this.sifra).subscribe((p:PlanAng[])=>{
      this.sviPredavaciPlan = p;
      //alert(JSON.stringify(p));
      for(let i = 0; i<this.sviPredavaciPlan.length;i++){
        this.userServis.dohvatiKorisnikaPoUsername(this.sviPredavaciPlan[i].username).subscribe((p:User)=>{
          this.sviPredavaci[i] = p.name + " " + p.lastname + " - " +  this.sviPredavaciPlan[i].grupa;
          //name + " " + p.lastname);
        })
      }
    })
    

    //sva obavestenja za ovaj predmet
    this.obavestenjaServis.dohvatiSvaObavestenja().subscribe((obs:Obavestenje[])=>{
      this.svaObavestenja = obs;

      for(let i = 0; i<obs.length; i++){
        for(let j = 0; j<obs[i].predmeti.length;j++){
          if(this.sifra==obs[i].predmeti[j]){
            this.obavestenjaPredmeta.push(obs[i]);
          }
        }
      }
     // alert(JSON.stringify(this.obavestenjaPredmeta));
     //sortiranje 
     this.obavestenjaPredmeta.sort((x,y)=>{
       let d1 = new Date(x.datum);
       let d2 = new Date(y.datum);
       let v1 = d1.getTime();
       let v2 = d2.getTime();

       if(v1 < v2) return 1;
       if(v1 > v2) return -1;
       return 0;
     })

    //da vidis ono za 7 dana
     for(let i = 0; i<this.obavestenjaPredmeta.length;i++){
       let v1 = new Date(this.obavestenjaPredmeta[i].datum).getTime();
       let v2 = new Date().getTime();
       v2 = v2 - 7*24*60*60*1000; //ovo je danas - 7 dana znaci neki timestamp, ako je nas datum minus ovaj manje od 0 to je starije od 7 dana def
       if(v1-v2>0)
       this.obavestenjaPredmeta[i].sevendays = true;
       else 
       this.obavestenjaPredmeta[i].sevendays = false;
     }
   
    })

  }

  tip:string;
  loggedIn:boolean;
  user:User;
  sifra:string;
  predmet:Predmet;
  sviPredavaciPlan:PlanAng[];
  sviPredavaci:String[] = [];

  svaObavestenja:Obavestenje[];
  obavestenjaPredmeta:Obavestenje[] = [];

   //PredavanjaMaterijali
   predavanjaFajlovi:Fajl[] = [];
   //VezbeMAterijali
   vezbeFajlovi:Fajl[] = [];
   //RokoviMaterijali
   rokoviFajlovi:Fajl[] = [];
   //LaboratorijaMAterijali
   labFajlovi:Fajl[] = [];
   //Projekat/Domaci fajlovi
  domaciFajlovi:Fajl[] = [];

   downloadFile(filename){
    this.uploadServis.downloadFile(filename).subscribe(blob => {
      importedSaveAs(blob, filename);
    })
   }

  


}
