import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fajl } from '../model/file.model';
import { Obavestenje } from '../model/obavestenje.model';
import { PlanAng } from '../model/planAng.model';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { ObavestenjeService } from '../services/obavestenje.service';
import { PlanAngService } from '../services/plan-ang.service';
import { PredmetiService } from '../services/predmeti.service';
import { UploadService } from '../services/upload.service';
import  swal  from 'sweetalert';

@Component({
  selector: 'app-azuriranje-obavestenja',
  templateUrl: './azuriranje-obavestenja.component.html',
  styleUrls: ['./azuriranje-obavestenja.component.css']
})
export class AzuriranjeObavestenjaComponent implements OnInit {

  constructor(
    private predmetiService:PredmetiService,
    private planAngServis:PlanAngService,
    private obavestenjaServis:ObavestenjeService,
    private uploadService:UploadService,
    private router:Router
    
  ) { }

  ngOnInit(): void {
    //alert("pravim");
    this.predmetiService.dohvatiSvePredmete().subscribe((preds:Predmet[])=>{
      this.predmeti = preds;
    });
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
     if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; 

    if(this.tip=="N")
    this.router.navigate(['']);

    this.planAngServis.dohvatiSveZaNastavnika(this.user.username).subscribe((sve:PlanAng[])=>{
      this.planAngSvi = sve;

      for(let i = 0; i<this.planAngSvi.length;i++){
        this.predmetiService.dohvatiPredmetPoSifri(this.planAngSvi[i].sifra).subscribe((p:Predmet)=>{
         // alert(JSON.stringify(p));
          if(p!=null)
          this.sviPredmetiZap.push(p);
        });
      }

    });

    this.obavestenjaServis.dohvatiSvaObavestenja().subscribe((obs:Obavestenje[])=>{
      //this.svaObavestenja = obs;
      for(let i = 0; i< obs.length; i++){
        if(obs[i].username==this.user.username)
        this.svaObavestenja.push(obs[i]);
      }
    })
  }



  tip:string;
  loggedIn:boolean;
  user:User;
  predmeti:Predmet[];
  sviPredmeti:Predmet[];
  sviPredmetiZap:Predmet[] = [];
  planAngSvi:PlanAng[];

  //obavestenje za azuriranje, username,ime,prezime od usera
  naslov:string;
  tekst:string;
  datum:string;
  id:number;
  izabraniPredmeti:String[] = [];
  fajlovi:String[] = [];

  //obavestenjeSel.
  svaObavestenja:Obavestenje[] = [];
  obavestenjeSel:Obavestenje;

  azurirajObavestenje(){
    //neka osnovna provera
    if(this.izabraniPredmeti.length==0 || this.naslov==undefined ||
       this.datum==undefined || this.tekst==undefined
      || this.tekst=="" || this.naslov=="" || this.datum=="") {
          swal("Greška!", "Niste popunili sva neophodna polja ", "error");
          return;
      }

      //this.id = Date.now(); //id obavestenja i moze da se koristi za sortiranje
      //izabraniPredmeti i fajlovi se dopunjuju pa se oni salju zato
      this.obavestenjaServis.azurirajObavestenje(this.id, this.naslov, this.tekst, this.izabraniPredmeti, this.user.username, 
        this.user.name, this.user.lastname, this.datum, this.fajlovi).subscribe(ret=>{
          if(ret["por"]=="ok"){
            //swal("Uspešno ste ažurirali obaveštenje", "","success");
          location.reload();}
        })

  }

  /////////////////UPLOAD/////////////////
  selectedFile: File
  upl:string="";
  filename:string;


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected(event){
    console.log(event);
    this.filename = this.selectedFile.name;
    let flag = true;
    for(let i = 0; i<this.fajlovi.length;i++){
      if(this.fajlovi[i]==this.filename)
        flag = false;
    }
    if(flag)
    this.fajlovi.push(this.filename);
    this.upl="";
  }

  onUpload() {
      // this.http is the injected HttpClient
      let uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
      this.uploadService.uploadFile(uploadData, this.user.name, this.user.lastname)
        .subscribe(res=>{
          //console.log("USPEH:)");
          if(res["ret"]=="ok"){
            this.upl="Uspesan upload";
            this.filename="";
          }
        });

        this.obavestenjaServis.azurirajFajloveObavestenja(this.fajlovi, this.id).subscribe(ret=>{
          if(ret["por"]=="ok")
          swal("Izmenjeni fajlovi","","success");
        })
  }

  izabranoObavestenje(){
    this.obavestenjaServis.dohvatiObavestenjeId(this.id).subscribe((o:Obavestenje)=>{
      this.obavestenjeSel = o;
      this.izabraniPredmeti = o.predmeti;
      this.fajlovi = o.fajlovi;
      this.datum = o.datum;
      this.tekst = o.tekst;
      this.naslov = o.naslov;
    })
  }

}
