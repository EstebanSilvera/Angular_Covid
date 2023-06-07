import { Component, OnInit } from '@angular/core';

export interface personal{
  position:number;
  name:String;
  email:String;
  password:String;
}

const personal = [
  {position: 1 ,nombre:'esteban', edad: 22 , email: 'esteban@gmail.com', password:"123"},
  {position: 2 ,nombre:'andres', edad: 50 , email: 'andres@gmail.com', password:"321"},
];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user = {
    email: '',
    password:''
  }

  constructor() { }

  ngOnInit() {
  }

  login(){
    if(this.user.email == personal[0].email && this.user.password == personal[0].password){
      alert("bienvenido "+ personal[0].nombre)
      window.location.href = "/dashboard"
    }
  }

}
