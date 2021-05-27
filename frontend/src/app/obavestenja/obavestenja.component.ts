import { Component, OnInit } from '@angular/core';
import { PlanAng } from '../model/planAng.model';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { ObavestenjeService } from '../services/obavestenje.service';
import { PlanAngService } from '../services/plan-ang.service';
import { PredmetiService } from '../services/predmeti.service';
import { UploadService } from '../services/upload.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(
    private predmetiService:PredmetiService,
    private planAngServis:PlanAngService,
    private obavestenjaServis:ObavestenjeService,
    private uploadService:UploadService
    
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

    //tu imas sad sve predmete na kojima je angazovan gosn prof
  }



  tip:string;
  loggedIn:boolean;
  user:User;
  predmeti:Predmet[];
  sviPredmeti:Predmet[];
  sviPredmetiZap:Predmet[] = [];
  planAngSvi:PlanAng[];

  //nova vest, username,ime,prezime od usera
  naslov:string;
  tekst:string;
  datum:string;
  id:number;
  izabraniPredmeti:String[] = [];
  fajlovi:String[] = [];

  dodajObavestenja(){
    //neka osnovna provera
    if(this.izabraniPredmeti.length==0 || this.naslov==undefined ||
       this.datum==undefined || this.tekst==undefined
      || this.tekst=="" || this.naslov=="" || this.datum=="") {
          swal("Niste popunili sva neophodna polja ","","success");
          return;
      }

      this.id = Date.now(); //id obavestenja i moze da se koristi za sortiranje
      this.obavestenjaServis.dodajObavestenje(this.id, this.naslov, this.tekst, this.izabraniPredmeti, this.user.username, 
        this.user.name, this.user.lastname, this.datum, this.fajlovi).subscribe(ret=>{
          if(ret["por"]=="ok"){swal("Uspesno ste dodali vest","","success"); location.reload();}
        })
  }

  /////////////////UPLOAD/////////////////
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
          if(res["ret"]=="ok")
            this.upl="Uspesan upload";
            this.filename="";
        });
  }



}
