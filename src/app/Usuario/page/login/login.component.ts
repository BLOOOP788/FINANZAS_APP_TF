import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { autrequest } from '../../model/autenticate';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData:User;
  submitted:boolean=false;
  login:autrequest;
  emailPrueb:string='owo';
    
  
  registerForm: FormGroup=this.formBuilder.group({
    email:['',{validators:[Validators.required,Validators.email],updateOn:'change'}],
    password:['',{validators:[Validators.required,Validators.minLength(6)],updateOn:'change'}],
  });

  currentUser:any;
  constructor(private formBuilder:FormBuilder,private loginService:LoginService,private route:Router) { 
  this.userData={}as User;
  this.currentUser={}as User;
  this.login={}as autrequest;
    
  }

  ngOnInit(): void {
  }
  get email(){return this.registerForm.get('email');}
  get password(){return this.registerForm.get('password');}
  
  submitForm(){
      console.log()
      console.log('asasa')
      this.submitted=true;

  }
  loginhandler(){
    //this.login.password=pass;
    //console.log(this.login);
    this.loginService.post(this.login).subscribe(data => {     
      //console.log(data)
      this.currentUser = data;
      console.log(this.currentUser.password)
      if (this.currentUser.password==this.login.password) {
       //aca se guarda el usuario en el local storage
        localStorage.setItem('user', JSON.stringify(this.currentUser));   
       return this.route.navigateByUrl('/main'); 
      }
      else {
       return this.route.navigateByUrl('/login');

      } 
    },error=>{
      window.alert("Correo No registrado");  
    });  
      
  }
}
