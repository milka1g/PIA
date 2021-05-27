import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(
    private router : Router,
    private http:HttpClient
  ) {

   }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik
  }

  loggedIn:boolean = false;
  tip:string;

  user:User;

}
