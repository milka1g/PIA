import { Component, OnInit } from '@angular/core';
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
  selector: 'app-brisanje-obavestenja',
  templateUrl: './brisanje-obavestenja.component.html',
  styleUrls: ['./brisanje-obavestenja.component.css']
})
export class BrisanjeObavestenjaComponent implements OnInit {

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
  svaObavestenja:Obavestenje[] = [];

  //nova vest, username,ime,prezime od usera
  naslov:string;
  tekst:string;
  datum:string;
  id:number;
  izabraniPredmeti:String[] = [];
  fajlovi:String[] = [];

  obrisi(){
    this.obavestenjaServis.obrisiObavestenje(this.id).subscribe(ret=>{
      //swal("Obrisano obaveštenje","","success");
      location.reload();
    })
  }

}
