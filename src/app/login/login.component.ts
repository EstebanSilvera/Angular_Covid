import { Component, OnInit } from '@angular/core';

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
    let person = personal.filter(element => element.email === this.user.email)
    if(this.user.email == person[0].email && this.user.password == person[0].password){

      alert("bienvenido "+ person[0].nombre)
      window.location.href = "/dashboard"
      localStorage.setItem("key", "oaiwufhoaigjalsd352135")

    }else{
      alert("Correo o contraseña incorrecta, vuelvalo a intentar")
    }
  }

}
