import { Component, Input, OnInit } from '@angular/core';
import { Fajl } from '../model/file.model';
import { PlanAng } from '../model/planAng.model';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { FileService } from '../services/file.service';
import { PlanAngService } from '../services/plan-ang.service';
import { PredmetiService } from '../services/predmeti.service';
import { UploadService } from '../services/upload.service';
import {saveAs as importedSaveAs} from "file-saver";
import { Router } from '@angular/router';
import  swal  from 'sweetalert';

@Component({
  selector: 'app-azuriranje-predmeta',
  templateUrl: './azuriranje-predmeta.component.html',
  styleUrls: ['./azuriranje-predmeta.component.css']
})
export class AzuriranjePredmetaComponent implements OnInit {
  @Input() rut:string;

  constructor(
    private planAngServis:PlanAngService,
    private predmetiService:PredmetiService,
    private fileServis:FileService, //ovo je samo za Fajlove u bazi 'fajlovi'
    private uploadServis:UploadService, //ovo koristis da uploadujes i skidas fajlove
    private router:Router
  ) { }

  ngOnInit(): void {
   // alert(this.rut);
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
     if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik

    if(this.tip=="N")
    this.router.navigate(['']);

    //da dohvatis sve predmete na kojima je ang nastavnik da bi mogao da radis azuriranje za njih
    this.planAngServis.dohvatiSveZaNastavnika(this.user.username).subscribe((sve:PlanAng[])=>{
      this.planAngSvi = sve;
      //alert(JSON.stringify(sve));
      for(let i = 0; i<this.planAngSvi.length;i++){
        this.predmetiService.dohvatiPredmetPoSifriIOdseku(this.planAngSvi[i].sifra, this.rut).subscribe((p:Predmet)=>{
         // alert(JSON.stringify(p));
          if(p!=null)
          this.sviPredmetiZap.push(p);
        });
        //alert(this.sviPredmetiZap.length);
      }
    });

    //e sad nisu svi za dati smer
  }

  sviPredmetiZap:Predmet[] = [];
  planAngSvi:PlanAng[];
  predmetUpdateSifra:string;
  predmetUpdate:Predmet;
  tab:number = 1;


  //PredavanjaMaterijali
  predavanjaFajlovi:Fajl[] = [];
  //VezbeMAterijali
  vezbeFajlovi:Fajl[] = [];
  //RokoviMaterijali
  rokoviFajlovi:Fajl[] = [];
  //LaboratorijaMAterijali
  labFajlovi:Fajl[] = [];
  //domaciFajlovi
  domaciFajlovi:Fajl[] = [];

  /////////azuriranje predmeta/////////
  naziv:string;
  tipP:string;
  odsek:string;
  semestar:number;
  godina:number;
  sifra:string;
  fond:string;
  espb:number;
  cilj:string;
  ishod:string;
  predavanjaTerm: Array<String>;
  vezbeTerm:Array<String>;
  dodatno:string;
  dodatnoLab:string;
  dodatnoDom:string;
  //
  predavanjaMat: Array<String>;
  vezbeMat: Array<String>;
  ispitniRokovi:Array<String>;
  laboratorija:Array<String>;
  domaci:Array<String>;

  ///deactact
  deacIspitna:number;
  deacLab:number;
  deacDomaci:number;

  arrayP:Array<Number>; //pomocni nizovi za predavanjaTerm i vezbeTerm
  arrayV:Array<Number>;
  msgUpdPred:string;
  /////////////////////

  user:User;
  tip:string;
  loggedIn:boolean;

