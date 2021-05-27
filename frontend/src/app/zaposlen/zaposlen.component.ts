import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { PlanAngService } from '../services/plan-ang.service';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-zaposlen',
  templateUrl: './zaposlen.component.html',
  styleUrls: ['./zaposlen.component.css']
})
export class ZaposlenComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private userServis:UserService,
    private planAngServis:PlanAngService,
    private uploadServis:UploadService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');

    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.userLogged = JSON.parse(localStorage.getItem("user"));
    }
    if(this.loggedIn==true)
    this.tip = this.userLogged.type;
    else this.tip="N"; //neregistrovan korisnik

    if(this.tip=="N")
    this.router.navigate(['']);


    this.userServis.dohvatiKorisnikaPoUsername(this.username).subscribe((u:User)=>{
      this.user = u;
    })

    this.uploadServis.downloadFile(this.username+".jpg").subscribe(blob=>{
      this.createImageFromBlob(blob);
    })
  }

  username:string;
  userLogged:User;
  loggedIn:boolean;
  slika:any;
  user:User;
  tip:string;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.slika = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
