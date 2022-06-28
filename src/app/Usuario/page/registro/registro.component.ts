import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { RegistroService } from '../../service/registro.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  userData:User;
  submitted:boolean=false;
  showERROR=false;
  registerForm: FormGroup=this.formBuilder.group({
    name:['',{validators:[Validators.required],updateOn:'change'}],
    email:['',{validators:[Validators.required,Validators.email],updateOn:'change'}],
    password:['',{validators:[Validators.required,Validators.minLength(6)],updateOn:'change'}]    
  });
  constructor(private formBuilder:FormBuilder,private userService:RegistroService,private route:Router) {
    this.userData={}as User;
   }

  ngOnInit(): void {
    this.setNameValidation(); 
  }
  
  get email(){return this.registerForm.get('email');}
  get password(){return this.registerForm.get('password');}
  get name(){return this.registerForm.get('name');}
  setNameValidation(){
    const nameControl=this.registerForm.get('name');
    nameControl?.setValidators([Validators.pattern('[a-zA-Z ]*$'),Validators.required])
  };
  submitForm(){
    console.log()
    console.log('asasa')
    this.submitted=true;

  }
  saidSomething(){
    console.log('registrado exitosamente');
      
  }
  //post user
  postUser(){
    this.userData.id=0;
    console.log(this.userData)
     this.userService.create(this.userData).subscribe(data => {     
      console.log(data)
      window.alert("Te registraste exitosamente");
      this.route.navigateByUrl('/login');
    },error=>{
      //window.alert("Correo ya registrado");  
      this.showERROR=true;
    })
  }
}
