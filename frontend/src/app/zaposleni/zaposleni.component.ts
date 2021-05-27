import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanAng } from '../model/planAng.model';
import { User } from '../model/user.model';
import { PlanAngService } from '../services/plan-ang.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router,
    private planAngServis:PlanAngService
  ) { }


  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }

    this.userService.dohvatiKorisnikePoTipu("Z").subscribe((zaposleni:User[])=>{
      this.allZaposleni = zaposleni;
    });

    this.planAngServis.dohvatiSvePlanAng().subscribe((p:PlanAng[])=>{
      this.allPlanAng = p;
    })
    
  }

  loggedIn:boolean;
  user:User;
  allZaposleni:User[];
  allPlanAng:PlanAng[];


}
