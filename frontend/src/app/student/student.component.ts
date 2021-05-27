import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(this.loggedIn==true){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

  loggedIn:boolean;
  user:User;

}
