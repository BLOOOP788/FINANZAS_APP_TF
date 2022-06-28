import { Component, OnInit } from '@angular/core';
import { DatosmainService } from '../../service/datosmain.service';
import { Cartera } from '../../model/cartera';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  currentCartera:Cartera;
  currentUser:User;
  carteras:any;
  constructor(private historialService:DatosmainService,private route:Router,  public _location: Location) { 
    this.currentCartera={}as Cartera;
    this.currentUser={}as User;
  }

  ngOnInit(): void {
    this.getHistorial();
  }
  getHistorial(){
    // aca comprobamos que el usuario está guardado en el local storage
      this.currentUser=JSON.parse(localStorage.getItem('user') || '{}');   
      console.log(this.currentUser)
      this.historialService.getAll(this.currentUser.id).subscribe(data => {
        this.carteras = data;
        console.log(this.carteras.content)
      });        
  }
  getId(ide:any){
    console.log("aaaa")
    this.historialService.getById(this.currentUser.id,ide).subscribe((data:any)=> 
    {
      this.currentCartera=data;
      console.log(data)
      console.log(this.currentCartera);
      localStorage.setItem('cartera', JSON.stringify(this.currentCartera));
      return this.route.navigateByUrl('/main/2');
    });
  }
  eliminar(id:any){
    this.historialService.delete(this.currentUser.id,id).subscribe();
    
    window.location.reload();
  }
  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('cartera');
    return this.route.navigateByUrl('/login');
  }
}
