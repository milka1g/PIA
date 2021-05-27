import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { PlanAngService } from '../services/plan-ang.service';
import { PredmetiService } from '../services/predmeti.service';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private userService:UserService,
    private predmetService:PredmetiService,
    private planAngServis:PlanAngService,
    private uploadServis:UploadService,
    private router:Router
  ) { }

  
  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }

    if(this.loggedIn==true)
    this.tipk = this.user.type;
    else this.tipk="N"; //neregistrovan korisnik

    if(this.tipk!="A"){
      this.router.navigate(['']);
    }

    this.userService.dohvatiSveKorisnike().subscribe((kors:User[])=>{
      this.korisnici=kors;
      
      for(let i = 0;i<this.korisnici.length;i++){
        if(this.korisnici[i].title=="redovni profesor" || this.korisnici[i].title=="vanredni profesor" || this.korisnici[i].title=="docent" ||
        this.korisnici[i].title=="asistent" || this.korisnici[i].title=="saradnik u nastavi"){
          this.sviPredavaci.push(this.korisnici[i]);
        }
      }
      //alert(JSON.stringify(this.sviPredavaci));
    })


    this.predmetService.dohvatiSvePredmete().subscribe((preds:Predmet[])=>{
      this.predmeti = preds;
      //alert(JSON.stringify(this.predmeti));
     // alert(preds.length);
    })
    
  }

  loggedIn:boolean;
  user:User;
  korisnici:User[];
  predmeti:Predmet[];
  sviPredavaci:User[] = [];
  tipk:string;

