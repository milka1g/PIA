import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { User } from '../model/user.model';
import { PredmetiService } from '../services/predmeti.service';
import { UserService } from '../services/user.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-biranje',
  templateUrl: './biranje.component.html',
  styleUrls: ['./biranje.component.css']
})
export class BiranjeComponent implements OnInit {

  constructor(
    private predmetiServis:PredmetiService,
    private userServis:UserService,
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

    if(this.tip!="S")
    this.router.navigate(['']);

    this.izabraniPredmeti = this.user.predmeti;

    this.predmetiServis.dohvatiSvePredmete().subscribe((p:Predmet[])=>{
      this.sviPredmeti = p;
    })
  }

  loggedIn:boolean = false;
  tip:string;

  user:User;
  sviPredmeti:Predmet[];
  izabraniPredmeti:String[] = [];

  izaberi(){
    //alert(JSON.stringify(this.izabraniPredmeti));
    this.user.predmeti = this.izabraniPredmeti;
    this.userServis.odaberiPredmete(this.izabraniPredmeti,this.user.username).subscribe(ret=>{
      if(ret["ret"]=="ok"){
        swal("Uspešno ste odabrali predmete za slušanje","","success");
        localStorage.setItem("user",JSON.stringify(this.user));
      }
    })
  }

}
