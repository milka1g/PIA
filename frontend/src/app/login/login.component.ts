import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router,
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


  username: string;
  password: string;
  msg: string;
  loggedIn:boolean = false;
  tip:string;

  user:User;

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(!user){
        this.msg = "Uneti podaci su neispravni";
      } else {
        this.loggedIn = true;
        if(user.type=="S"){
          if(user.pwchg==0) {user.type='N'; //da ne moze vidi info
          this.router.navigate(['']);
          location.reload();
        } else {
          this.router.navigate(['student']);
        }
        } else if(user.type=="Z") {
          if(user.pwchg==0) {user.type='N'; //da ne moze vidi info
          this.router.navigate(['']);
          location.reload();
        } else {
          this.router.navigate(['profil']);
        }
        } else if(user.type=="A"){
          this.router.navigate(['admin']);
        }
        localStorage.setItem("loggedIn",JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  }

  logout(){
    localStorage.clear();
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
     if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.user.type;
    else this.tip="N"; //neregistrovan korisnik
    this.router.navigate(['']);
    location.reload();
    this.loggedIn = false;
  }

  

}