///////// KORISNIK ////////////////
msgDodPred:string;
  //dodavanje korisnika
    username: string;
    mail: string;
    password: string;
    pwchg: number;
    name: string;
    lastname: string;
    address: string;
    phone: string;
    title: string;
    office: string;
    status: string;
    picture: string;
    bio: string;
    website: string;
    type: string;
    msgAdd:string;
    //izmena korisnika
    userUpdate:string;
    selectedUser:User;
    typeSelected:string;
    //izmena korisnika za 2way
    usernameS: string;
    mailS: string;
    passwordS: string;
    pwchgS: number;
    nameS: string;
    lastnameS: string;
    addressS: string;
    phoneS: string;
    titleS: string;
    officeS: string;
    statusS: string;
    pictureS: string;
    bioS: string;
    websiteS: string;
    typeS: string;
    msgUpdate:string = "";
    //brisanje korisnika
    userDelete:string;
    selectedUserDelete:User;
    msgDel:string="";

    ///////// PREDMET ////////
    //dodavanje predmeta
    naziv:string;
    tip:string;
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
    //
    predavanjaMat: Array<String>;
    vezbeMat: Array<String>;
    ispitniRokovi:Array<String>;
    laboratorija:Array<String>;
    //izmena predmeta 
    nazivS:string;
    tipS:string;
    odsekS:string;
    semestarS:number;
    godinaS:number;
    sifraS:string;
    fondS:string;
    espbS:number;
    ciljS:string;
    ishodS:string;
    predavanjaTermS: Array<String>;
    vezbeTermS:Array<String>;
    dodatnoS:string;
    //
    brojV:number;
    brojP:number;
    brojVS:number;
    brojPS:number;
    arrayP:Array<Number>;
    arrayV:Array<Number>;
    arrayPS:Array<Number>;
    arrayVS:Array<Number>;
    //
    predavanjaMatS: Array<String>;
    vezbeMatS: Array<String>;
    ispitniRokoviS:Array<String>;
    laboratorijaS:Array<String>;
    /////////////////////
    predmetUpdate:string; //sifra predmeta
    predmetSelected:Predmet;
    predmetDelete:string; //sifra premdeta
    msgDelPred:string;
    msgUpdPred:string;
    msgAddPred:string;

      //dodavanje u plan angazovanja
      predavacPA:string;
      grupaPA:string;
      sifraPA:string;

    /////////////DODAVANJE///////////////
    dodajKorisnika(){ 
      if(this.username==undefined || this.username=="" || this.type==undefined || this.type=="" || this.name=="" || this.name==undefined 
      || this.lastname=="" || this.lastname==undefined || this.status==undefined){
        this.msgAdd = "Morate popuniti polja sa *";
      }
      //mn170387d@student.etf.rs
        if(this.type=='S'){
          if(this.username.length!=24){
            this.msgAdd = "Neispravna dužina korisničkog imena za studenta";
            return;
          }
          let partmail = (this.lastname.charAt(0).toLowerCase()).concat((this.name.charAt(0)).toLowerCase()).concat(this.mail.substring(2,4)).concat(this.mail.substring(5,9)).concat(this.title);
          let partcheck = this.username.substring(0,9);
          if(partmail!=partcheck){
            this.msgAdd = "Neispravno korisničko ime za studenta";
            return;
          }
        }

        if(this.password.length<5){
          this.msgAdd = "Minimalna dužina lozinke je 5";
          return;
        }

        if(this.type=='Z' && (this.username==undefined || this.password==undefined || this.name==undefined || this.lastname==undefined
          || this.address==undefined || this.status==undefined || this.title==undefined || this.type==undefined)){
          this.msgAdd = "Morate popuniti polja sa *";
          return;
        } 
        if(this.type=='S' && (this.username==undefined || this.password==undefined || this.name==undefined || this.password==undefined || this.title==undefined || this.mail==undefined)){
          this.msgAdd = "Morate popuniti polja sa *";
          return;
        }

        if(this.type=='Z'){
          this.mail = this.username.concat("@etf.bg.ac.rs");
        }

        // if((this.type=='Z' && this.title!="redovni profesor") || (this.type=='Z' && this.title!="vanredni profesor")){
        //   if(this.office.length>0){
        //     this.msgAdd = "Nenastavno osoblje ne može imati kabinet";
        //     return;
        //   }
        // }
      this.pwchg = 0;
      this.userService.dodajKorisnika(
        this.username,
        this.mail,
        this.password,
        this.pwchg,
        this.name,
        this.lastname,
        this.address,
        this.phone,
        this.title,
        this.office,
        this.status,
        this.picture,
        this.bio,
        this.website,
        this.type
      ).subscribe((ret)=>{
        if(ret["por"]=="ok"){
          this.msgAdd = "Dodat novi korisnik";
        } else if(ret["por"]="not"){
          this.msgAdd = "Neuspešno dodavanje";
        } else if(ret["por"]=="dup"){
          this.msgAdd = "Već postoji korisnik sa tim korisničkim imenom";
        }
      })
    }

    ////////////////////////////

    /////BRISANJE//////
    izabranBrisanje(){
      this.userService.dohvatiKorisnikaPoUsername(this.userUpdate).subscribe((u:User)=>{
        this.selectedUserDelete = u;
      });
    }

    obrisiKorisnika(){
      this.userService.obrisiKorisnika(this.userDelete).subscribe((ret)=>{
        if(ret["por"]=="ok"){
          this.msgDel = "Brisanje uspešno";
        }
      })
    }

    //////////////////////////////
    ///////AZURIRANJE/////////
    azurirajKorisnika(){
      this.userService.azurirajKorisnika(
        this.usernameS,
        this.mailS,
        this.passwordS,
        this.pwchgS,
        this.nameS,
        this.lastnameS,
        this.addressS,
        this.phoneS,
        this.titleS,
        this.officeS,
        this.statusS,
        this.pictureS,
        this.bioS,
        this.websiteS,
        this.typeS
      ).subscribe((ret)=>{
        if(ret["por"]=="ok")
        this.msgUpdate = "Uspešno ste ažurirali korisnika";
      })
    }

    izabranKorisnik(){
      this.userService.dohvatiKorisnikaPoUsername(this.userUpdate).subscribe((u:User)=>{
        this.selectedUser = u;
        this.typeSelected = u.type;
        //
        this.usernameS = u.username;
      this.mailS = u.mail;
      this.passwordS = u.password;
      this.pwchgS = u.pwchg;
      this.nameS = u.name;
      this.lastnameS = u.lastname;
      this.addressS = u.address;
      this.phoneS = u.phone;
      this.titleS = u.title;
      this.officeS = u.office;
      this.statusS = u.status;
      this.pictureS = u.picture;
      this.bioS = u.bio;
      this.websiteS = u.website;
      this.typeS = u.type;
      });
    }
    /////////////////////////////////////////
    //////////DODAVANJE PREDMETA/////////////
    dodajPredmetAdmin(){
      if(this.naziv==undefined || this.sifra==undefined || this.tip==undefined || this.odsek==undefined|| this.semestar==undefined
        || this.godina==undefined || this.fond==undefined || this.espb==undefined || this.cilj==undefined || this.ishod==undefined
        || this.predavanjaTerm==undefined || this.vezbeTerm==undefined){
        this.msgAddPred = "Morate uneti sve podatke";
        return;
      }
      //provere da li si popunio sve kako valja

      this.predmetService.dodajPredmetAdmin(
        this.naziv,
        this.tip,
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
          this.msgAddPred = "Uspesno ste dodali predmet";
          this.predmetService.dohvatiSvePredmete().subscribe((preds:Predmet[])=>{
            this.predmeti = preds;
            //da ne radis reload ili menjas tab da bi dohvatioooo
          })
        } else if(ret["por"]=="not"){
          this.msgAddPred = "Greska prilikom dodavanja predmeta";
        } else if(ret["por"]=="dup"){
          this.msgAddPred = "Predmet sa tom sifrom vec postoji";
        }
      })
    }

    terminiInputs(){
      let p = parseInt(this.fond.charAt(0));
      let v = parseInt(this.fond.charAt(2));
      //da imas toliko predavanja i vezbi da dodas, kao sto je fond

      this.arrayP = new Array(p).fill(0);
      this.arrayV = new Array(v).fill(0);

      this.predavanjaTerm = new Array(p);
      this.vezbeTerm = new Array(v);
    }
    /////////////////////////////////////////
    ////////////AZURIRANJE PREDMETA//////////
    izabranPredmet(){
      this.predmetService.dohvatiPredmetPoSifri(this.predmetUpdate).subscribe((p:Predmet)=>{
        this.predmetSelected = p;
        //
        this.nazivS = p.naziv;
        this.tipS= p.tip;
        this.odsekS= p.odsek;
        this.semestarS= p.semestar;
        this.godinaS= p.godina;
        this.sifraS= p.sifra;
        this.fondS= p.fond;
        this.espbS= p.espb;
        this.ciljS= p.cilj;
        this.ishodS= p.ishod;
        //
        this.predavanjaTermS = p.predavanjaTerm;
        this.vezbeTermS = p.vezbeTerm;
        this.dodatnoS = p.dodatno;
        //
        this. predavanjaMatS = p.predavanjaMat;
        this.vezbeMatS = p.vezbeMat;
        this.ispitniRokoviS = p.ispitniRokovi;
        this.laboratorijaS = p.laboratorija;
        //3+2 -- Predavanja+Vezbe
        this.brojPS = parseInt(p.fond.charAt(0));
        this.brojVS = parseInt(p.fond.charAt(2));
        this.arrayPS = new Array(this.brojPS).fill(0);
        this.arrayVS = new Array(this.brojVS).fill(0);
      });
    }

    azurirajPredmet(){
      if(this.nazivS==undefined){
        this.msgUpdPred = "Morate izabrati predmet";
        return;
      }
      //alert(this.predavanjaTerm);
      this.predmetService.azurirajPredmetAdmin(
        this.nazivS,
        this.tipS,
        this.odsekS,
        this.semestarS,
        this.godinaS,
        this.sifraS,
        this.fondS,
        this.espbS,
        this.ciljS,
        this.ishodS,
        this.predavanjaTermS,
        this.vezbeTermS,
        this.dodatnoS
      ).subscribe((ret)=>{
        if(ret["por"]=="ok"){
          this.msgUpdPred = "Uspesno ste azurirali predmet";
        }
      })

    }

    terminiInputsSel(){
      let p = parseInt(this.fondS.charAt(0));
      let v = parseInt(this.fondS.charAt(2));
      //da imas toliko predavanja i vezbi da dodas, kao sto je fond
      this.arrayPS = new Array(p).fill(0);
      this.arrayVS = new Array(v).fill(0);
    }
    //////////////////////////////////////////
    //////////////BRISANJE PREDMETA///////////
    obrisiPredmet(){
      this.predmetService.obrisiPredmet(this.predmetDelete).subscribe((ret)=>{
        if(ret["por"]=="ok")
        this.msgDelPred = "Predmet uspešno obrisan";
        this.planAngServis.obrisiPredmetPlanAng(this.predmetDelete).subscribe(ret=>{
          //nista sve ok
        })
      })
    }
    //////////////////////////////////////////
    /////////DODAVANJE PREDAVACA///////////

    dodajPredavaca(){
      this.planAngServis.dodajUPlan(this.predavacPA, this.sifraPA,this.grupaPA).subscribe(r=>{
        this.msgDodPred = "Dodan predavac";
        location.reload();
      })
    }

    ////////////////////////////////////////
    ///////////UPLOAD SLIKE ZA ZAPOSLENOG////////////

    selectedFile: File
  upl:string="";
  filename:string;
  width:number;
  height:number;
  imga:any;

  
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    // alert(this.selectedFile.name)
    // alert(this.selectedFile.size)
    // alert(this.selectedFile.type)
  }

  onFileSelected(event){
    console.log(event);
    var res = this.selectedFile.name.split("."); //slika.jpg
    if(res[1]!="jpg")
      swal("Format slike mora biti JPG!","","error");
    //this.filename = this.selectedFile.name;
    this.filename = this.username + ".jpg";
    this.upl="";
  }

  onFileSelectedS(event){
    console.log(event);
    var res = this.selectedFile.name.split("."); //slika.jpg
    if(res[1]!="jpg")
      swal("Format slike mora biti JPG!","","error");
    //this.filename = this.selectedFile.name;
    this.filename = this.usernameS + ".jpg";
    this.upl="";
  }

  onUpload() {
      let uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.filename);
      //provera 300x300

      if(this.width<=300 && this.height<=300){
        this.uploadServis.uploadFile(uploadData, this.user.name, this.user.lastname)
          .subscribe(res=>{
            //console.log("USPEH:)");
            if(res["ret"]=="ok")
              this.upl="Uspesan upload";

          });
      } else {
        swal("Dimenzije slike moraju biti manje od 300x300","","error");
      }
  }

  onChange(fileInput: any) {
    const URL = window.URL || window.webkitURL;
    const Img = new Image();

    const filesToUpload = (fileInput.target.files);
    Img.src = URL.createObjectURL(filesToUpload[0]);

    Img.onload = (e: any) => {
      this.height = e.path[0].height;
      this.width = e.path[0].width;

      //alert(this.height);
     // alert(this.width);
  }
}

    //////////////////////////////////////////////////
}
