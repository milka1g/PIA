import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    //alert(this.router.url);
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik

    let ruta = this.router.url;
   // alert(ruta);

    //if(ruta.includes("osnovne"))
    if(ruta=="/" || ruta=="")
    this.actFlag = "pocetna";
    else if(ruta.includes("odseksi") || ruta.includes("odsekrti") || ruta.includes("odsekostali"))
    this.actFlag = "osnovne";
    else if(ruta.includes("istrazivanja") || ruta.includes("projekti"))
    this.actFlag = "nauka";
    else if(ruta.includes("odsekmaster"))
    this.actFlag = "master";
    else if(ruta.includes("admin"))
    this.actFlag = "admin";
    else if(ruta.includes("profil"))
    this.actFlag = "profil";
    else if(ruta.includes("zaposleni"))
    this.actFlag = "zaposleni";
    else if(ruta.includes("kontakt"))
    this.actFlag = "kontakt";
    else if(ruta.includes("biranje"))
    this.actFlag = "biranje";
  }

  loggedIn:boolean = false;
  tip:string;

  actFlag:string;

  user:User;

}
