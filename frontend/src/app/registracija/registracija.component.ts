import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(
    private userService:UserService, 
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  username:string;
  password1:string;
  password2:string;
  index:string; //to je mail polje zapravo
  title:string;
  name:string;
  lastname:string;
  status:string;
  pwchg:number=0;
  msg:string;

  registracija(){
    //sve provere dal valja ovo sa pw itd regexi 
    //mn170387d@...
    //index 2017/0387 
    let partmail = (this.lastname.charAt(0).toLowerCase()).concat((this.name.charAt(0)).toLowerCase()).concat(this.index.substring(2,4)).concat(this.index.substring(5,9)).concat(this.title);
    let partcheck = this.username.substring(0,9);
    this.msg = partmail;
    if(this.password1!=this.password2){
      this.msg = "Lozinke se moraju poklapati";
    } else if(this.password1.length<5){
      this.msg = "Lozinka mora biti najmanje 6 karaktera dugacka";
    } else if(this.username == null || this.password1 == null || this.password2 == null || this.index == null || 
      this.title == null || this.name == null || this.lastname == null || this.status == null){
        this.msg = "Morate popuniti sva polja";
    } else if(partmail!=partcheck) {
      this.msg = "Jedinstveno korisnicko ime se ne poklapa sa vasim imenom i indeksom";
    } else {
      this.userService.registracija(this.username, this.password1, this.index, this.title, this.name, this.lastname, this.status).subscribe(por=>{
        if(por['user']=='ok'){
          swal("Uspešno ste se registrovali. Bićete prebačeni na početnu stranicu radi prijavljivanja.","","success");
          // setTimeout(()=>{
             this.router.navigate(['']);
          // },2500)
          //this.router.navigate(['']);
        } else if(por['user']=='no'){
          this.msg = "Doslo je do greske prilikom ubacivanje u bazu podataka.";
        } else {
          this.msg = por['greska'];
        }
      })
    }

  }
  

}
