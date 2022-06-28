import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { MatSnackBar} from '@angular/material/snack-bar';
import { User } from '../../model/user';
import { Cartera } from '../../model/cartera';
import { DatosmainService } from '../../service/datosmain.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

//ejemplo para la tabla
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface FlujoAmericano {
  position: number;
  capital: number;
  amortizacion: number;
  intereses: number;
  couta: number;
}
export interface FlujoVp {
  position: number;
  flujos: number;
  flujoV: number;
}
export interface tbConvexidad {
  flujoVPT:number ;
  convexidad: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-rellenodedatos',
  templateUrl: './rellenodedatos.component.html',
  styleUrls: ['./rellenodedatos.component.css']
})

export class RellenodedatosComponent implements OnInit {
  userData:any;
  carteraData:Cartera;
  tazaconvertida=0;
  TIR=0;
  PNTIR=0;
  createData: FormGroup=this.formBuilder.group({
    valorNominal:['',{validators:[Validators.required],updateOn:'change'}],
    tasaCupon:['',{validators:[Validators.required],updateOn:'change'}],
    vencimiento:['',{validators:[Validators.required],updateOn:'change'}],
    tasaNegociacion:['',{validators:[Validators.required],updateOn:'change'}],
    
  });
  submitted:boolean=false;
  selectedPeriodo = '';
  actions = [
  { id: 1, name: 'Anual' },
  { id: 2, name: 'Semestral' },
  { id: 3, name: 'Trimestral' },
  { id: 4, name: 'Bimestral' },
  { id: 5, name: 'Mensual' },
  { id: 6, name: 'Diaria' }]
  selectedMetodo = '';
  metodo = [
  { id: 1, name: 'Aleman' },
  { id: 2, name: 'Frances' },
  { id: 3, name: 'Americano' }]
  selectedMoneda = '';
  moneda = [
  { id: 1, name: 'Soles' },
  { id: 2, name: 'Dolares' },
  { id: 3, name: 'Euros' }]

  //ejemplo de ocmo deberia de ser la tabla de pagos 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','couta'];
  dataSource =  new MatTableDataSource<FlujoAmericano>([]);
  displayedColumns2: string[] = ['position', 'flujos', 'flujoVP'];
  dataSource2 =  new MatTableDataSource<FlujoVp>([]);
  displayedColumns3: string[] = ['flujovpt', 'convexidad'];
  dataSource3 =  new MatTableDataSource<tbConvexidad>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  flujoInicial:FlujoAmericano={position: 0, intereses:0,capital: 0, amortizacion:0,couta:0};
  flujoA:FlujoAmericano[]=[];
  flujoVP:FlujoVp[]=[];
  flujoCon:tbConvexidad[]=[];
  
  auxFlujo:FlujoAmericano;
  auxFlujoVp:FlujoVp;
  auxFlujovpt:tbConvexidad;
  I=0;
  sumaFlujoVp=0;
  sumaFlujoVPT=0;
  sumaConvexidad=0;
  tazanegoconvertida=0;
  duracion=0;
  duracionmedia=0;
  convexidad=0;
  variaciontasanegociacion=0;
  variacionpreciobono=0.0000;
  preciodelbono=0;
  a=0;
  constructor(private formBuilder:FormBuilder, private carteraService:DatosmainService,public dialog: MatDialog,private ruta:ActivatedRoute,private route:Router) {
    this.userData=JSON.parse(localStorage.getItem('user') || '{}');   
    
    this.carteraData={}as Cartera;
    this.carteraData.userId=this.userData.id; 
    this.auxFlujo={}as FlujoAmericano;
    this.auxFlujoVp={}as FlujoVp;
    this.auxFlujovpt={}as tbConvexidad;
    this.paginator={}as MatPaginator;
    this.ruta.params.subscribe(params=>{
      console.log(params['id']);
      this.a=params['id'];
    });
    if(this.a==2){
      this.carteraData=JSON.parse(localStorage.getItem('cartera') || '{}');
      this.cargarCartera(this.carteraData.periodoDePago,this.carteraData.tipoMetodo,this.carteraData.tipoMoneda);
      this.postUser();
    }
  }
  