  izabranPredmet(){
    this.predmetiService.dohvatiPredmetPoSifri(this.predmetUpdateSifra).subscribe((p:Predmet)=>{
      this.predmetUpdate = p;
      //alert(this.predmetUpdate.naziv);
      this.naziv = p.naziv;
      this.tipP= p.tip;
      this.odsek= p.odsek;
      this.semestar= p.semestar;
      this.godina= p.godina;
      this.sifra= p.sifra;
      this.fond= p.fond;
      this.espb= p.espb;
      this.cilj= p.cilj;
      this.ishod= p.ishod;
      //
      this.predavanjaTerm = p.predavanjaTerm;
      this.vezbeTerm = p.vezbeTerm;
      this.dodatno = p.dodatno;
      //
      this. predavanjaMat = p.predavanjaMat;
      this.vezbeMat = p.vezbeMat;
      this.ispitniRokovi = p.ispitniRokovi;
      this.laboratorija = p.laboratorija;
      this.dodatnoLab = p.dodatnoLab;
      this.dodatnoDom = p.dodatnoDom;
      this.domaci = p.domaci;
      this.deacDomaci = p.deacDomaci;
      this.deacLab = p.deacLab;
      this.deacIspitna = p.deacIspitna;
      this.terminiInputs();

      //dohvatanje fajlova u nizove sa materijalima
      this.predavanjaFajlovi = [];
      for(let i = 0; i<this.predavanjaMat.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.predavanjaMat[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.predavanjaFajlovi[i] = f;
          }
        })
      }

      this.vezbeFajlovi = [];
      for(let i = 0; i<this.vezbeMat.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.vezbeMat[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.vezbeFajlovi[i] = f;
          }
        })
      }
      this.rokoviFajlovi = [];
      for(let i = 0; i<this.ispitniRokovi.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.ispitniRokovi[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.rokoviFajlovi[i] = f;
          }
        })
      }

      this.labFajlovi = [];
      for(let i = 0; i<this.laboratorija.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.laboratorija[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.labFajlovi[i] = f;
          }
        })
      }

      this.domaciFajlovi = [];
      for(let i = 0; i<this.domaci.length;i++){
        this.fileServis.dohvatiFajlPoNazivu(this.domaci[i]).subscribe((f:Fajl)=>{
          if(f!=null){
            this.domaciFajlovi[i] = f;
          }
        })
      }

    })
  }

  azurirajPredmet(){
    if(this.predmetUpdate==undefined){
      swal("Greška!", "Morate izabrati predmet", "error");
    }

    this.predmetiService.azurirajPredmetAdmin(
      this.naziv,
      this.tipP,
      this.odsek,
      this.semestar,
      this.godina,
      this.sifra,
      this.fond,
      this.espb,
      this.cilj,
      this.ishod,
      this.predavanjaTerm,
      this.vezbeTerm,
      this.dodatno
    ).subscribe((ret)=>{
      if(ret["por"]=="ok"){
        this.msgUpdPred = "Uspesno ste azurirali predmet";
      }
    })
  }

  terminiInputs(){
    let p = parseInt(this.fond.charAt(0));
    let v = parseInt(this.fond.charAt(2));
    //da imas toliko predavanja i vezbi da dodas, kao sto je fond

    this.arrayP = new Array(p).fill(0);
    this.arrayV = new Array(v).fill(0);

    // this.predavanjaTerm = new Array(p);
    // this.vezbeTerm = new Array(v);
  }

  changeTab(num){
    this.tab = num;
  }

  downloadFile(filename){
    this.uploadServis.downloadFile(filename).subscribe(blob => {
      importedSaveAs(blob, filename);
    })
  }

  removeFile(filename,niz){
    if(niz=='P'){
      let index = this.predavanjaMat.indexOf(filename);
      if (index > -1) {
          this.predavanjaMat.splice(index, 1);
          this.predavanjaMat = this.predavanjaMat.slice();
          //alert(this.predavanjaMat);
        }
    } else if(niz=='V'){
      let index = this.vezbeMat.indexOf(filename);
      if (index > -1) {
          this.vezbeMat.splice(index, 1);
          this.vezbeMat = this.vezbeMat.slice(); //OVO CHECK JAKO
        }
    } else if(niz=='R'){
      let index = this.ispitniRokovi.indexOf(filename);
      if (index > -1) {
          this.ispitniRokovi.splice(index, 1);
          this.ispitniRokovi = this.ispitniRokovi.slice();
        }
    } else if(niz=='L'){
      let index = this.laboratorija.indexOf(filename);
      if (index > -1) {
          this.laboratorija.splice(index, 1);
          this.laboratorija = this.laboratorija.slice();
        }
    } else if(niz=='D'){
      let index = this.domaci.indexOf(filename);
      if (index > -1) {
          this.domaci.splice(index, 1);
          this.domaci = this.domaci.slice();
        }
    }
    //alert(this.predavanjaMat);
    this.azurirajPredmetCeo();
  }


  azurirajPredmetCeo(){
    this.predmetiService.azurirajPredmet(
      this.naziv,
      this.tipP,
      this.odsek,
      this.semestar,
      this.godina,
      this.sifra,
      this.fond,
      this.espb,
      this.cilj,
      this.ishod,
      this.predavanjaTerm,
      this.vezbeTerm,
      this.dodatno,
      this.predavanjaMat,
      this.vezbeMat,
      this.ispitniRokovi,
      this.laboratorija,
      this.dodatnoLab,
      this.domaci,
      this.dodatnoDom
    ).subscribe(ret=>{
      if(ret["por"]=="ok"){
        //nes
        //location.reload();
        swal("Predmet azuriran","","success");
        this.izabranPredmet();
        //alert("Uspesno ste azurirali predmet");
      }
    })
  }

  sortirajFajlove(){

    this.predavanjaFajlovi.sort((x,y)=>{
      if(x.prioritet<y.prioritet)return -1;
      if(x.prioritet>y.prioritet)return 1;
      if(x.prioritet==y.prioritet)return 0;
    })

    this.predavanjaMat = [];
    for(let i = 0; i<this.predavanjaFajlovi.length;i++){
      this.predavanjaMat[i] = this.predavanjaFajlovi[i].naziv;
    }

    this.vezbeFajlovi.sort((x,y)=>{
      if(x.prioritet<y.prioritet)return -1;
      if(x.prioritet>y.prioritet)return 1;
      if(x.prioritet==y.prioritet)return 0;
    })

    this.vezbeMat = [];
    for(let i = 0; i<this.vezbeFajlovi.length;i++){
      this.vezbeMat[i] = this.vezbeFajlovi[i].naziv;
    }

    this.labFajlovi.sort((x,y)=>{
      if(x.prioritet<y.prioritet)return -1;
      if(x.prioritet>y.prioritet)return 1;
      if(x.prioritet==y.prioritet)return 0;
    })

    this.laboratorija = [];
    for(let i = 0; i<this.labFajlovi.length;i++){
      this.laboratorija[i] = this.labFajlovi[i].naziv;
    }

    this.rokoviFajlovi.sort((x,y)=>{
      if(x.prioritet<y.prioritet)return -1;
      if(x.prioritet>y.prioritet)return 1;
      if(x.prioritet==y.prioritet)return 0;
    })

    this.ispitniRokovi = [];
      for(let i = 0; i<this.rokoviFajlovi.length;i++){
        this.ispitniRokovi[i] = this.rokoviFajlovi[i].naziv;
      }

      //dodato 
      this.domaciFajlovi.sort((x,y)=>{
        if(x.prioritet<y.prioritet)return -1;
        if(x.prioritet>y.prioritet)return 1;
        if(x.prioritet==y.prioritet)return 0;
      })

      this.domaci = [];
      for(let i = 0; i<this.domaciFajlovi.length;i++){
        this.domaci[i] = this.domaciFajlovi[i].naziv;
      }


      this.azurirajPredmetCeo();
      this.azurirajSveFajlove();

  }

  prioritetPlus(naziv,niz){

    if(niz=='P'){
      for(let i = 0; i<this.predavanjaFajlovi.length;i++){
        if(this.predavanjaFajlovi[i].naziv==naziv){
          this.predavanjaFajlovi[i].prioritet--;
        }
      }
    } else if(niz=='V'){
      for(let i = 0; i<this.vezbeFajlovi.length;i++){
        if(this.vezbeFajlovi[i].naziv==naziv){
          this.vezbeFajlovi[i].prioritet--;
        }
      }
    } else if(niz=='R'){
      for(let i = 0; i<this.rokoviFajlovi.length;i++){
        if(this.rokoviFajlovi[i].naziv==naziv){
          this.rokoviFajlovi[i].prioritet--;
        }
      }
    } else if(niz=='L'){
      for(let i = 0; i<this.labFajlovi.length;i++){
        if(this.labFajlovi[i].naziv==naziv){
          this.labFajlovi[i].prioritet--;
        }
      }
    } else if(niz=='D'){ //dodato
      for(let i = 0; i<this.domaciFajlovi.length;i++){
        if(this.domaciFajlovi[i].naziv==naziv){
          this.domaciFajlovi[i].prioritet--;
        }
      }
    }
    //alert(this.predavanjaFajlovi[0].prioritet);
    this.sortirajFajlove();
  }

  prioritetMinus(naziv,niz){
    if(niz=='P'){
      for(let i = 0; i<this.predavanjaFajlovi.length;i++){
        if(this.predavanjaFajlovi[i].naziv==naziv){
         // alert(this.predavanjaFajlovi[i].prioritet + " PRIO ");
          this.predavanjaFajlovi[i].prioritet++;
          //alert(this.predavanjaFajlovi[i].prioritet + " PRIO ");
        }
      }
    } else if(niz=='V'){
      for(let i = 0; i<this.vezbeFajlovi.length;i++){
        if(this.vezbeFajlovi[i].naziv==naziv){
          this.vezbeFajlovi[i].prioritet++;
        }
      }
    } else if(niz=='R'){
      for(let i = 0; i<this.rokoviFajlovi.length;i++){
        if(this.rokoviFajlovi[i].naziv==naziv){
          this.rokoviFajlovi[i].prioritet++;
        }
      }
    } else if(niz=='L'){
      for(let i = 0; i<this.labFajlovi.length;i++){
        if(this.labFajlovi[i].naziv==naziv){
          this.labFajlovi[i].prioritet++;
        }
      }
    } else if(niz=='D'){
      for(let i = 0; i<this.domaciFajlovi.length;i++){
        if(this.domaciFajlovi[i].naziv==naziv){
          this.domaciFajlovi[i].prioritet++;
        }
      }
    }
    this.sortirajFajlove();
  }

  azurirajSveFajlove(){
    //sluzi da kad azurira i listu u samom predmetu da azuriras i dokumente u 'fajlovi' tj njihove prioritete
    for(let i = 0; i<this.predavanjaFajlovi.length;i++){
      this.fileServis.azurirajPrioritet(this.predavanjaFajlovi[i].naziv,this.predavanjaFajlovi[i].prioritet).subscribe(ret=>{
        if(ret["por"]!="ok")
          swal("Greška","prioriteti predmeta by zaposleni", "error");
      });
    }

    for(let i = 0; i<this.vezbeFajlovi.length;i++){
      this.fileServis.azurirajPrioritet(this.vezbeFajlovi[i].naziv,this.vezbeFajlovi[i].prioritet).subscribe(ret=>{
        if(ret["por"]!="ok")
        swal("Greška","prioriteti predmeta by zaposleni", "error");
      });
    }

    for(let i = 0; i<this.rokoviFajlovi.length;i++){
      this.fileServis.azurirajPrioritet(this.rokoviFajlovi[i].naziv,this.rokoviFajlovi[i].prioritet).subscribe(ret=>{
        if(ret["por"]!="ok")
        swal("Greška","prioriteti predmeta by zaposleni", "error");
      });
    }

    for(let i = 0; i<this.labFajlovi.length;i++){
      this.fileServis.azurirajPrioritet(this.labFajlovi[i].naziv,this.labFajlovi[i].prioritet).subscribe(ret=>{
        if(ret["por"]!="ok")
        swal("Greška","prioriteti predmeta by zaposleni", "error");
      });
    }

    for(let i = 0; i<this.domaciFajlovi.length;i++){
      this.fileServis.azurirajPrioritet(this.domaciFajlovi[i].naziv,this.domaciFajlovi[i].prioritet).subscribe(ret=>{
        if(ret["por"]!="ok")
        swal("Greška","prioriteti predmeta by zaposleni", "error");
      });
    }
  }

  //////////UPLOADDDDDDDDD//////////////////

  selectedFile: File
  upl:string="";
  filename:string;

  
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    // alert(this.selectedFile.name)
    // alert(this.selectedFile.size)
    // alert(this.selectedFile.type)
  }

  onFileSelected(event){
    console.log(event);
    this.filename = this.selectedFile.name;
    this.upl="";
  }

  onUpload(niz) {
      // this.http is the injected HttpClient
      let uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
      this.uploadServis.uploadFile(uploadData, this.user.name, this.user.lastname)
        .subscribe(res=>{
          //console.log("USPEH:)");
          if(res["ret"]=="ok")
            this.upl="Uspesan upload";

          //u zavisnosti od parametra niz dodaj u odgovarajuci niz sa materijalima i azuriraj predmet 
          if(niz=='P'){
            this.predavanjaMat.push(this.filename);
          } else if(niz=='V'){
            this.vezbeMat.push(this.filename);
          } else if(niz=='R'){
            this.ispitniRokovi.push(this.filename);
          } else if(niz=='L'){
            this.laboratorija.push(this.filename);
          } else if(niz=='D'){
            this.domaci.push(this.filename);
          }
          this.azurirajPredmetCeo();

        });
  }

  //////////////////////////////////////////
  /////////////AKTIVACIJA DEAKTIVACIJA////////////

  aktivacija(tab){
    if(tab=='I'){
      this.deacIspitna = 0;
    } else if(tab=='L'){
      this.deacLab = 0;
    } else if(tab=='D'){
      this.deacDomaci = 0;
    }
    this.predmetiService.azurirajDeaktivacije(this.sifra,this.deacIspitna,this.deacLab,this.deacDomaci).subscribe(ret=>{
      if(ret["por"]=="ok"){
        // 
        swal("Uspeh", "Aktivirali ste odeljak", "success");
      }
    })
  }

  deaktivacija(tab){
    if(tab=='I'){
      this.deacIspitna = 1;
    } else if(tab=='L'){
      this.deacLab = 1;
    } else if(tab=='D'){
      this.deacDomaci = 1; 
    }
    this.predmetiService.azurirajDeaktivacije(this.sifra,this.deacIspitna,this.deacLab,this.deacDomaci).subscribe(ret=>{
      if(ret["por"]=="ok"){
        // 
        swal("Uspeh", "Deaktivirali ste odeljak", "success");
      }
    })
  }

  ////////////////////////////////////////////////


}
