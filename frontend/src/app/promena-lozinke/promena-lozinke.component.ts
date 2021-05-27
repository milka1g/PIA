import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    this.path = this.router.url;
  }

  loggedIn:boolean;
  user:User;
  oldpw:string;
  newpw1:string;
  newpw2:string;
  msg:string = "";
  path:string;

  promenaLozinke(){
    if(this.oldpw!=this.user.password){
      this.msg = "Stara lozinka nije ispravna";
    } else if(this.newpw1!=this.newpw2){
      this.msg = "Nova lozinka i ponovljena nova lozinka se ne poklapaju";
    } else if(this.newpw1.length<5){
      this.msg = "Nova lozinka mora biti duza od 5 karaktera";
    } else if(this.newpw1 == this.oldpw){
      this.msg = "Nova lozinka ne sme biti ista kao stara";
    } else {
      this.userService.setNovaLozinka(this.user.username,this.user.password,this.newpw1).subscribe((user:User)=>{
        swal("Promenili ste lozinku","","success");
        if(this.path.includes("promena-lozinke")){
          this.router.navigate(['']);
        }
        else {
          localStorage.clear();
          location.reload();
        }
        //localStorage.clear();
        //this.router.navigate(['']); //idi na pocetnu pa se loguj opet;
        //location.reload();
      });
    }
  }

}
