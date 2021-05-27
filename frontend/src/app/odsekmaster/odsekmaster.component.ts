import { Component, OnInit } from '@angular/core';
import { PlanAng } from '../model/planAng.model';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { PlanAngService } from '../services/plan-ang.service';
import { PredmetiService } from '../services/predmeti.service';

@Component({
  selector: 'app-odsekmaster',
  templateUrl: './odsekmaster.component.html',
  styleUrls: ['./odsekmaster.component.css']
})
export class OdsekmasterComponent implements OnInit {

  constructor(
    private predmetiService:PredmetiService,
    private planAngServis:PlanAngService
  ) { }

  ngOnInit(): void {
    //alert("pravim");
    this.predmetiService.dohvatiSvePredmeteSmera("master").subscribe((preds:Predmet[])=>{
      this.predmeti = preds;
      this.sortiranjePredmeta();
    });
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
     if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik

    if(this.tip=='S')
    this.predmetiSlusanje = this.user.predmeti;
    else if(this.tip=='Z'){
      this.predmetiService.dohvatiSvePredmete().subscribe((ret:Predmet[])=>{
        for(let i = 0; i < ret.length; i++){
          this.predmetiSlusanje[i] = ret[i].sifra;
        }
        //alert(JSON.stringify(this.predmetiSlusanje));
      })
    }

    //da dohvatis sve predmete na kojima je ang nastavnik da bi mogao da radis azuriranje za njih
    this.planAngServis.dohvatiSveZaNastavnika(this.user.username).subscribe((sve:PlanAng[])=>{
      this.planAngSvi = sve;
      for(let i = 0; i<this.planAngSvi.length;i++){
        this.predmetiService.dohvatiPredmetPoSifri(this.planAngSvi[i].sifra).subscribe((p:Predmet)=>{
          this.sviPredmetiZap[i] = p;
        // this.sviPredmetiZap.push(p);
         // alert("AAA");
        });

      }
    });
  }



  tip:string;
  loggedIn:boolean;
  user:User;
  predmeti:Predmet[];
  sviPredmeti:Predmet[];
  sviPredmetiZap:Predmet[] = [];
  planAngSvi:PlanAng[];
  predmetUpdate:Predmet;
  predmetiSlusanje:String[] = [];

  sortiranjePredmeta(){
    this.predmeti.sort((p1,p2)=>{
      if(p1.godina<p2.godina)return -1;
      if(p1.godina>p2.godina)return 1;
      if(p1.godina==p2.godina){
        if(p1.semestar<p2.semestar)return -1;
        else if(p1.semestar > p2.semestar) return 1;
      }
      return 0; //jednaki su
    })
  }

}