  ngOnInit(): void {
    this.setTazaCuponValidation();
    this.setValorNominalValidation();
    this.setTazaNegociocionValidation();
    this.setVencimientoValidation();
    this.dataSource.paginator = this.paginator;
    console.log(this.userData);
    
  }
  get valorNominal(){return this.createData.get('valorNominal');}
  get starting_point(){return this.createData.get('tasaCupon');}
  get departure_date(){return this.createData.get('vencimiento');}
  get cost(){return this.createData.get('tasaNegociacion');}
  setValorNominalValidation(){
    const nameControl=this.createData.get('valorNominal');
    nameControl?.setValidators([Validators.pattern('^[0-9]*$'),Validators.required, Validators.maxLength(30)])
  }
  setTazaCuponValidation(){
    const nameControl=this.createData.get('tasaCupon');
    nameControl?.setValidators([Validators.pattern('^[0-9]{1,3}(?:\.[0-9]{1,3})?$'),Validators.required, Validators.maxLength(5)])
  }
  setVencimientoValidation(){
    const nameControl=this.createData.get('vencimiento');
    nameControl?.setValidators([Validators.pattern('^[0-9]{1,3}(?:\.[0-9]{1,3})?$'),Validators.required, Validators.maxLength(5)])
  }
  setTazaNegociocionValidation(){
    const nameControl=this.createData.get('tasaNegociacion');
    nameControl?.setValidators([Validators.pattern('^[0-9]{1,3}(?:\.[0-9]{1,3})?$'),Validators.required, Validators.maxLength(5)])
  }
  submitForm(){
    console.log()
      this.submitted=true;
  }
  cargarCartera(periodo:number,metodo:number,moneda:number){
    if(periodo==1){
      this.selectedPeriodo="Anual"
    }
    if(periodo==2){
      this.selectedPeriodo="Semestral"
    }
    if(periodo==3){
      this.selectedPeriodo="Trimestral"
    }
    if(metodo==1){
      this.selectedMetodo="Americano"
    }
    if(metodo==2){
      this.selectedMetodo="Frances"
    }
    if(metodo==3){
      this.selectedMetodo="Aleman"
    }
    if(moneda==1){
      this.selectedMoneda="Soles"
    }
    if(moneda==2){
      this.selectedMoneda="Dolares"
    }
    if(moneda==3){
      this.selectedMoneda="Euros"
    }
  }
  calcularFecha(){
    if (this.selectedPeriodo=="Anual"){    
      let a=this.carteraData.tasaCupon/100;  
      this.tazaconvertida=a/1;
      let b=this.carteraData.tasaNegociacion/100;      
      this.tazanegoconvertida=b/1;
      this.I=this.carteraData.vencimiento*1;
      this.carteraData.periodoDePago=1;
    }
    if (this.selectedPeriodo=="Semestral"){
      let a=this.carteraData.tasaCupon/100;
      this.tazaconvertida=a/2;
      let b=this.carteraData.tasaNegociacion/100;      
      this.tazanegoconvertida=b/2;
      this.I=this.carteraData.vencimiento*2;
      this.carteraData.periodoDePago=2;
    }
    if (this.selectedPeriodo=="Trimestral"){
      let a=this.carteraData.tasaCupon/100;
      this.tazaconvertida=a/4;
      let b=this.carteraData.tasaNegociacion/100;      
      this.tazanegoconvertida=b/4;
      this.tazaconvertida=this.carteraData.tasaCupon/4;
      this.I=this.carteraData.vencimiento*4;
      this.carteraData.periodoDePago=3;
    }
    if (this.selectedPeriodo=="Bimestral"){
      let a=this.carteraData.tasaCupon/100;
      this.tazaconvertida=a/6;
      let b=this.carteraData.tasaNegociacion/100;      
      this.tazanegoconvertida=b/6;
      this.tazaconvertida=this.carteraData.tasaCupon/6;
      this.I=this.carteraData.vencimiento*6;
      this.carteraData.periodoDePago=4;
    }
    if (this.selectedPeriodo=="Mensual"){
      let a=this.carteraData.tasaCupon/100;
      this.tazaconvertida=a/12;
      let b=this.carteraData.tasaNegociacion/100;      
      this.tazanegoconvertida=b/12;
      this.tazaconvertida=this.carteraData.tasaCupon/12;
      this.I=this.carteraData.vencimiento*12;
      this.carteraData.periodoDePago=5;
    }
    if (this.selectedPeriodo=="Diaria"){
      let a=this.carteraData.tasaCupon/100;
      this.tazaconvertida=a/360;
      let b=this.carteraData.tasaNegociacion/100;      
      this.tazanegoconvertida=b/360;
      this.tazaconvertida=this.carteraData.tasaCupon/360;
      this.I=this.carteraData.vencimiento*360;
      this.carteraData.periodoDePago=6;
    }

  }
  calcularMetodo(){
    if(this.selectedMetodo=="Americano"){
      this.carteraData.tipoMetodo=1;
    }
    if(this.selectedMetodo=="Frances"){
      this.carteraData.tipoMetodo=2;
    }
    if(this.selectedMetodo=="Aleman"){
      this.carteraData.tipoMetodo=3;
    }
  }
  calcularMoneda(){
    if(this.selectedMoneda=="Soles"){
      this.carteraData.tipoMoneda=1;
    }
    if(this.selectedMoneda=="Dolares"){
      this.carteraData.tipoMoneda=2;
    }
    if(this.selectedMoneda=="Euros"){
      this.carteraData.tipoMoneda=3;
    }
  }
  cleanvariables(){
    this.flujoA.splice(0,this.flujoA.length);
    this.flujoVP.splice(0,this.flujoVP.length);
    
    this.flujoCon.splice(0,this.flujoCon.length);
    this.I=0;
    this.sumaFlujoVp=0;
    this.sumaFlujoVPT=0;
    this.sumaConvexidad=0;
    this.tazanegoconvertida=0;
    this.duracion=0;
    this.duracionmedia=0;
    this.convexidad=0;
    this.variaciontasanegociacion=0;
    this.variacionpreciobono=0;
    this.preciodelbono=0;

    this.refresh(this.flujoA,this.flujoVP,this.flujoCon);
  }
  postUser(){  
   
    this.calcularFecha();
    //console.log(this.carteraData)
    //console.log(this.tazanegoconvertida)
    this.calcularMetodo();
    this.calcularMoneda();
    //this.selectedMoneda="Soles";
    //this.carteraData.vencimiento=12;
   
    console.log(this.carteraData)
    for (let i = 1; i <= this.I; i++) {
      this.auxFlujo.position=i;
      
      if(i==1){        
        this.auxFlujo.intereses=this.carteraData.valorNominal*this.tazaconvertida;        
        this.auxFlujo.amortizacion=0;      
        this.auxFlujo.capital=this.carteraData.valorNominal-this.auxFlujo.amortizacion;  
        this.auxFlujo.couta=this.auxFlujo.amortizacion+this.auxFlujo.intereses;
        //console.log(this.auxFlujo)
      }
           
      this.auxFlujo.intereses=this.carteraData.valorNominal*this.tazaconvertida;
      this.auxFlujo.amortizacion=0;
       if(i==this.I){        
        this.auxFlujo.amortizacion=this.carteraData.valorNominal;
      } 
      this.auxFlujo.couta=this.auxFlujo.intereses+this.auxFlujo.amortizacion;
      this.auxFlujo.capital=this.carteraData.valorNominal-this.auxFlujo.amortizacion; 
      //flujo vp   
      this.auxFlujoVp.position=i;
      this.auxFlujoVp.flujos=this.auxFlujo.couta;
      //this.auxFlujoVp.flujos=this.carteraData.valorNominal*this.tazaconvertida;//cuota this.auxflujo.couta
      this.auxFlujoVp.flujoV=this.auxFlujoVp.flujos/Math.pow((1+this.tazanegoconvertida),i);
      //if(i==this.I){
      //  this.auxFlujoVp.flujos=(this.carteraData.valorNominal*this.tazaconvertida)+this.carteraData.valorNominal;
        //this.auxFlujoVp.flujoV=this.auxFlujoVp.flujos/Math.pow((1+this.tazanegoconvertida),i);
      //}
      this.sumaFlujoVp=this.sumaFlujoVp+this.auxFlujoVp.flujoV;  
      //convexidad-flujovpt
      this.auxFlujovpt.flujoVPT=i*this.auxFlujoVp.flujoV;
      this.sumaFlujoVPT=this.sumaFlujoVPT+this.auxFlujovpt.flujoVPT;
      this.auxFlujovpt.convexidad=+(this.auxFlujoVp.flujoV)*((Math.pow(i,2)+i)/Math.pow((1+this.tazanegoconvertida),i));
      this.sumaConvexidad=this.sumaConvexidad+this.auxFlujovpt.convexidad;
      //datos finales:
      this.duracion=this.sumaFlujoVPT/this.sumaFlujoVp;
      if(this.selectedPeriodo=="Semestral"){
        this.duracion=this.duracion/2;
      }
      this.duracionmedia=this.duracion/(1+this.tazanegoconvertida);
      this.variaciontasanegociacion=10/100;
      this.variacionpreciobono=this.duracionmedia*this.variaciontasanegociacion;
      this.preciodelbono=+this.sumaFlujoVp*(1-(this.variacionpreciobono/100));
      this.convexidad=(1/(this.sumaFlujoVp*Math.pow((1+this.tazanegoconvertida),2)))*this.sumaConvexidad;
      this.PNTIR=this.carteraData.valorNominal/(Math.pow(1+this.tazaconvertida,this.I));
      this.TIR=(Math.pow((this.carteraData.valorNominal/this.PNTIR),(1/this.I))-1)*100;
      //asignacion de datos
      this.flujoA.push(this.auxFlujo);
      this.flujoVP.push(this.auxFlujoVp);
      this.flujoCon.push(this.auxFlujovpt);
      this.auxFlujo={position: 0, intereses:0,capital: 0, amortizacion:0,couta:0};
      this.auxFlujoVp={position:0,flujos:0,flujoV:0};
      this.auxFlujovpt={flujoVPT:0,convexidad:0};
    }

    //console.table(this.flujoA)
    //console.table(ELEMENT_DATA)
    this.refresh(this.flujoA,this.flujoVP,this.flujoCon);
    //this.cleanvariables();
  }
  refresh(data:any,data2:any,data3:any) {   
      this.dataSource.data = data;    
      this.dataSource2.data=data2;
      this.dataSource3.data=data3;
  }
  guardarCartera(){
    this.carteraData.id=1;
    console.log(this.carteraData);
    this.carteraService.create(this.carteraData,this.userData.id).subscribe(data => {     
      console.log(data)
    },error=>{
      window.alert("No se pudo Guardar");  
    });
  }
  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('cartera');
    return this.route.navigateByUrl('/login');
  }
}
